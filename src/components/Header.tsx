
import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const siteName = siteConfig.name;

  const BookingButton = ({ handleClick }: { handleClick?: () => void }) => (
    <Button
      className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white rounded-full px-4 py-2 md:px-6 md:py-3"
      onClick={handleClick}
    >
      Agendar Tattoo
    </Button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/ee20fa04-07fe-41e2-b067-989cfba771ea.png" 
                alt="Kaah Tattoo Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-tattoo-purple">{siteName}</span>
          </a>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-tattoo-purple transition">
              Home
            </a>
            <a href="#about" className="text-white hover:text-tattoo-purple transition">
              Sobre
            </a>
            <a href="#portfolio" className="text-white hover:text-tattoo-purple transition">
              Portfólio
            </a>
            <a href="#booking" className="text-white hover:text-tattoo-purple transition">
              Agenda
            </a>
            <a href="/login" className="text-white hover:text-tattoo-purple transition">
              Área Restrita
            </a>
            <BookingButton />
          </div>
          
          {/* Mobile Navigation - Full height with scrolling */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
              <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-8">
                  <a href="#home" className="flex items-center space-x-2" onClick={closeMenu}>
                    <div className="h-8 w-8 flex items-center justify-center">
                      <img 
                        src="/lovable-uploads/ee20fa04-07fe-41e2-b067-989cfba771ea.png" 
                        alt="Kaah Tattoo Logo" 
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="text-xl font-bold text-tattoo-purple">{siteName}</span>
                  </a>
                  <button
                    onClick={closeMenu}
                    className="text-white focus:outline-none"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-8 text-xl pt-12 pb-8">
                  <a 
                    href="#home" 
                    className="text-white hover:text-tattoo-purple transition"
                    onClick={closeMenu}
                  >
                    Home
                  </a>
                  <a 
                    href="#about" 
                    className="text-white hover:text-tattoo-purple transition"
                    onClick={closeMenu}
                  >
                    Sobre
                  </a>
                  <a 
                    href="#portfolio" 
                    className="text-white hover:text-tattoo-purple transition"
                    onClick={closeMenu}
                  >
                    Portfólio
                  </a>
                  <a 
                    href="#booking" 
                    className="text-white hover:text-tattoo-purple transition"
                    onClick={closeMenu}
                  >
                    Agenda
                  </a>
                  <a 
                    href="/login" 
                    className="text-white hover:text-tattoo-purple transition"
                    onClick={closeMenu}
                  >
                    Área Restrita
                  </a>
                  <div className="pt-6">
                    <BookingButton handleClick={closeMenu} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
