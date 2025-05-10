
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AboutSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-tattoo-dark-gray relative overflow-hidden">
      <div className="absolute inset-0 bg-tattoo-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-tattoo-purple/30 shadow-xl shadow-tattoo-purple/20 mx-auto">
                <AspectRatio ratio={1 / 1} className="h-full w-full">
                  <img 
                    src="/lovable-uploads/1cd2536b-713c-497c-bee0-9abbfe8ccf8f.png" 
                    alt="Kaah Silva - Tatuadora" 
                    className="w-full h-full object-cover object-top"
                  />
                </AspectRatio>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full border-2 border-dashed border-tattoo-purple/30"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-tattoo-purple/20"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[calc(100%+30px)] h-[calc(100%+30px)] rounded-full border border-tattoo-purple/10 animate-pulse"></div>
            </div>
          </div>
          
          <div className="w-full md:w-3/5 text-center md:text-left">
            <h2 className="tattoo-title text-3xl md:text-4xl text-white mb-6">
              Sobre a <span className="text-tattoo-purple">tatuadora</span>
            </h2>
            
            <div className="relative mb-8">
              <div className="w-12 h-1 bg-tattoo-purple rounded-full mb-8 mx-auto md:mx-0"></div>
            </div>
            
            <blockquote className="text-white/90 text-lg italic leading-relaxed mb-6 relative">
              <span className="text-tattoo-purple text-4xl absolute -top-6 -left-3 opacity-70">"</span>
              Me chamo Kaah Silva e sou apaixonada por contar histórias através da pele. 
              Especializada em tatuagens fineline, minimalistas e delicadas, transformo 
              ideias em arte com leveza e personalidade.
              <span className="text-tattoo-purple text-4xl absolute -bottom-10 -right-3 opacity-70">"</span>
            </blockquote>
            
            <div className="mt-12">
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <span className="inline-block px-4 py-2 bg-tattoo-light-gray/50 text-white rounded-full text-sm">Fineline</span>
                <span className="inline-block px-4 py-2 bg-tattoo-light-gray/50 text-white rounded-full text-sm">Minimalista</span>
                <span className="inline-block px-4 py-2 bg-tattoo-light-gray/50 text-white rounded-full text-sm">Delicada</span>
                <span className="inline-block px-4 py-2 bg-tattoo-light-gray/50 text-white rounded-full text-sm">Personalizada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
