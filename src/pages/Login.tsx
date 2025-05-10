
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      const success = login(username, password);
      
      if (!success) {
        toast({
          title: "Falha na autenticação",
          description: "Usuário ou senha incorretos.",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 500); // Small delay to simulate authentication
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-tattoo-dark-gray text-white p-4">
      <div className="max-w-md w-full bg-tattoo-dark-gray/50 backdrop-blur-md p-8 rounded-xl border border-tattoo-purple/20 shadow-lg shadow-tattoo-purple/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Área Restrita</h1>
          <p className="text-white/60">Faça login para acessar a área de administração</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              Usuário
            </label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              className="bg-tattoo-light-gray/30 border-tattoo-purple/30 text-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="bg-tattoo-light-gray/30 border-tattoo-purple/30 text-white"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-tattoo-purple hover:bg-tattoo-purple/80" 
            disabled={isLoading}
          >
            {isLoading ? "Autenticando..." : "Entrar"}
          </Button>
          
          <div className="text-xs text-center text-white/40 mt-4">
            Acesso restrito para administração do portfólio
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
