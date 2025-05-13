import { useState, useEffect } from "react";
import { imageStorage } from "@/utils/imageStorage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ImageData {
  id: string;
  url: string;
  category: string;
  timestamp: number;
}

const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Categories based on the existing portfolio
  const categories = [
    "Todas",
    "Minimalista", 
    "Fineline", 
    "Floral", 
    "Geométrica", 
    "Blackwork", 
    "Tribal", 
    "Delicada", 
    "Realismo", 
    "Abstrata", 
    "Colorida"
  ];
  
  // Load images when component mounts or category changes
  useEffect(() => {
    loadImages();
  }, [selectedCategory]);
  
  const loadImages = async () => {
    setIsLoading(true);
    try {
      let loadedImages: ImageData[];
      
      if (!selectedCategory || selectedCategory === "Todas") {
        loadedImages = await imageStorage.getImages();
      } else {
        loadedImages = await imageStorage.getImagesByCategory(selectedCategory);
      }
      
      // Sort by newest first
      loadedImages.sort((a, b) => b.timestamp - a.timestamp);
      setImages(loadedImages);
    } catch (error) {
      console.error("Error loading images:", error);
      toast({
        title: "Erro ao carregar imagens",
        description: "Ocorreu um problema ao carregar as imagens. Por favor, tente novamente.",
        variant: "destructive"
      });
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteImage = async (id: string) => {
    // Check if it's a default image
    if (id.startsWith('default_')) {
      toast({
        title: "Ação não permitida",
        description: "Imagens padrão do projeto não podem ser excluídas.",
        variant: "destructive"
      });
      return;
    }
    
    if (confirm("Tem certeza que deseja excluir esta imagem?")) {
      try {
        const success = await imageStorage.deleteImage(id);
        
        if (success) {
          toast({
            title: "Imagem excluída",
            description: "A imagem foi removida com sucesso."
          });
          loadImages();
        } else {
          toast({
            title: "Erro ao excluir",
            description: "Não foi possível excluir a imagem.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        toast({
          title: "Erro ao excluir",
          description: "Ocorreu um erro ao tentar excluir a imagem.",
          variant: "destructive"
        });
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gerenciar Galeria</h2>
        
        <Select
          value={selectedCategory || "Todas"}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px] bg-tattoo-dark-gray border-tattoo-purple/30">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-tattoo-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Carregando imagens...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 bg-tattoo-dark-gray/30 rounded-xl border border-tattoo-purple/10">
          <p className="text-lg text-white/60">
            {selectedCategory && selectedCategory !== "Todas" 
              ? `Nenhuma imagem encontrada na categoria ${selectedCategory}` 
              : "Nenhuma imagem carregada ainda"}
          </p>
          <p className="text-sm text-white/40 mt-2">
            Faça upload de imagens na aba "Upload de Imagens"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-tattoo-dark-gray/50 rounded-lg overflow-hidden border border-tattoo-purple/20 aspect-square"
            >
              <img
                src={image.url}
                alt={`Tatuagem ${image.category}`}
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-sm bg-tattoo-purple/80 rounded-full px-2 py-0.5 mb-2 inline-block">
                  {image.category}
                </span>
                
                {!image.id.startsWith('default_') && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteImage(image.id)}
                    className="mt-2"
                  >
                    Excluir
                  </Button>
                )}
                
                {image.id.startsWith('default_') && (
                  <span className="text-xs text-white/70 mt-1">
                    Imagem padrão do projeto
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
