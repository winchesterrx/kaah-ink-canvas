
import React, { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const siteName = siteConfig.name;

  const BookingButton = ({ handleClick }: { handleClick?: () => void }) => (
    <Button
      className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white rounded-full px-6 py-3"
      onClick={handleClick}
    >
      Agendar Tattoo
    </Button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-tattoo-purple rounded-full flex items-center justify-center">
              <Image size={18} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-tattoo-purple">{siteName}</span>
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
          
          {/* Mobile Navigation */}
          <div className={`fixed inset-0 bg-black z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="absolute top-4 right-4">
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
            
            <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
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
              <BookingButton handleClick={closeMenu} />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
