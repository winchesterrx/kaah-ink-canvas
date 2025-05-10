
import { useState, useEffect } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1603610515337-193cb1156128?w=500&auto=format&fit=crop",
    category: "Minimalista"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1612719734820-65270bcd5409?w=500&auto=format&fit=crop",
    category: "Fineline"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=500&auto=format&fit=crop",
    category: "Floral"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618333258404-78d8a6e39005?w=500&auto=format&fit=crop",
    category: "Geométrica"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1543411490-1209568b602a?w=500&auto=format&fit=crop",
    category: "Minimalista"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1543059983-4c4582ce3683?w=500&auto=format&fit=crop",
    category: "Fineline"
  },
  // Adding more tattoo example images
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1511470937179-03d1966val80?w=500&auto=format&fit=crop",
    category: "Blackwork"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1588371856760-2b0eb4d93605?w=500&auto=format&fit=crop",
    category: "Tribal"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1542359649-c54bde3fc94b?w=500&auto=format&fit=crop",
    category: "Delicada"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1594226801341-41ae47e8cd3c?w=500&auto=format&fit=crop",
    category: "Realismo"
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1574535004246-6d0e9db70a4f?w=500&auto=format&fit=crop",
    category: "Abstrata"
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=500&auto=format&fit=crop",
    category: "Colorida"
  },
  {
    id: 13,
    image: "https://images.unsplash.com/photo-1518695860263-4847c47a8e3f?w=500&auto=format&fit=crop",
    category: "Minimalista"
  },
  {
    id: 14,
    image: "https://images.unsplash.com/photo-1560707396-6e5961489bb8?w=500&auto=format&fit=crop",
    category: "Geométrica"
  },
  {
    id: 15,
    image: "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?w=500&auto=format&fit=crop",
    category: "Blackwork"
  },
  {
    id: 16,
    image: "https://images.unsplash.com/photo-1586992066279-c0e04d37c05c?w=500&auto=format&fit=crop",
    category: "Fineline"
  },
  // Adding more tattoo images to fill empty spaces
  {
    id: 17,
    image: "https://images.unsplash.com/photo-1591635566278-10dca0ca76bf?w=500&auto=format&fit=crop",
    category: "Minimalista"
  },
  {
    id: 18,
    image: "https://images.unsplash.com/photo-1596539156184-257347a761bc?w=500&auto=format&fit=crop",
    category: "Blackwork"
  },
  {
    id: 19,
    image: "https://images.unsplash.com/photo-1590246817284-0aa13d3cd119?w=500&auto=format&fit=crop",
    category: "Geométrica"
  },
  {
    id: 20,
    image: "https://images.unsplash.com/photo-1590439330181-50251c4a5975?w=500&auto=format&fit=crop",
    category: "Fineline"
  },
  {
    id: 21,
    image: "https://images.unsplash.com/photo-1582330421587-8562aa8d363a?w=500&auto=format&fit=crop",
    category: "Floral"
  },
  {
    id: 22,
    image: "https://images.unsplash.com/photo-1598815220941-ebc92c80c9a6?w=500&auto=format&fit=crop",
    category: "Colorida"
  },
  {
    id: 23,
    image: "https://images.unsplash.com/photo-1561040625-925174c246ab?w=500&auto=format&fit=crop",
    category: "Realismo"
  },
  {
    id: 24,
    image: "https://images.unsplash.com/photo-1511268011861-691af5e100ae?w=500&auto=format&fit=crop",
    category: "Delicada"
  }
];

const Portfolio = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState(portfolioItems);
  
  useEffect(() => {
    if (activeCategory) {
      setFilteredItems(portfolioItems.filter(item => item.category === activeCategory));
    } else {
      setFilteredItems(portfolioItems);
    }
  }, [activeCategory]);
  
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

        {/* Featured tattoo showcase */}
        <div className="mb-16 hidden md:block">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col gap-6">
              <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/30">
                <img 
                  src="https://images.unsplash.com/photo-1593435241574-ffd6bc68387c?w=800&auto=format&fit=crop" 
                  alt="Destaque de tatuagem floral"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/2] rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/30">
                <img 
                  src="https://images.unsplash.com/photo-1568252748074-f9c8d87ea6c9?w=800&auto=format&fit=crop" 
                  alt="Processo de tatuagem"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-2 aspect-square rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/30">
              <img 
                src="https://images.unsplash.com/photo-1541127398312-a08a6b71ad6c?w=800&auto=format&fit=crop" 
                alt="Destaque de tatuagem artística"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-tattoo-purple/20"
              onClick={() => setActivePhoto(activePhoto === item.id ? null : item.id)}
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
              {activePhoto === item.id && (
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
      
      {/* Floating decoration tattoo images */}
      <div className="hidden lg:block absolute -right-20 top-40 w-40 h-40 rounded-full overflow-hidden border-2 border-tattoo-purple/30 blur-sm opacity-50">
        <img 
          src="https://images.unsplash.com/photo-1613047503507-b8d01f6a3991?w=300&auto=format&fit=crop" 
          alt="Decoração"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="hidden lg:block absolute -left-20 bottom-40 w-56 h-56 rounded-full overflow-hidden border-2 border-tattoo-purple/30 blur-sm opacity-50">
        <img 
          src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&auto=format&fit=crop" 
          alt="Decoração"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Portfolio;
