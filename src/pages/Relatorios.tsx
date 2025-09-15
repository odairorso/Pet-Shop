import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp,
  TrendingDown,
  Users,
  PawPrint,
  DollarSign,
  ShoppingCart,
  CalendarIcon,
  FileText,
  Filter
} from "lucide-react";

const Relatorios = () => {
  const [activeTab, setActiveTab] = useState("financeiro");
  const [selectedPeriod, setSelectedPeriod] = useState("mes");
  const [dateRange, setDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  });

  // Mock data para demonstração
  const mockRelatorioFinanceiro = {
    totalReceitas: 15750.00,
    totalDespesas: 8450.00,
    lucroLiquido: 7300.00,
    crescimentoMensal: 12.5,
    transacoesPorCategoria: [
      { categoria: "Consultas", valor: 8500, porcentagem: 54 },
      { categoria: "Produtos", valor: 4200, porcentagem: 27 },
      { categoria: "Cirurgias", valor: 3050, porcentagem: 19 }
    ],
    despesasPorCategoria: [
      { categoria: "Salários", valor: 4500, porcentagem: 53 },
      { categoria: "Estoque", valor: 2300, porcentagem: 27 },
      { categoria: "Infraestrutura", valor: 1650, porcentagem: 20 }
    ]
  };

  const mockRelatorioVendas = {
    totalVendas: 12200.00,
    quantidadeVendas: 84,
    ticketMedio: 145.24,
    crescimentoVendas: 8.3,
    produtosMaisVendidos: [
      { produto: "Ração Premium", quantidade: 25, valor: 2750 },
      { produto: "Vacina Antirrábica", quantidade: 18, valor: 1260 },
      { produto: "Shampoo Medicinal", quantidade: 15, valor: 750 }
    ]
  };

  const mockRelatorioClientes = {
    totalClientes: 456,
    novosClientes: 23,
    clientesAtivos: 387,
    taxaRetencao: 84.8,
    clientesMaisFrequentes: [
      { nome: "Maria Silva", consultas: 8, ultimaVisita: "2024-01-10" },
      { nome: "João Santos", consultas: 6, ultimaVisita: "2024-01-08" },
      { nome: "Ana Costa", consultas: 5, ultimaVisita: "2024-01-12" }
    ]
  };

  const mockRelatorioAnimais = {
    totalAnimais: 623,
    novosAnimais: 31,
    especiesMaisComuns: [
      { especie: "Cão", quantidade: 421, porcentagem: 67.6 },
      { especie: "Gato", quantidade: 156, porcentagem: 25.0 },
      { especie: "Outros", quantidade: 46, porcentagem: 7.4 }
    ],
    consultasPorEspecie: [
      { especie: "Cães", consultas: 145 },
      { especie: "Gatos", consultas: 67 },
      { especie: "Outros", consultas: 12 }
    ]
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-blue-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Análises e insights da clínica veterinária
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mês</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="ano">Ano</SelectItem>
              <SelectItem value="personalizado">Personalizado</SelectItem>
            </SelectContent>
          </Select>
          
          {selectedPeriod === "personalizado" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
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
                </div>
              </PopoverContent>
            </Popover>
          )}
          
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tabs de Relatórios */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="vendas">Vendas</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="animais">Animais</TabsTrigger>
        </TabsList>

        {/* Relatório Financeiro */}
        <TabsContent value="financeiro" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receitas Totais</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  R$ {mockRelatorioFinanceiro.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  +{mockRelatorioFinanceiro.crescimentoMensal}% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
                <TrendingDown className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  R$ {mockRelatorioFinanceiro.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Gastos do período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <DollarSign className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  R$ {mockRelatorioFinanceiro.lucroLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Margem de {((mockRelatorioFinanceiro.lucroLiquido / mockRelatorioFinanceiro.totalReceitas) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioFinanceiro.crescimentoMensal}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Crescimento mensal
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receitas por Categoria</CardTitle>
                <CardDescription>Distribuição das receitas por tipo de serviço</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRelatorioFinanceiro.transacoesPorCategoria.map((item) => (
                    <div key={item.categoria} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-vivid rounded-full"></div>
                        <span className="text-sm font-medium">{item.categoria}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">R$ {item.valor.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-muted-foreground">{item.porcentagem}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Despesas por Categoria</CardTitle>
                <CardDescription>Distribuição dos gastos por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRelatorioFinanceiro.despesasPorCategoria.map((item) => (
                    <div key={item.categoria} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">{item.categoria}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">R$ {item.valor.toLocaleString('pt-BR')}</div>
                        <div className="text-xs text-muted-foreground">{item.porcentagem}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Relatório de Vendas */}
        <TabsContent value="vendas" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {mockRelatorioVendas.totalVendas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockRelatorioVendas.quantidadeVendas} vendas realizadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {mockRelatorioVendas.ticketMedio.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Valor médio por venda
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quantidade</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioVendas.quantidadeVendas}
                </div>
                <p className="text-xs text-muted-foreground">
                  Vendas no período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crescimento</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +{mockRelatorioVendas.crescimentoVendas}%
                </div>
                <p className="text-xs text-muted-foreground">
                  vs período anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
              <CardDescription>Top produtos por quantidade e valor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRelatorioVendas.produtosMaisVendidos.map((produto, index) => (
                  <div key={produto.produto} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <div>
                        <h4 className="font-medium">{produto.produto}</h4>
                        <p className="text-sm text-muted-foreground">{produto.quantidade} unidades vendidas</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">R$ {produto.valor.toLocaleString('pt-BR')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatório de Clientes */}
        <TabsContent value="clientes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioClientes.totalClientes}
                </div>
                <p className="text-xs text-muted-foreground">
                  Clientes cadastrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novos Clientes</CardTitle>
                <Users className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +{mockRelatorioClientes.novosClientes}
                </div>
                <p className="text-xs text-muted-foreground">
                  Neste período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockRelatorioClientes.clientesAtivos}
                </div>
                <p className="text-xs text-muted-foreground">
                  Com consultas recentes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioClientes.taxaRetencao}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Clientes recorrentes
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Clientes Mais Frequentes</CardTitle>
              <CardDescription>Clientes com mais consultas no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRelatorioClientes.clientesMaisFrequentes.map((cliente, index) => (
                  <div key={cliente.nome} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <div>
                        <h4 className="font-medium">{cliente.nome}</h4>
                        <p className="text-sm text-muted-foreground">Última visita: {cliente.ultimaVisita}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{cliente.consultas} consultas</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatório de Animais */}
        <TabsContent value="animais" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Animais</CardTitle>
                <PawPrint className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioAnimais.totalAnimais}
                </div>
                <p className="text-xs text-muted-foreground">
                  Animais cadastrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Novos Animais</CardTitle>
                <PawPrint className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  +{mockRelatorioAnimais.novosAnimais}
                </div>
                <p className="text-xs text-muted-foreground">
                  Neste período
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Espécie Principal</CardTitle>
                <PawPrint className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockRelatorioAnimais.especiesMaisComuns[0].especie}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockRelatorioAnimais.especiesMaisComuns[0].porcentagem}% dos animais
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consultas</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockRelatorioAnimais.consultasPorEspecie.reduce((acc, item) => acc + item.consultas, 0)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Consultas realizadas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Espécie</CardTitle>
                <CardDescription>Percentual de animais por espécie</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRelatorioAnimais.especiesMaisComuns.map((item) => (
                    <div key={item.especie} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-vivid rounded-full"></div>
                        <span className="text-sm font-medium">{item.especie}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{item.quantidade} animais</div>
                        <div className="text-xs text-muted-foreground">{item.porcentagem}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consultas por Espécie</CardTitle>
                <CardDescription>Número de consultas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRelatorioAnimais.consultasPorEspecie.map((item) => (
                    <div key={item.especie} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-vivid rounded-full"></div>
                        <span className="text-sm font-medium">{item.especie}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{item.consultas} consultas</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Relatorios;