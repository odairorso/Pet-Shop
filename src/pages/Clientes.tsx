import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  Heart,
  Calendar,
  FileText
} from "lucide-react";

const Clientes = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lista");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNovoCliente = () => {
    setIsDialogOpen(true);
  };

  const mockClientes = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria.silva@email.com",
      telefone: "(11) 99999-9999",
      endereco: "Rua das Flores, 123",
      animais: ["Rex", "Luna"],
      ultimaVisita: "2024-01-15"
    },
    {
      id: 2,
      nome: "João Santos",
      email: "joao.santos@email.com",
      telefone: "(11) 88888-8888",
      endereco: "Av. Principal, 456",
      animais: ["Mimi"],
      ultimaVisita: "2024-01-10"
    }
  ];

  const [clientes, setClientes] = useState(mockClientes);

  const formSchema = z.object({
    nome: z.string().min(2, "Informe o nome"),
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(8, "Telefone inválido"),
    endereco: z.string().min(3, "Endereço inválido"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      telefone: "",
      endereco: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    const novo = {
      id: Date.now(),
      nome: values.nome,
      cpf: values.cpf,
      email: values.email,
      telefone: values.telefone,
      endereco: values.endereco,
      animais: [],
      ultimaVisita: new Date().toISOString().slice(0, 10),
    };

    setClientes((prev) => [novo, ...prev]);
    setIsDialogOpen(false);
    form.reset();

    toast({
      title: "Cliente cadastrado",
      description: `${values.nome} foi adicionado com sucesso.`,
    });
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-blue-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie seus clientes e histórico de atendimentos
          </p>
        </div>
        <Button variant="default" size="lg" className="gap-2 bg-gradient-to-r from-blue-vivid to-purple-vivid hover:shadow-glow" onClick={handleNovoCliente}>
          <Plus className="w-5 h-5" />
          Novo Cliente
        </Button>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Lista de Clientes */}
        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Clientes Cadastrados</CardTitle>
                  <CardDescription>
                    {clientes.length} clientes ativos
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Buscar clientes..." 
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {clientes.map((cliente) => (
                  <Card key={cliente.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{cliente.nome}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {cliente.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {cliente.telefone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {cliente.endereco}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Heart className="w-4 h-4 text-red-vivid" />
                            <span className="text-sm">Animais: {cliente.animais.join(", ")}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Última visita</p>
                          <p className="font-medium">{new Date(cliente.ultimaVisita).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Agendamentos */}
        <TabsContent value="agendamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-vivid" />
                Próximos Agendamentos
              </CardTitle>
              <CardDescription>
                Consultas e procedimentos agendados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum agendamento encontrado.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-vivid" />
                Histórico de Atendimentos
              </CardTitle>
              <CardDescription>
                Registro completo de consultas e procedimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum histórico disponível.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Clientes</CardTitle>
              <CardDescription>
                Análises e estatísticas dos clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Relatório Geral</h3>
                    <p className="text-sm text-muted-foreground">Visão geral dos clientes</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 text-green-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Frequência</h3>
                    <p className="text-sm text-muted-foreground">Análise de frequência</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-red-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Animais por Cliente</h3>
                    <p className="text-sm text-muted-foreground">Estatísticas de pets</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para Novo Cliente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Cliente</DialogTitle>
            <DialogDescription>
              Cadastre um novo cliente no sistema
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: João Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cpf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input placeholder="000.000.000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="joao@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(11) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="endereco"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Rua das Flores, 123 - Centro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="pet-blue">
                  Cadastrar Cliente
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clientes;