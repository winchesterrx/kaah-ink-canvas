import { githubConfig } from '@/config/github';

// Image storage with physical file system
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
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutos
  private lastCacheUpdate = 0;

  private async makeGitHubRequest(endpoint: string, options: RequestInit = {}) {
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
        throw new Error('Limite de requisições da API do GitHub atingido. Tente novamente em alguns minutos.');
      }
      throw new Error(`Erro na requisição ao GitHub: ${response.statusText}`);
    }

    return response;
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

  async getImages(): Promise<ImageData[]> {
    try {
      if (!this.shouldRefreshCache() && this.cache.has('all')) {
        return this.cache.get('all')!;
      }

      const response = await this.makeGitHubRequest('/contents/uploads');
      const files = await response.json();

      const userImages = files.map((file: any) => ({
        id: file.sha,
        url: file.download_url,
        category: this.getCategoryFromFilename(file.name),
        timestamp: Date.now()
      }));

      const allImages = [...userImages, ...defaultImages];
      this.cache.set('all', allImages);
      this.lastCacheUpdate = Date.now();

      return allImages;
    } catch (error) {
      console.error('Erro ao buscar imagens:', error);
      return defaultImages;
    }
  }

  async getImagesByCategory(category: string): Promise<ImageData[]> {
    const allImages = await this.getImages();
    return allImages.filter(img => img.category === category);
  }

  async saveImage(file: File, category: string): Promise<void> {
    try {
      const filename = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}_${category}.${file.name.split('.').pop()}`;
      const base64Data = await this.fileToBase64(file);

      await this.makeGitHubRequest('/contents/uploads/' + filename, {
        method: 'PUT',
        body: JSON.stringify({
          message: `Upload imagem: ${filename}`,
          content: base64Data,
          branch: githubConfig.branch
        })
      });

      // Invalidate cache
      this.lastCacheUpdate = 0;
    } catch (error) {
      console.error('Erro ao salvar imagem:', error);
      throw error;
    }
  }

  async deleteImage(id: string): Promise<boolean> {
    try {
      if (id.startsWith('default_')) return false;

      const allImages = await this.getImages();
      const image = allImages.find(img => img.id === id);
      if (!image) return false;

      const filename = image.url.split('/').pop();
      const fileInfo = await this.makeGitHubRequest('/contents/uploads/' + filename).then(r => r.json());

      await this.makeGitHubRequest('/contents/uploads/' + filename, {
        method: 'DELETE',
        body: JSON.stringify({
          message: `Remoção de imagem: ${filename}`,
          sha: fileInfo.sha,
          branch: githubConfig.branch
        })
      });

      // Invalidate cache
      this.lastCacheUpdate = 0;
      return true;
    } catch (error) {
      console.error('Erro ao deletar imagem:', error);
      return false;
    }
  }
}

export const imageStorage = new ImageStorage();
