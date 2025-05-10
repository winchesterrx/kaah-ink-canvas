
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { imageStorage } from "@/utils/imageStorage";
import { useToast } from "@/hooks/use-toast";
import ImageGallery from "@/components/admin/ImageGallery";

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("Minimalista");
  const [activeTab, setActiveTab] = useState<"upload" | "gallery">("upload");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  // Categories based on the existing portfolio
  const categories = [
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
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // Handle multiple files
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Formato inválido",
            description: `${file.name} não é uma imagem válida.`,
            variant: "destructive"
          });
          continue;
        }
        
        await imageStorage.saveImage(file, selectedCategory);
      }
      
      toast({
        title: "Upload realizado com sucesso",
        description: `${files.length} imagem(ns) adicionada(s) à categoria ${selectedCategory}.`
      });
      
      // Reset the input
      e.target.value = "";
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao carregar as imagens.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-tattoo-dark-gray text-white">
      {/* Admin header */}
      <header className="bg-black/80 border-b border-tattoo-purple/30 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-tattoo-purple">
            Painel Administrativo
          </h1>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-tattoo-purple/40 text-white hover:bg-tattoo-purple/20"
              onClick={() => window.location.href = "/"}
            >
              Ver Site
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={logout}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-tattoo-purple/30 mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "upload" 
              ? "text-tattoo-purple border-b-2 border-tattoo-purple" 
              : "text-white/70 hover:text-white"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload de Imagens
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "gallery" 
              ? "text-tattoo-purple border-b-2 border-tattoo-purple" 
              : "text-white/70 hover:text-white"
            }`}
            onClick={() => setActiveTab("gallery")}
          >
            Gerenciar Galeria
          </button>
        </div>
        
        {activeTab === "upload" ? (
          <div className="max-w-2xl mx-auto bg-tattoo-dark-gray/50 backdrop-blur-md rounded-xl border border-tattoo-purple/20 p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Upload de Imagens</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="bg-tattoo-light-gray/30 border-tattoo-purple/30">
                    <SelectValue placeholder="Selecione uma categoria" />
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
              
              <div className="space-y-2">
                <Label htmlFor="image">Selecione as imagens</Label>
                <div className="border-2 border-dashed border-tattoo-purple/40 rounded-lg p-8 text-center hover:border-tattoo-purple/70 transition-colors">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="image" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-tattoo-purple/20 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-tattoo-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-white mb-1">
                      Clique para fazer upload
                    </span>
                    <span className="text-sm text-white/60">
                      Ou arraste e solte os arquivos aqui
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ImageGallery />
        )}
      </div>
    </div>
  );
};

export default Admin;
