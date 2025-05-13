import { useState, useEffect } from "react";
import { imageStorage } from "@/utils/imageStorage";

interface PortfolioItem {
  id: string | number;
  image: string;
  category: string;
}

const Portfolio = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load saved images from storage on component mount
  useEffect(() => {
    loadImages();
  }, []);
  
  const loadImages = async () => {
    setIsLoading(true);
    try {
      // Get all images including default ones
      const allImages = await imageStorage.getImages();
      
      if (allImages && allImages.length > 0) {
        // Convert to the format we need
        const formattedItems = allImages.map((img, index) => ({
          id: typeof img.id === 'string' && img.id.includes('_') 
            ? parseInt(img.id.split('_')[1]) || index + 1000
            : index + 1000,
          image: img.url,
          category: img.category
        }));
        
        setPortfolioItems(formattedItems);
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filter items when active category or items change
  useEffect(() => {
    if (activeCategory) {
      setFilteredItems(portfolioItems.filter(item => item.category === activeCategory));
    } else {
      setFilteredItems(portfolioItems);
    }
  }, [activeCategory, portfolioItems]);
  
  // Extract unique categories
  const categories = Array.from(new Set(portfolioItems.map(item => item.category)));
  
  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="tattoo-title text-3xl md:text-4xl text-white mb-4 relative inline-block">
            Alguns dos nossos <span className="text-tattoo-purple">trabalhos</span>
            <div className="w-full h-px bg-tattoo-purple/50 absolute -bottom-2 left-0"></div>
          </h2>
          <p className="text-white/70 mt-6">
            Cada tatuagem conta uma história única. Confira alguns trabalhos realizados no nosso estúdio.
          </p>
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === null 
                ? 'bg-tattoo-purple text-white' 
                : 'bg-tattoo-dark-gray text-white/70 hover:bg-tattoo-purple/30'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === category 
                  ? 'bg-tattoo-purple text-white' 
                  : 'bg-tattoo-dark-gray text-white/70 hover:bg-tattoo-purple/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Portfolio grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-tattoo-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white/60">Carregando trabalhos...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-tattoo-dark-gray/30 rounded-xl border border-tattoo-purple/10">
            <p className="text-lg text-white/60">
              {activeCategory 
                ? `Nenhum trabalho encontrado na categoria ${activeCategory}` 
                : "Nenhum trabalho disponível no momento"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-tattoo-purple/20"
                onClick={() => setActivePhoto(activePhoto === Number(item.id) ? null : Number(item.id))}
              >
                <img 
                  src={item.image} 
                  alt={`Trabalho de tatuagem - ${item.category}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-tattoo-purple/90 text-white text-sm rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-white text-lg font-medium">Arte Kaah Tattoo13</h3>
                  </div>
                </div>
                
                {/* Expanded view */}
                {activePhoto === Number(item.id) && (
                  <div 
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setActivePhoto(null)}
                  >
                    <div 
                      className="relative max-w-4xl max-h-[90vh] bg-tattoo-dark-gray p-1 rounded-lg shadow-2xl shadow-tattoo-purple/20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img 
                        src={item.image} 
                        alt={`Trabalho de tatuagem - ${item.category}`}
                        className="w-full h-full object-contain max-h-[80vh] rounded"
                      />
                      <button 
                        onClick={() => setActivePhoto(null)}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-tattoo-purple text-white rounded-full flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Footer section */}
        <div className="mt-12 text-center">
          <a 
            href="https://instagram.com/kaahtatto13" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-tattoo-purple hover:text-white border-b border-tattoo-purple hover:border-white transition-colors duration-300"
          >
            Ver mais no Instagram @kaahtatto13
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
