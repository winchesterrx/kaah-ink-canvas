
import { Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="py-16 bg-tattoo-dark-gray text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-tattoo-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center md:text-left">
            <div className="mb-4 flex justify-center md:justify-start">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tattoo-purple to-tattoo-dark-gray flex items-center justify-center border border-tattoo-purple/30 shadow-lg shadow-tattoo-purple/20">
                <h1 className="tattoo-title text-white text-sm">
                  KAAH<br/>TATTOO<span className="text-tattoo-purple">13</span>
                </h1>
              </div>
            </div>
            
            <p className="text-white/70 mb-4 text-sm">
              Arte na pele com personalidade e estilo.
              <br />
              Tatuagens fineline, minimalistas e delicadas.
            </p>
          </div>
          
          <div className="text-center">
            <h3 className="tattoo-title text-xl mb-4">Endereço</h3>
            <p className="text-white/70 mb-1">Álvares Florence - SP</p>
            <p className="text-white/70">
              <a 
                href="https://wa.me/5517997799982" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-tattoo-purple hover:text-white transition-colors inline-flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                +55 17 99779-9982
              </a>
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="tattoo-title text-xl mb-4">Siga-nos</h3>
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <a 
                href="https://instagram.com/kaahtatto13" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-tattoo-light-gray/50 hover:bg-tattoo-purple rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5517997799982" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-tattoo-light-gray/50 hover:bg-tattoo-purple rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {currentYear} Kaah Tattoo13 - Todos os direitos reservados
          </p>
          <p className="text-white/40 text-xs mt-2">
            <a 
              href="https://instagram.com/kaahtatto13" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-tattoo-purple transition-colors"
            >
              @kaahtatto13
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
