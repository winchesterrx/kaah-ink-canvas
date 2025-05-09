
import { useState } from "react";

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
  }
];

const Portfolio = () => {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);
  
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item) => (
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
    </section>
  );
};

export default Portfolio;
