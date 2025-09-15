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
            {isSignUp ? "Criar Conta" : "Bem-vindo ao Animais & Cia"}
          </CardTitle>
          <CardDescription>
            Sistema de gestão para pet shops
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailAuth} className="space-y-4">
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
            <Button 
              type="submit"
              className="w-full bg-pet-orange hover:bg-pet-orange/90"
              disabled={loading}
            >
              {loading ? "Carregando..." : (isSignUp ? "Criar Conta" : "Entrar")}
            </Button>
          </form>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-pet-blue"
            >
              {isSignUp ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}
            </Button>
          </div>

          <Separator />

          <div className="space-y-2">
            {/* Temporariamente desabilitado - habilitar Google OAuth no Supabase primeiro */}
            {/* <Button 
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full"
              disabled={loading}
            >
              Entrar com Google
            </Button> */}
            <Button 
              onClick={handleGuestLogin}
              variant="outline" 
              className="w-full"
            >
              Continuar como Convidado
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="absolute bottom-4 left-4 text-white/80 text-sm">
        <p>© 2024 Animais & Cia. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;