import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/logo-animais-cia.png";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // Simula login com Google
    navigate("/dashboard");
  };

  const handleGuestLogin = () => {
    // Login como convidado
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <div className="mb-8 animate-in fade-in duration-1000">
        <img 
          src={logoImage}
          alt="Animais e Cia Logo" 
          className="w-32 h-32 md:w-40 md:h-40 rounded-2xl shadow-glow hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Título e Descrição */}
      <div className="text-center mb-12 animate-in slide-in-from-bottom duration-1000 delay-300">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-orange-vivid">Pet Shop</span>{" "}
          <span className="text-foreground">Animais e Cia</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Sistema completo de gestão para pet shop com agendamentos, cadastro de
          <br className="hidden md:block" />
          clientes e animais, controle financeiro e muito mais.
        </p>
      </div>

      {/* Botões de Login */}
      <div className="flex flex-col md:flex-row gap-4 animate-in slide-in-from-bottom duration-1000 delay-500">
        <Button 
          variant="gradient"
          size="lg"
          onClick={handleGoogleLogin}
          className="min-w-48 text-lg font-semibold"
        >
          Entrar com Google
        </Button>
        <Button 
          variant="guest"
          size="lg"
          onClick={handleGuestLogin}
          className="min-w-48 text-lg font-semibold"
        >
          Entrar como Convidado
        </Button>
      </div>

      {/* Seção inferior */}
      <div className="mt-16 text-center animate-in fade-in duration-1000 delay-700">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Tudo que você precisa para seu pet shop
        </h2>
        <p className="text-muted-foreground text-lg">
          Gerencie seu negócio de forma profissional com nosso sistema completo
        </p>
      </div>
    </div>
  );
};

export default Login;