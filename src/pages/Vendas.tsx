import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  DollarSign,
  Package,
  User,
  TrendingUp,
  Eye
} from "lucide-react";

interface VendaFormData {
  cliente: string;
  produtos: string;
  servicos: string;
  observacoes: string;
  desconto: string;
}

const mockVendas = [
  {
    id: 1,
    cliente: "Maria Silva",
    produtos: ["Ração Premium", "Brinquedo"],
    total: 89.90,
    data: "2024-01-15",
    hora: "10:30",
    status: "concluída",
    vendedor: "Ana Costa"
  },
  {
    id: 2,
    cliente: "João Santos",
    produtos: ["Consulta Veterinária", "Medicamento"],
    total: 150.00,
    data: "2024-01-15",
    hora: "14:15",
    status: "pendente",
    vendedor: "Carlos Lima"
  },
  {
    id: 3,
    cliente: "Pedro Oliveira",
    produtos: ["Banho e Tosa"],
    total: 45.00,
    data: "2024-01-14",
    hora: "16:45",
    status: "concluída",
    vendedor: "Ana Costa"
  }
];

const Vendas = () => {
  const [activeTab, setActiveTab] = useState("todas");
  const [vendas, setVendas] = useState(mockVendas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<VendaFormData>({
    defaultValues: {
      cliente: "",
      produtos: "",
      servicos: "",
      observacoes: "",
      desconto: "0"
    }
  });

  const onSubmit = (data: VendaFormData) => {
    const novaVenda = {
      id: vendas.length + 1,
      cliente: data.cliente,
      produtos: data.produtos.split(",").map(p => p.trim()),
      total: Math.random() * 200 + 50, // Valor simulado
      data: new Date().toISOString().split('T')[0],
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: "pendente" as const,
      vendedor: "Sistema"
    };
    
    setVendas([novaVenda, ...vendas]);
    setIsDialogOpen(false);
    form.reset();
    toast({
      title: "Venda criada com sucesso!",
      description: `Venda para ${data.cliente} foi registrada.`,
    });
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluída": return "bg-green-500/10 text-green-700 border-green-200";
      case "pendente": return "bg-orange-500/10 text-orange-700 border-orange-200";
      case "cancelada": return "bg-red-500/10 text-red-700 border-red-200";
      default: return "bg-gray-500/10 text-gray-700 border-gray-200";
    }
  };

  const totalVendasHoje = mockVendas
    .filter(venda => venda.data === "2024-01-15")
    .reduce((acc, venda) => acc + venda.total, 0);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-8 h-8 text-green-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Vendas</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie vendas de produtos e serviços
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="lg" className="gap-2 bg-gradient-to-r from-green-vivid to-teal-vivid hover:shadow-glow">
              <Plus className="w-5 h-5" />
              Nova Venda
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Venda</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cliente"
                  rules={{ required: "Cliente é obrigatório" }}
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
                  name="produtos"
                  rules={{ required: "Produtos são obrigatórios" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produtos</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ração, Brinquedo, Coleira" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servicos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serviços</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Banho, Tosa, Consulta" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desconto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desconto (%)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Observações adicionais..." {...field} />
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
                    Criar Venda
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Hoje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-vivid">
              R$ {totalVendasHoje.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockVendas.filter(v => v.data === "2024-01-15").length} vendas realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Vendidos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação a ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 94,97</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Buscar vendas..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          Período
        </Button>
      </div>

      {/* Tabs de Vendas */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Todas as Vendas</CardTitle>
              <CardDescription>
                Histórico completo de vendas realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vendas.map((venda) => (
                  <Card key={venda.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <ShoppingCart className="w-6 h-6 text-green-vivid mx-auto" />
                            <p className="text-xs text-muted-foreground mt-1">#{venda.id}</p>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{venda.cliente}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <Package className="w-4 h-4" />
                                {venda.produtos.join(", ")}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {venda.vendedor}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {venda.data} às {venda.hora}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-vivid">
                              R$ {venda.total.toFixed(2)}
                            </p>
                            <Badge className={getStatusColor(venda.status)}>
                              {venda.status}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="w-4 h-4" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hoje" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas de Hoje</CardTitle>
              <CardDescription>
                {mockVendas.filter(v => v.data === "2024-01-15").length} vendas realizadas hoje
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Vendas de hoje: R$ {totalVendasHoje.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pendentes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendas Pendentes</CardTitle>
              <CardDescription>
                Vendas aguardando finalização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {mockVendas.filter(v => v.status === "pendente").length} vendas pendentes
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Vendas</CardTitle>
              <CardDescription>
                Análises e estatísticas de vendas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Relatórios em desenvolvimento.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Vendas;