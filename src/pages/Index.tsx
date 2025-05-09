
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
      <HeroSection />
      <Portfolio />
      <AboutSection />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;
