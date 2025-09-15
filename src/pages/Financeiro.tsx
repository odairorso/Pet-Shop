import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CalendarIcon
} from "lucide-react";

const transactionSchema = z.object({
  tipo: z.string().min(1, "Tipo é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().min(0.01, "Valor deve ser maior que zero"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  formaPagamento: z.string().min(1, "Forma de pagamento é obrigatória"),
  data: z.date()
});

type TransactionForm = z.infer<typeof transactionSchema>;

const Financeiro = () => {
  const [activeTab, setActiveTab] = useState("resumo");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    tipo: "",
    categoria: "",
    formaPagamento: ""
  });
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });

  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      tipo: "",
      descricao: "",
      valor: 0,
      categoria: "",
      formaPagamento: "",
      data: new Date()
    }
  });

  const [mockTransacoes, setMockTransacoes] = useState([
    {
      id: 1,
      tipo: "receita",
      descricao: "Venda de produtos",
      valor: 450.00,
      data: "2024-01-15",
      categoria: "Vendas",
      formaPagamento: "Cartão de Crédito"
    },
    {
      id: 2,
      tipo: "despesa",
      descricao: "Compra de ração",
      valor: 230.00,
      data: "2024-01-15",
      categoria: "Estoque",
      formaPagamento: "Transferência"
    },
    {
      id: 3,
      tipo: "receita",
      descricao: "Consulta veterinária",
      valor: 150.00,
      data: "2024-01-14",
      categoria: "Serviços",
      formaPagamento: "Dinheiro"
    },
    {
      id: 4,
      tipo: "despesa",
      descricao: "Aluguel",
      valor: 1200.00,
      data: "2024-01-01",
      categoria: "Infraestrutura",
      formaPagamento: "Transferência"
    }
  ]);

  // Filtrar transações baseado na busca e filtros
  const filteredTransacoes = mockTransacoes.filter(transacao => {
    const matchesSearch = transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transacao.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = (!selectedFilters.tipo || transacao.tipo === selectedFilters.tipo) &&
                          (!selectedFilters.categoria || transacao.categoria === selectedFilters.categoria) &&
                          (!selectedFilters.formaPagamento || transacao.formaPagamento === selectedFilters.formaPagamento);
    
    const matchesDateRange = (!dateRange.from || new Date(transacao.data) >= dateRange.from) &&
                            (!dateRange.to || new Date(transacao.data) <= dateRange.to);
    
    return matchesSearch && matchesFilters && matchesDateRange;
  });

  const onSubmit = (data: TransactionForm) => {
    const newTransaction = {
      id: mockTransacoes.length + 1,
      tipo: data.tipo,
      descricao: data.descricao,
      valor: data.valor,
      data: format(data.data, "yyyy-MM-dd"),
      categoria: data.categoria,
      formaPagamento: data.formaPagamento
    };
    
    setMockTransacoes([...mockTransacoes, newTransaction]);
    form.reset();
    setIsDialogOpen(false);
    
    toast({
      title: "Transação adicionada",
      description: `${data.tipo === "receita" ? "Receita" : "Despesa"} de R$ ${data.valor.toFixed(2)} adicionada com sucesso.`
    });
  };

  const totalReceitas = filteredTransacoes
    .filter(t => t.tipo === "receita")
    .reduce((acc, t) => acc + t.valor, 0);

  const totalDespesas = filteredTransacoes
    .filter(t => t.tipo === "despesa")
    .reduce((acc, t) => acc + t.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const getTransactionIcon = (tipo: string) => {
    return tipo === "receita" ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-red-600" />
    );
  };

  const getTransactionColor = (tipo: string) => {
    return tipo === "receita" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-8 h-8 text-green-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Controle financeiro e fluxo de caixa
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" size="lg" className="gap-2 bg-gradient-to-r from-green-vivid to-teal-vivid hover:shadow-glow">
              <Plus className="w-5 h-5" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nova Transação</DialogTitle>
              <DialogDescription>
                Adicione uma nova receita ou despesa ao sistema
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="tipo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="receita">Receita</SelectItem>
                          <SelectItem value="despesa">Despesa</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input placeholder="Descrição da transação" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="valor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Vendas">Vendas</SelectItem>
                          <SelectItem value="Serviços">Serviços</SelectItem>
                          <SelectItem value="Estoque">Estoque</SelectItem>
                          <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Salários">Salários</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="formaPagamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de Pagamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a forma de pagamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                          <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                          <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                          <SelectItem value="Transferência">Transferência</SelectItem>
                          <SelectItem value="PIX">PIX</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecione a data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar Transação</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoAtual >= 0 ? 'text-green-vivid' : 'text-red-500'}`}>
              R$ {saldoAtual.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Disponível em conta
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalReceitas.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalDespesas.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meta Mensal</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.500,00</div>
            <p className="text-xs text-muted-foreground">
              75% da meta atingida
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar transações..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium leading-none">Filtros</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <Select 
                    value={selectedFilters.tipo} 
                    onValueChange={(value) => setSelectedFilters({...selectedFilters, tipo: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos os tipos</SelectItem>
                      <SelectItem value="receita">Receita</SelectItem>
                      <SelectItem value="despesa">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Categoria</label>
                  <Select 
                    value={selectedFilters.categoria} 
                    onValueChange={(value) => setSelectedFilters({...selectedFilters, categoria: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as categorias</SelectItem>
                      <SelectItem value="Vendas">Vendas</SelectItem>
                      <SelectItem value="Serviços">Serviços</SelectItem>
                      <SelectItem value="Estoque">Estoque</SelectItem>
                      <SelectItem value="Infraestrutura">Infraestrutura</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Salários">Salários</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Forma de Pagamento</label>
                  <Select 
                    value={selectedFilters.formaPagamento} 
                    onValueChange={(value) => setSelectedFilters({...selectedFilters, formaPagamento: value})}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Todas as formas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as formas</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                      <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                      <SelectItem value="Cartão de Débito">Cartão de Débito</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                      <SelectItem value="PIX">PIX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => setSelectedFilters({tipo: "", categoria: "", formaPagamento: ""})}
                >
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="w-4 h-4" />
              Período
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4 space-y-4">
              <h4 className="font-medium leading-none">Selecionar Período</h4>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Inicial</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "dd/MM/yyyy") : "Data inicial"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange({...dateRange, from: date})}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Data Final</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dateRange.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "dd/MM/yyyy") : "Data final"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange({...dateRange, to: date})}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setDateRange({from: undefined, to: undefined})}
              >
                Limpar Período
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Tabs de Financeiro */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="contas">Contas a Pagar</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo Financeiro</CardTitle>
              <CardDescription>
                Visão geral das finanças da clínica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h3 className="font-semibold">Entradas por Categoria</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Vendas</span>
                      <span className="text-sm font-medium text-green-600">R$ 450,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Serviços</span>
                      <span className="text-sm font-medium text-green-600">R$ 150,00</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold">Saídas por Categoria</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Estoque</span>
                      <span className="text-sm font-medium text-red-600">R$ 230,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Infraestrutura</span>
                      <span className="text-sm font-medium text-red-600">R$ 1.200,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>
                Todas as movimentações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransacoes.map((transacao) => (
                  <Card key={transacao.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            {getTransactionIcon(transacao.tipo)}
                            <p className="text-xs text-muted-foreground mt-1">#{transacao.id}</p>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{transacao.descricao}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{transacao.categoria}</span>
                              <span className="flex items-center gap-1">
                                <CreditCard className="w-4 h-4" />
                                {transacao.formaPagamento}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {transacao.data}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getTransactionColor(transacao.tipo)}`}>
                              {transacao.tipo === "receita" ? "+" : "-"}R$ {transacao.valor.toFixed(2)}
                            </p>
                            <Badge variant={transacao.tipo === "receita" ? "default" : "destructive"}>
                              {transacao.tipo}
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

        <TabsContent value="contas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contas a Pagar</CardTitle>
              <CardDescription>
                Compromissos financeiros pendentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma conta pendente.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Financeiros</CardTitle>
              <CardDescription>
                Análises e projeções financeiras
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

export default Financeiro;