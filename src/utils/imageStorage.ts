
import { githubConfig } from '@/config/github';
import { toast } from 'sonner';

// Image storage with GitHub repository
interface ImageData {
  id: string;
  url: string;
  category: string;
  timestamp: number;
  cloudinary_id?: string;
}

// Default images stored in the project root
const defaultImages = [
  {
    id: 'default_1',
    url: '/uploads/38139249-61af-410e-80d4-df148da3443e.jpg',
    category: 'Minimalista',
    timestamp: Date.now() - 1000000
  },
  {
    id: 'default_2',
    url: '/uploads/563ff2fb-6b22-45c8-8056-7c8f7b4d7c96.jpg',
    category: 'Fineline',
    timestamp: Date.now() - 2000000
  },
  {
    id: 'default_3',
    url: '/uploads/2217d8c0-fbb2-4868-8e69-ced8a07b13e9.jpg',
    category: 'Floral',
    timestamp: Date.now() - 3000000
  },
  {
    id: 'default_4',
    url: '/uploads/1cd2536b-713c-497c-bee0-9abbfe8ccf8f.png',
    category: 'Geométrica',
    timestamp: Date.now() - 4000000
  },
  {
    id: 'default_5',
    url: '/uploads/798dfa87-f954-4053-ac09-d79752baf352.png',
    category: 'Blackwork',
    timestamp: Date.now() - 5000000
  },
  {
    id: 'default_6',
    url: '/uploads/ee20fa04-07fe-41e2-b067-989cfba771ea.png',
    category: 'Tribal',
    timestamp: Date.now() - 6000000
  }
];

class ImageStorage {
  private readonly cache: Map<string, ImageData[]> = new Map();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutes
  private lastCacheUpdate = 0;
  private readonly localStorageKey = 'tattooGalleryImages';

  private async makeGitHubRequest(endpoint: string, options: RequestInit = {}) {
    try {
      const headers = {
        'Authorization': `token ${githubConfig.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      };

      const response = await fetch(`${githubConfig.baseUrl}/repos/${githubConfig.owner}/${githubConfig.repo}${endpoint}`, {
        ...options,
        headers
      });

      if (!response.ok) {
        if (response.status === 403) {
          console.error('GitHub API rate limit exceeded');
          toast('Limite de requisições atingido', {
            description: 'Tente novamente em alguns minutos.'
          });
          throw new Error('GitHub API rate limit exceeded');
        }
        
        console.error(`GitHub API error: ${response.status} ${response.statusText}`);
        const errorData = await response.text();
        throw new Error(`Error with GitHub API: ${response.statusText}. ${errorData}`);
      }

      return response;
    } catch (error) {
      console.error('GitHub request failed:', error);
      throw error;
    }
  }

  private getCategoryFromFilename(filename: string): string {
    const match = filename.match(/_([^_]+)\.[^.]+$/);
    return match ? match[1] : 'Sem Categoria';
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private shouldRefreshCache(): boolean {
    return Date.now() - this.lastCacheUpdate > this.cacheTimeout;
  }

  // Save images to localStorage as fallback
  private saveToLocalStorage(images: ImageData[]) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(images));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  // Get images from localStorage as fallback
  private getFromLocalStorage(): ImageData[] {
    try {
      const saved = localStorage.getItem(this.localStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  async getImages(): Promise<ImageData[]> {
    try {
      if (!this.shouldRefreshCache() && this.cache.has('all')) {
        return this.cache.get('all')!;
      }

      // Try to get images from GitHub
      let userImages: ImageData[] = [];
      try {
        const response = await this.makeGitHubRequest('/contents/uploads');
        const files = await response.json();
        
        userImages = files.map((file: any) => ({
          id: file.sha,
          url: file.download_url,
          category: this.getCategoryFromFilename(file.name),
          timestamp: Date.now()
        }));
        
        // Save successful response to localStorage as backup
        this.saveToLocalStorage(userImages);
      } catch (error) {
        console.error('Error fetching images from GitHub:', error);
        toast('Erro ao buscar imagens remotas', { 
          description: 'Usando imagens locais como fallback' 
        });
        
        // Try to get images from localStorage as fallback
        userImages = this.getFromLocalStorage();
      }

      const allImages = [...userImages, ...defaultImages];
      this.cache.set('all', allImages);
      this.lastCacheUpdate = Date.now();

      return allImages;
    } catch (error) {
      console.error('Error getting images:', error);
      toast('Erro ao carregar imagens', {
        description: 'Exibindo apenas imagens padrão'
      });
      return defaultImages;
    }
  }

  async getImagesByCategory(category: string): Promise<ImageData[]> {
    const allImages = await this.getImages();
    return allImages.filter(img => img.category === category);
  }

  async saveImage(file: File, category: string): Promise<void> {
    try {
      // Generate a unique filename with category
      const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${category}.${file.name.split('.').pop()}`;
      
      // Convert image to base64
      const base64Data = await this.fileToBase64(file);

      // Try to save to GitHub
      await this.makeGitHubRequest('/contents/uploads/' + filename, {
        method: 'PUT',
        body: JSON.stringify({
          message: `Upload imagem: ${filename}`,
          content: base64Data,
          branch: githubConfig.branch
        })
      });

      // Invalidate cache to refresh images
      this.lastCacheUpdate = 0;
      
      // Save to local storage as backup
      const localImage = {
        id: `local_${Date.now()}`,
        url: URL.createObjectURL(file),
        category,
        timestamp: Date.now()
      };
      
      const localImages = this.getFromLocalStorage();
      localImages.push(localImage);
      this.saveToLocalStorage(localImages);

    } catch (error) {
      console.error('Error saving image:', error);
      
      // Show error to user
      if (error instanceof Error) {
        toast('Erro ao salvar imagem', {
          description: error.message
        });
      } else {
        toast('Erro ao salvar imagem', {
          description: 'Ocorreu um erro desconhecido'
        });
      }
      
      throw error;
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    try {
      if (id.startsWith('default_')) return false;

      const allImages = await this.getImages();
      const image = allImages.find(img => img.id === id);
      
      if (!image) return false;

      // Get filename from URL
      const filename = image.url.split('/').pop();
      
      if (!filename) {
        console.error('Could not extract filename from URL:', image.url);
        return false;
      }
      
      // Get file info from GitHub
      try {
        const fileInfo = await this.makeGitHubRequest('/contents/uploads/' + filename).then(r => r.json());
        
        // Delete file from GitHub
        await this.makeGitHubRequest('/contents/uploads/' + filename, {
          method: 'DELETE',
          body: JSON.stringify({
            message: `Remoção de imagem: ${filename}`,
            sha: fileInfo.sha,
            branch: githubConfig.branch
          })
        });
        
        // Also remove from localStorage if it exists there
        const localImages = this.getFromLocalStorage();
        const filteredImages = localImages.filter(img => img.id !== id);
        this.saveToLocalStorage(filteredImages);
        
        // Invalidate cache
        this.lastCacheUpdate = 0;
        
        return true;
      } catch (error) {
        console.error('Error deleting from GitHub:', error);
        toast('Não foi possível excluir do repositório remoto', {
          description: 'A imagem pode ter sido removida anteriormente'
        });
        
        // Remove from localStorage anyway
        const localImages = this.getFromLocalStorage();
        const filteredImages = localImages.filter(img => img.id !== id);
        this.saveToLocalStorage(filteredImages);
        
        // Invalidate cache
        this.lastCacheUpdate = 0;
        
        return true;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }
}

export const imageStorage = new ImageStorage();
