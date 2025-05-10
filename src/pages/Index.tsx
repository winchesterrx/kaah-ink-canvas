
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Portfolio from "@/components/Portfolio";
import AboutSection from "@/components/AboutSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Header show/hide logic based on scroll direction
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past header height - hide header
        setShowHeader(false);
      } else {
        // Scrolling up - show header
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div 
          className="h-full bg-tattoo-purple" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      {/* Header with hide/show animation */}
      <div 
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Header />
      </div>
      
      {/* Extra padding space to account for the fixed header */}
      <div className="pt-24 md:pt-28"></div>
      <HeroSection />
      <Portfolio />
      <AboutSection />
      
      {/* Decorative floating images */}
      <div className="fixed right-5 top-1/3 w-16 h-16 rounded-full overflow-hidden border-2 border-tattoo-purple/20 shadow-lg shadow-tattoo-purple/10 hidden lg:block animate-pulse-glow">
        <img 
          src="https://images.unsplash.com/photo-1542359649-c54bde3fc94b?w=200&auto=format&fit=crop" 
          alt="Floating decoration" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="fixed left-5 bottom-1/3 w-24 h-24 rounded-full overflow-hidden border-2 border-tattoo-purple/20 shadow-lg shadow-tattoo-purple/10 hidden lg:block animate-pulse-glow" style={{ animationDelay: "1.5s" }}>
        <img 
          src="https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?w=200&auto=format&fit=crop" 
          alt="Floating decoration" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <BookingForm />
      <Footer />
      
      {/* Back to top button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 bg-tattoo-purple/80 hover:bg-tattoo-purple text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-tattoo-purple/30 transition-all"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Index;
