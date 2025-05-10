
// Simple in-memory image storage
interface ImageData {
  id: string;
  file: File;
  url: string;
  category: string;
  timestamp: number;
}

class ImageStorage {
  private readonly storageKey = "tattoo_images";
  
  // Get all stored images
  getImages(): ImageData[] {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
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
        const currentImages = this.getImages();
        const updatedImages = [...currentImages, imageData];
        localStorage.setItem(this.storageKey, JSON.stringify(updatedImages));
        
        resolve(imageData);
      };
      
      reader.readAsDataURL(file);
    });
  }
  
  // Delete an image
  deleteImage(imageId: string): boolean {
    const currentImages = this.getImages();
    const updatedImages = currentImages.filter(img => img.id !== imageId);
    
    if (updatedImages.length !== currentImages.length) {
      localStorage.setItem(this.storageKey, JSON.stringify(updatedImages));
      return true;
    }
    
    return false;
  }
  
  // Clear all images
  clearAllImages(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const imageStorage = new ImageStorage();
