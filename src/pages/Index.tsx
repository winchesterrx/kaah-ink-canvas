
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Portfolio from "@/components/Portfolio";
import AboutSection from "@/components/AboutSection";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Extra padding space to account for the fixed header */}
      <div className="pt-24 md:pt-28"></div>
      <HeroSection />
      <Portfolio />
      <AboutSection />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;
