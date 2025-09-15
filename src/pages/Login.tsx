import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import logoImage from "@/assets/logo-animais-cia.png";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, loading } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }

    try {
      if (isSignUp) {
        await signUp(email, password);
        toast.success("Conta criada com sucesso! Verifique seu email.");
      } else {
        await signIn(email, password);
        toast.success("Login realizado com sucesso!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro na autenticação");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success("Login com Google realizado com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Erro no login com Google");
    }
  };

  const handleGuestLogin = () => {
    toast.success("Acesso como convidado realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pet-blue to-pet-purple flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src={logoImage} 
              alt="Animais & Cia" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-pet-blue">
            {isSignUp ? "🆕 Criar Nova Conta" : "Bem-vindo ao Animais & Cia"}
          </CardTitle>
          <CardDescription>
            {isSignUp ? "Preencha os dados para criar sua conta" : "Sistema de gestão para pet shops"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Botão para alternar entre Login e Cadastro */}
          <div className="text-center mb-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              style={{
                width: '100%',
                minHeight: '55px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: '2px solid #3B82F6',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '12px 20px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#2563EB';
                e.currentTarget.style.borderColor = '#2563EB';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#3B82F6';
                e.currentTarget.style.borderColor = '#3B82F6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.2)';
              }}
            >
              {isSignUp ? "Já tem uma conta? Faça login" : "🆕 Não tem conta? CADASTRE-SE AQUI"}
            </button>
          </div>

          <Separator />

          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                minHeight: '50px',
                backgroundColor: '#10B981',
                color: 'white',
                border: '2px solid #10B981',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                padding: '12px 20px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#059669';
                  e.currentTarget.style.borderColor = '#059669';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#10B981';
                  e.currentTarget.style.borderColor = '#10B981';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.2)';
                }
              }}
            >
              {loading ? "Carregando..." : (isSignUp ? "Criar Conta" : "Entrar")}
            </button>
          </form>

          {/* Botão de convidado removido a pedido do usuário */}
        </CardContent>
      </Card>
      
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>© 2024 Animais & Cia. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;