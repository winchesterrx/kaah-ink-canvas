
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Portfolio from "@/components/Portfolio";
import AboutSection from "@/components/AboutSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div 
          className="h-full bg-tattoo-purple" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      <Header />
      {/* Extra padding space to account for the fixed header */}
      <div className="pt-24 md:pt-28"></div>
      <HeroSection />
      <Portfolio />
      <AboutSection />
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
