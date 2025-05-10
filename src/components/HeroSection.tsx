
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-16 pb-24 skewed-bg bg-gradient-to-b from-black via-tattoo-dark-gray to-black overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-tattoo-pattern opacity-20"></div>
      
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1484589065579-248aad0d8b13?q=80&w=1920&auto=format&fit=crop')`,
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="tattoo-title text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
            Transforme sua ideia em <span className="text-tattoo-purple glow-effect">arte na pele</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
            Tatuagens minimalistas, delicadas e com alma. 
            Cada traço conta uma história única.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Button 
              onClick={scrollToPortfolio}
              className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white px-8 py-6 text-lg rounded-md shadow-lg shadow-tattoo-purple/30 hover:shadow-tattoo-purple/50 transition-all group"
            >
              Ver Portfólio 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-tattoo-purple text-white hover:bg-tattoo-purple/20 px-8 py-6 text-lg"
            >
              Agende Agora
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap gap-4 justify-center lg:justify-start items-center">
            <span className="text-white/60">Técnicas:</span>
            {["Minimalista", "Fineline", "Blackwork", "Realismo"].map((technique) => (
              <span key={technique} className="px-3 py-1 bg-tattoo-purple/20 text-white/90 text-sm rounded-full">
                {technique}
              </span>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            <div className="flex flex-col gap-4">
              <div className="rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/20 animate-pulse-glow">
                <img 
                  src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=600&auto=format&fit=crop" 
                  alt="Tatuagem fina e delicada" 
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/20 mt-auto">
                <img 
                  src="https://images.unsplash.com/photo-1560707854-fb9a10ced4cf?w=600&auto=format&fit=crop" 
                  alt="Tatuagem artística" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-12">
              <div className="rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/20">
                <img 
                  src="https://images.unsplash.com/photo-1611501355859-e35e923db303?w=600&auto=format&fit=crop" 
                  alt="Tatuagem minimalista" 
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg shadow-tattoo-purple/20 animate-pulse-glow">
                <img 
                  src="https://images.unsplash.com/photo-1607850669899-d4bfc4459cc2?w=600&auto=format&fit=crop" 
                  alt="Processo de tatuagem" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[120%] h-1 bg-tattoo-purple/30 rounded-full blur-md"></div>
    </section>
  );
};

export default HeroSection;
