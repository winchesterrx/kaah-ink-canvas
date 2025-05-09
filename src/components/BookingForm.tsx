
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { WhatsApp } from "lucide-react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    bodyPart: "",
    size: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format WhatsApp message
    const message = `Olá, Kaah! Vi seu trabalho e gostaria de agendar uma tatuagem. 
Meus dados:
- Nome: ${formData.name}
- Data preferida: ${formData.date}
- Tatuagem desejada: ${formData.description}
- Parte do corpo: ${formData.bodyPart}
- Tamanho: ${formData.size}

Aguardo seu retorno. Obrigado(a)!`;
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/5517997799982?text=${encodedMessage}`, "_blank");
  };
  
  return (
    <section id="booking" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-tattoo-pattern opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto bg-tattoo-dark-gray/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl shadow-tattoo-purple/20 border border-tattoo-purple/10">
          <div className="text-center mb-10">
            <h2 className="tattoo-title text-3xl text-white mb-4">
              Agende sua <span className="text-tattoo-purple">Tattoo</span>
            </h2>
            <p className="text-white/70">
              Preencha o formulário abaixo para agendar sua tatuagem e tirar suas dúvidas.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  required
                  className="bg-tattoo-light-gray/50 border-tattoo-purple/30 focus:border-tattoo-purple text-white placeholder:text-white/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">Data preferida</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-tattoo-light-gray/50 border-tattoo-purple/30 focus:border-tattoo-purple text-white placeholder:text-white/30"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Tatuagem desejada</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva a tatuagem que você deseja ou informe que vai enviar referência"
                required
                rows={4}
                className="bg-tattoo-light-gray/50 border-tattoo-purple/30 focus:border-tattoo-purple text-white placeholder:text-white/30 resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bodyPart" className="text-white">Parte do corpo</Label>
                <Input
                  id="bodyPart"
                  name="bodyPart"
                  value={formData.bodyPart}
                  onChange={handleChange}
                  placeholder="Ex: Braço, Perna, Costas..."
                  required
                  className="bg-tattoo-light-gray/50 border-tattoo-purple/30 focus:border-tattoo-purple text-white placeholder:text-white/30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="size" className="text-white">Tamanho estimado</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Ex: 5cm, 10cm x 5cm..."
                  required
                  className="bg-tattoo-light-gray/50 border-tattoo-purple/30 focus:border-tattoo-purple text-white placeholder:text-white/30"
                />
              </div>
            </div>
            
            <div className="pt-4 text-center">
              <Button 
                type="submit"
                className="bg-tattoo-purple hover:bg-tattoo-purple/80 text-white px-8 py-6 text-lg rounded-md shadow-lg shadow-tattoo-purple/30 hover:shadow-tattoo-purple/50 transition-all w-full md:w-auto group"
              >
                <WhatsApp className="w-5 h-5 mr-2" />
                Agendar via WhatsApp
              </Button>
              
              <div className="mt-4 text-white/50 text-sm">
                Ao clicar, você será redirecionado para o WhatsApp com uma mensagem pré-preenchida.
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
