import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  Building,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Configuracoes = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("geral");

  // Estados para as configurações
  const [clinicaConfig, setClinicaConfig] = useState({
    nome: "Animais e Cia",
    endereco: "Rua das Flores, 123",
    telefone: "(11) 99999-9999",
    email: "contato@animaisecia.com.br",
    cnpj: "12.345.678/0001-90",
    horarioFuncionamento: "08:00 - 18:00"
  });

  const [notificacoes, setNotificacoes] = useState({
    emailAgendamentos: true,
    smsLembretes: false,
    notificacoesPush: true,
    relatoriosSemanais: true
  });

  const [sistemaConfig, setSistemaConfig] = useState({
    tema: "claro",
    idioma: "pt-BR",
    timezone: "America/Sao_Paulo",
    backupAutomatico: true
  });

  const handleSaveClinica = () => {
    toast({
      title: "Configurações salvas",
      description: "As informações da clínica foram atualizadas com sucesso.",
    });
  };

  const handleSaveNotificacoes = () => {
    toast({
      title: "Notificações atualizadas",
      description: "Suas preferências de notificação foram salvas.",
    });
  };

  const handleSaveSistema = () => {
    toast({
      title: "Sistema atualizado",
      description: "As configurações do sistema foram aplicadas.",
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-muted" />
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie as configurações da clínica e do sistema
          </p>
        </div>
      </div>

      {/* Tabs de Configurações */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="geral" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Segurança
          </TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informações da Clínica
              </CardTitle>
              <CardDescription>
                Configure as informações básicas da sua clínica veterinária
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome da Clínica</Label>
                  <Input
                    id="nome"
                    value={clinicaConfig.nome}
                    onChange={(e) => setClinicaConfig({...clinicaConfig, nome: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input
                    id="cnpj"
                    value={clinicaConfig.cnpj}
                    onChange={(e) => setClinicaConfig({...clinicaConfig, cnpj: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={clinicaConfig.telefone}
                    onChange={(e) => setClinicaConfig({...clinicaConfig, telefone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clinicaConfig.email}
                    onChange={(e) => setClinicaConfig({...clinicaConfig, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={clinicaConfig.endereco}
                  onChange={(e) => setClinicaConfig({...clinicaConfig, endereco: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Horário de Funcionamento</Label>
                <Input
                  id="horario"
                  value={clinicaConfig.horarioFuncionamento}
                  onChange={(e) => setClinicaConfig({...clinicaConfig, horarioFuncionamento: e.target.value})}
                />
              </div>
              <Button onClick={handleSaveClinica} className="gap-2">
                <Save className="w-4 h-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Preferências de Notificação
              </CardTitle>
              <CardDescription>
                Configure como você deseja receber notificações do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações por E-mail</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações sobre novos agendamentos por e-mail
                  </p>
                </div>
                <Switch
                  checked={notificacoes.emailAgendamentos}
                  onCheckedChange={(checked) => 
                    setNotificacoes({...notificacoes, emailAgendamentos: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS de Lembrete</Label>
                  <p className="text-sm text-muted-foreground">
                    Envie lembretes por SMS para clientes
                  </p>
                </div>
                <Switch
                  checked={notificacoes.smsLembretes}
                  onCheckedChange={(checked) => 
                    setNotificacoes({...notificacoes, smsLembretes: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Notificações Push</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba notificações em tempo real no navegador
                  </p>
                </div>
                <Switch
                  checked={notificacoes.notificacoesPush}
                  onCheckedChange={(checked) => 
                    setNotificacoes({...notificacoes, notificacoesPush: checked})
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Relatórios Semanais</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba relatórios semanais por e-mail
                  </p>
                </div>
                <Switch
                  checked={notificacoes.relatoriosSemanais}
                  onCheckedChange={(checked) => 
                    setNotificacoes({...notificacoes, relatoriosSemanais: checked})
                  }
                />
              </div>
              <Button onClick={handleSaveNotificacoes} className="gap-2">
                <Save className="w-4 h-4" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações do Sistema */}
        <TabsContent value="sistema" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Configurações do Sistema
              </CardTitle>
              <CardDescription>
                Configure as preferências gerais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tema">Tema</Label>
                  <Select value={sistemaConfig.tema} onValueChange={(value) => 
                    setSistemaConfig({...sistemaConfig, tema: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="claro">Claro</SelectItem>
                      <SelectItem value="escuro">Escuro</SelectItem>
                      <SelectItem value="automatico">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idioma">Idioma</Label>
                  <Select value={sistemaConfig.idioma} onValueChange={(value) => 
                    setSistemaConfig({...sistemaConfig, idioma: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar backup automático dos dados diariamente
                  </p>
                </div>
                <Switch
                  checked={sistemaConfig.backupAutomatico}
                  onCheckedChange={(checked) => 
                    setSistemaConfig({...sistemaConfig, backupAutomatico: checked})
                  }
                />
              </div>
              <Button onClick={handleSaveSistema} className="gap-2">
                <Save className="w-4 h-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Segurança */}
        <TabsContent value="seguranca" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Segurança e Privacidade
              </CardTitle>
              <CardDescription>
                Configure as opções de segurança do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senha-atual">Senha Atual</Label>
                  <Input id="senha-atual" type="password" placeholder="Digite sua senha atual" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Nova Senha</Label>
                  <Input id="nova-senha" type="password" placeholder="Digite a nova senha" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
                  <Input id="confirmar-senha" type="password" placeholder="Confirme a nova senha" />
                </div>
                <Button variant="outline" className="gap-2">
                  <Shield className="w-4 h-4" />
                  Alterar Senha
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Sessões Ativas</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Gerencie os dispositivos conectados à sua conta
                </p>
                <Button variant="destructive" size="sm">
                  Encerrar Todas as Sessões
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Configuracoes;