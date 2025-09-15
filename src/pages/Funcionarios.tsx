import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  UserCog, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Users,
  Star
} from "lucide-react";

const Funcionarios = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cargoFilter, setCargoFilter] = useState("todos");

  const mockFuncionarios = [
    {
      id: 1,
      nome: "Dr. Carlos Veterinário",
      email: "carlos@petshop.com",
      telefone: "(11) 99999-8888",
      endereco: "Rua das Clínicas, 456",
      cargo: "Veterinário",
      salario: "R$ 8.500,00",
      dataAdmissao: "2023-01-15",
      status: "Ativo",
      especialidade: "Clínica Geral"
    },
    {
      id: 2,
      nome: "Ana Tosadora",
      email: "ana@petshop.com",
      telefone: "(11) 88888-7777",
      endereco: "Av. Pet Care, 789",
      cargo: "Tosador(a)",
      salario: "R$ 3.200,00",
      dataAdmissao: "2023-03-20",
      status: "Ativo",
      especialidade: "Estética Canina"
    }
  ];

  const [funcionarios, setFuncionarios] = useState(mockFuncionarios);

  const formSchema = z.object({
    nome: z.string().min(2, "Informe o nome"),
    cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
    email: z.string().email("E-mail inválido"),
    telefone: z.string().min(8, "Telefone inválido"),
    endereco: z.string().min(3, "Endereço inválido"),
    cargo: z.string().min(1, "Selecione o cargo"),
    salario: z.string().min(1, "Informe o salário"),
    especialidade: z.string().optional(),
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
      cargo: "",
      salario: "",
      especialidade: "",
    },
  });

  const handleNovoFuncionario = () => {
    setIsDialogOpen(true);
  };

  const onSubmit = (values: FormValues) => {
    const novoFuncionario = {
      id: Date.now(),
      nome: values.nome,
      cpf: values.cpf,
      email: values.email,
      telefone: values.telefone,
      endereco: values.endereco,
      cargo: values.cargo,
      salario: values.salario,
      dataAdmissao: new Date().toISOString().slice(0, 10),
      status: "Ativo",
      especialidade: values.especialidade || "",
    };

    setFuncionarios((prev) => [novoFuncionario, ...prev]);
    setIsDialogOpen(false);
    form.reset();

    toast({
      title: "Funcionário cadastrado",
      description: `${values.nome} foi adicionado à equipe com sucesso.`,
    });
  };

  const filteredFuncionarios = funcionarios.filter(funcionario => {
    const matchesSearch = funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCargo = cargoFilter === "todos" || funcionario.cargo === cargoFilter;
    return matchesSearch && matchesCargo;
  });

  const cargos = ["Veterinário", "Tosador(a)", "Atendente", "Gerente", "Auxiliar"];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <UserCog className="w-8 h-8 text-purple-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie a equipe do seu pet shop
          </p>
        </div>
        <Button variant="pet-purple" size="lg" className="gap-2" onClick={handleNovoFuncionario}>
          <Plus className="w-5 h-5" />
          Novo Funcionário
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar por nome ou cargo..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={cargoFilter} onValueChange={setCargoFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos os cargos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os cargos</SelectItem>
            {cargos.map((cargo) => (
              <SelectItem key={cargo} value={cargo}>
                {cargo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="default" className="gap-2">
          <Filter className="w-4 h-4" />
          {filteredFuncionarios.length} resultado{filteredFuncionarios.length !== 1 ? 's' : ''}
        </Button>
      </div>

      {/* Lista de Funcionários */}
      {filteredFuncionarios.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 shadow-card text-center">
          <UserCog className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            {funcionarios.length === 0 ? "Nenhum funcionário cadastrado" : "Nenhum funcionário encontrado"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {funcionarios.length === 0 ? "Comece cadastrando o primeiro funcionário" : "Tente ajustar os filtros de busca"}
          </p>
          <Button variant="pet-purple" className="gap-2" onClick={handleNovoFuncionario}>
            <Plus className="w-4 h-4" />
            Cadastrar Funcionário
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-purple-vivid" />
                  Equipe
                </CardTitle>
                <CardDescription>
                  {filteredFuncionarios.length} funcionário{filteredFuncionarios.length !== 1 ? 's' : ''} encontrado{filteredFuncionarios.length !== 1 ? 's' : ''}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFuncionarios.map((funcionario) => (
                <Card key={funcionario.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{funcionario.nome}</h3>
                          <Badge variant="secondary">{funcionario.cargo}</Badge>
                          <Badge variant={funcionario.status === "Ativo" ? "default" : "destructive"}>
                            {funcionario.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {funcionario.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {funcionario.telefone}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {funcionario.endereco}
                          </span>
                        </div>
                        {funcionario.especialidade && (
                          <div className="flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-vivid" />
                            <span>Especialidade: {funcionario.especialidade}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">{funcionario.salario}</p>
                        <p className="text-sm text-muted-foreground">Desde {new Date(funcionario.dataAdmissao).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog para Novo Funcionário */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Novo Funcionário</DialogTitle>
            <DialogDescription>
              Cadastre um novo membro da equipe
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>

              <div className="grid grid-cols-2 gap-4">
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
              </div>
              
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

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cargo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o cargo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cargos.map((cargo) => (
                            <SelectItem key={cargo} value={cargo}>
                              {cargo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="salario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salário</FormLabel>
                      <FormControl>
                        <Input placeholder="R$ 0,00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="especialidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Especialidade (opcional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Clínica Geral, Estética Canina..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="pet-purple">
                  Cadastrar Funcionário
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Funcionarios;