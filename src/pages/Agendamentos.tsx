import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Heart,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

type AgendamentoFormData = {
  cliente: string;
  animal: string;
  servico: string;
  data: string;
  horario: string;
};

const Agendamentos = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("hoje");
  const [agendamentos, setAgendamentos] = useState([
    {
      id: 1,
      cliente: "Maria Silva",
      animal: "Rex",
      servico: "Consulta Veterinária",
      horario: "09:00",
      status: "confirmado",
      data: "2024-01-15"
    },
    {
      id: 2,
      cliente: "João Santos",
      animal: "Mimi",
      servico: "Banho e Tosa",
      horario: "14:30",
      status: "pendente",
      data: "2024-01-15"
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<AgendamentoFormData>({
    defaultValues: {
      cliente: "",
      animal: "",
      servico: "",
      data: "",
      horario: "",
    },
  });

  const onSubmit = (data: AgendamentoFormData) => {
    const novoAgendamento = {
      id: agendamentos.length + 1,
      cliente: data.cliente,
      animal: data.animal,
      servico: data.servico,
      horario: data.horario,
      status: "pendente",
      data: data.data
    };

    setAgendamentos([...agendamentos, novoAgendamento]);
    setIsDialogOpen(false);
    form.reset();

    toast({
      title: "Agendamento Criado",
      description: `Agendamento para ${data.cliente} criado com sucesso!`,
    });
  };

  const mockAgendamentos = agendamentos;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "text-green-vivid";
      case "pendente": return "text-orange-vivid";
      case "cancelado": return "text-red-vivid";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmado": return CheckCircle;
      case "pendente": return AlertCircle;
      case "cancelado": return XCircle;
      default: return Clock;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-teal-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie consultas, banho e tosa e outros serviços
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="lg" className="gap-2 bg-gradient-to-r from-teal-vivid to-blue-vivid hover:shadow-glow">
              <Plus className="w-5 h-5" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Agendamento</DialogTitle>
              <DialogDescription>
                Cadastre um novo agendamento para consulta ou serviço.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cliente"
                  rules={{ required: "Nome do cliente é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do cliente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="animal"
                  rules={{ required: "Nome do animal é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Animal</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do animal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="servico"
                  rules={{ required: "Serviço é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviço</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o serviço" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="consulta">Consulta Veterinária</SelectItem>
                          <SelectItem value="banho">Banho e Tosa</SelectItem>
                          <SelectItem value="vacina">Vacinação</SelectItem>
                          <SelectItem value="cirurgia">Cirurgia</SelectItem>
                          <SelectItem value="exame">Exames</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data"
                  rules={{ required: "Data é obrigatória" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horario"
                  rules={{ required: "Horário é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Agendar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="semana">Esta Semana</TabsTrigger>
          <TabsTrigger value="calendario">Calendário</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        {/* Agendamentos de Hoje */}
        <TabsContent value="hoje" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agendamentos de Hoje</CardTitle>
                  <CardDescription>
                    {mockAgendamentos.length} agendamentos para hoje
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtros
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAgendamentos.map((agendamento) => {
                  const StatusIcon = getStatusIcon(agendamento.status);
                  return (
                    <Card key={agendamento.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <Clock className="w-6 h-6 text-muted-foreground mx-auto" />
                              <p className="text-sm font-medium mt-1">{agendamento.horario}</p>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{agendamento.servico}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                <span className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {agendamento.cliente}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4 text-red-vivid" />
                                  {agendamento.animal}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-5 h-5 ${getStatusColor(agendamento.status)}`} />
                            <span className={`text-sm font-medium capitalize ${getStatusColor(agendamento.status)}`}>
                              {agendamento.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Esta Semana */}
        <TabsContent value="semana" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agendamentos da Semana</CardTitle>
              <CardDescription>
                Visão semanal dos agendamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Visualização semanal em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendário */}
        <TabsContent value="calendario" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendário Completo</CardTitle>
              <CardDescription>
                Visualização em calendário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Calendário interativo em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Histórico */}
        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Agendamentos</CardTitle>
              <CardDescription>
                Agendamentos passados e relatórios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Histórico de agendamentos em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Agendamentos;