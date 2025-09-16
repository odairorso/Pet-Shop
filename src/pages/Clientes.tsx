import { useState, useEffect } from "react";
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
import { supabase } from "@/lib/supabase";
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
  FileText,
  Edit,
  Trash2,
  MoreVertical
} from "lucide-react";

const Clientes = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lista");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleNovoCliente = () => {
    setIsEditMode(false);
    setClienteEditando(null);
    form.reset();
    setIsDialogOpen(true);
  };

  // Função para carregar clientes do Supabase
  const carregarClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar clientes:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os clientes.",
          variant: "destructive",
        });
      } else {
        setClientes(data || []);
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar clientes ao montar o componente
  useEffect(() => {
    carregarClientes();
  }, []);

  // Função para editar cliente
  const editarCliente = (cliente) => {
    setClienteEditando(cliente);
    setIsEditMode(true);
    form.reset({
      nome: cliente.nome,
      cpf: cliente.cpf,
      email: cliente.email,
      telefone: cliente.telefone,
      endereco: cliente.endereco,
    });
    setIsDialogOpen(true);
  };

  // Função para excluir cliente
  const excluirCliente = async (clienteId) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('clientes')
        .delete()
        .eq('id', clienteId);

      if (error) {
        console.error('Erro ao excluir cliente:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o cliente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Cliente excluído com sucesso!",
        });
        await carregarClientes();
      }
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir cliente.",
        variant: "destructive",
      });
    }
  };

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

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditMode && clienteEditando) {
        // Atualizar cliente existente
        const { error } = await supabase
          .from('clientes')
          .update({
            nome: values.nome,
            cpf: values.cpf,
            email: values.email,
            telefone: values.telefone,
            endereco: values.endereco,
          })
          .eq('id', clienteEditando.id);

        if (error) {
          console.error('Erro ao atualizar cliente:', error);
          toast({
            title: "Erro",
            description: "Não foi possível atualizar o cliente. Tente novamente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Cliente atualizado",
            description: `${values.nome} foi atualizado com sucesso.`,
          });
          await carregarClientes();
          setIsDialogOpen(false);
          setIsEditMode(false);
          setClienteEditando(null);
          form.reset();
        }
      } else {
        // Criar novo cliente
        const { data, error } = await supabase
          .from('clientes')
          .insert([
            {
              nome: values.nome,
              cpf: values.cpf,
              email: values.email,
              telefone: values.telefone,
              endereco: values.endereco,
            }
          ])
          .select();

        if (error) {
          console.error('Erro ao cadastrar cliente:', error);
          toast({
            title: "Erro",
            description: "Não foi possível cadastrar o cliente. Tente novamente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Cliente cadastrado",
            description: `${values.nome} foi adicionado com sucesso.`,
          });
          await carregarClientes();
          setIsDialogOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    }
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
                {loading ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Carregando clientes...</p>
                  </div>
                ) : clientes.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum cliente cadastrado ainda.</p>
                    <p className="text-sm text-muted-foreground">Clique em "Novo Cliente" para começar.</p>
                  </div>
                ) : (
                  clientes.map((cliente) => (
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
                            {cliente.cpf && (
                              <div className="flex items-center gap-2 mt-2">
                                <FileText className="w-4 h-4 text-blue-vivid" />
                                <span className="text-sm">CPF: {cliente.cpf}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Cadastrado em</p>
                              <p className="font-medium">
                                {cliente.created_at ? new Date(cliente.created_at).toLocaleDateString('pt-BR') : 'N/A'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editarCliente(cliente)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => excluirCliente(cliente.id)}
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
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
            <DialogTitle>{isEditMode ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Edite as informações do cliente' : 'Cadastre um novo cliente no sistema'}
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
                  {isEditMode ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
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