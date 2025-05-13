
// Simple in-memory image storage
interface ImageData {
  id: string;
  file: File;
  url: string;
  category: string;
  timestamp: number;
}

// Default images stored in the project root
const defaultImages = [
  {
    id: 'default_1',
    url: '/lovable-uploads/38139249-61af-410e-80d4-df148da3443e.jpg',
    category: 'Minimalista',
    timestamp: Date.now() - 1000000
  },
  {
    id: 'default_2',
    url: '/lovable-uploads/563ff2fb-6b22-45c8-8056-7c8f7b4d7c96.jpg',
    category: 'Fineline',
    timestamp: Date.now() - 2000000
  },
  {
    id: 'default_3',
    url: '/lovable-uploads/2217d8c0-fbb2-4868-8e69-ced8a07b13e9.jpg',
    category: 'Floral',
    timestamp: Date.now() - 3000000
  },
  {
    id: 'default_4',
    url: '/lovable-uploads/1cd2536b-713c-497c-bee0-9abbfe8ccf8f.png',
    category: 'Geométrica',
    timestamp: Date.now() - 4000000
  },
  {
    id: 'default_5',
    url: '/lovable-uploads/798dfa87-f954-4053-ac09-d79752baf352.png',
    category: 'Blackwork',
    timestamp: Date.now() - 5000000
  },
  {
    id: 'default_6',
    url: '/lovable-uploads/ee20fa04-07fe-41e2-b067-989cfba771ea.png',
    category: 'Tribal',
    timestamp: Date.now() - 6000000
  }
];

class ImageStorage {
  private readonly storageKey = "tattoo_images";
  
  // Get all stored images
  getImages(): ImageData[] {
    const storedData = localStorage.getItem(this.storageKey);
    const userImages = storedData ? JSON.parse(storedData) : [];
    
    // Combine user-uploaded images with default project images
    return [...userImages, ...this.getDefaultImages()];
  }
  
  // Get default images that are stored in project
  getDefaultImages(): any[] {
    return defaultImages;
  }
  
  // Get images by category
  getImagesByCategory(category: string): ImageData[] {
    return this.getImages().filter(img => img.category === category);
  }
  
  // Save an image
  async saveImage(file: File, category: string): Promise<ImageData> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const url = e.target?.result as string;
        
        // Create image data
        const imageData: ImageData = {
          id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          file: file,
          url: url,
          category: category,
          timestamp: Date.now()
        };
        
        // Save to storage
        const currentImages = this.getUserImages();
        const updatedImages = [...currentImages, imageData];
        localStorage.setItem(this.storageKey, JSON.stringify(updatedImages));
        
        resolve(imageData);
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  // Get only user-uploaded images
  getUserImages(): ImageData[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }
  
  // Delete an image
  deleteImage(imageId: string): boolean {
    // If it's a default image, we can't delete it
    if (imageId.startsWith('default_')) {
      return false;
    }
    
    const currentImages = this.getUserImages();
    const updatedImages = currentImages.filter(img => img.id !== imageId);
    
    if (updatedImages.length !== currentImages.length) {
      localStorage.setItem(this.storageKey, JSON.stringify(updatedImages));
      return true;
    }
    
    return false;
  }
  
  // Clear all user images
  clearAllImages(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const imageStorage = new ImageStorage();
