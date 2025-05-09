
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-md shadow-tattoo-purple/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-tattoo-purple to-tattoo-dark-gray flex items-center justify-center border border-tattoo-purple/30 shadow-lg shadow-tattoo-purple/20">
            <img 
              src="/lovable-uploads/798dfa87-f954-4053-ac09-d79752baf352.png" 
              alt="Kaah Tattoo13 Logo" 
              className="w-14 h-14 md:w-18 md:h-18 object-contain"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => scrollToSection("home")}
            className="text-white hover:text-tattoo-purple transition-colors"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-white hover:text-tattoo-purple transition-colors"
          >
            Portfólio
          </button>
          <button
            onClick={() => scrollToSection("booking")}
            className="text-white hover:text-tattoo-purple transition-colors"
          >
            Agende sua Tattoo
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white hover:text-tattoo-purple transition-colors"
          >
            Contato
          </button>
          
          <Button 
            onClick={() => scrollToSection("booking")}
            className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white font-semibold ml-2"
          >
            Agende Agora
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-tattoo-purple/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-tattoo-purple/30 py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-tattoo-purple transition-colors py-2 px-4 text-left"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-white hover:text-tattoo-purple transition-colors py-2 px-4 text-left"
            >
              Portfólio
            </button>
            <button
              onClick={() => scrollToSection("booking")}
              className="text-white hover:text-tattoo-purple transition-colors py-2 px-4 text-left"
            >
              Agende sua Tattoo
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-tattoo-purple transition-colors py-2 px-4 text-left"
            >
              Contato
            </button>
            
            <Button 
              onClick={() => scrollToSection("booking")}
              className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white font-semibold mt-2 mx-4"
            >
              Agende Agora
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
