import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Tags, 
  ArrowUp, 
  ArrowDown,
  AlertTriangle,
  DollarSign,
  FileText,
  Edit,
  Trash2
} from "lucide-react";

const Produtos = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lista");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const categorias = ["Alimentação", "Higiene", "Brinquedos", "Acessórios", "Medicamentos", "Outros"];

  const formSchema = z.object({
    nome: z.string().min(2, "Informe o nome do produto"),
    codigo: z.string().min(3, "Código deve ter pelo menos 3 caracteres"),
    categoria: z.string().min(1, "Selecione uma categoria"),
    preco: z.string().min(1, "Informe o preço"),
    estoque: z.string().min(1, "Informe a quantidade em estoque"),
    estoqueMinimo: z.string().min(1, "Informe o estoque mínimo"),
    descricao: z.string().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      codigo: "",
      categoria: "",
      preco: "",
      estoque: "",
      estoqueMinimo: "",
      descricao: "",
    },
  });

  const handleNovoProduto = () => {
    setIsEditMode(false);
    setProdutoEditando(null);
    form.reset();
    setIsDialogOpen(true);
  };

  // Função para editar produto
  const editarProduto = (produto: any) => {
    setProdutoEditando(produto);
    setIsEditMode(true);
    form.reset({
      nome: produto.nome,
      codigo: produto.codigo,
      categoria: produto.categoria,
      preco: produto.preco.toString(),
      estoque: produto.estoque.toString(),
      estoqueMinimo: produto.estoqueMinimo.toString(),
      descricao: produto.descricao || "",
    });
    setIsDialogOpen(true);
  };

  // Função para excluir produto
  const excluirProduto = (produtoId: number) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    setProdutos(prev => prev.filter(produto => produto.id !== produtoId));
    
    toast({
      title: "Produto excluído",
      description: "Produto removido do estoque com sucesso!",
    });
  };

  const mockProdutos = [
    {
      id: 1,
      nome: "Ração Premium Dog",
      categoria: "Alimentação",
      preco: 89.90,
      estoque: 25,
      estoqueMinimo: 5,
      codigo: "RAC001"
    },
    {
      id: 2,
      nome: "Shampoo Antipulgas",
      categoria: "Higiene",
      preco: 24.50,
      estoque: 12,
      estoqueMinimo: 10,
      codigo: "HIG001"
    }
  ];

  const [produtos, setProdutos] = useState(mockProdutos);

  const onSubmit = (values: FormValues) => {
    if (isEditMode && produtoEditando) {
      // Atualizar produto existente
      const produtoAtualizado = {
        ...produtoEditando,
        nome: values.nome,
        codigo: values.codigo,
        categoria: values.categoria,
        preco: parseFloat(values.preco),
        estoque: parseInt(values.estoque),
        estoqueMinimo: parseInt(values.estoqueMinimo),
        descricao: values.descricao || "",
      };

      setProdutos(prev => prev.map(produto => 
        produto.id === produtoEditando.id ? produtoAtualizado : produto
      ));

      toast({
        title: "Produto atualizado",
        description: `${values.nome} foi atualizado com sucesso.`,
      });
    } else {
      // Criar novo produto
      const novoProduto = {
        id: Date.now(),
        nome: values.nome,
        codigo: values.codigo,
        categoria: values.categoria,
        preco: parseFloat(values.preco),
        estoque: parseInt(values.estoque),
        estoqueMinimo: parseInt(values.estoqueMinimo),
        descricao: values.descricao || "",
      };

      setProdutos((prev) => [novoProduto, ...prev]);

      toast({
        title: "Produto cadastrado",
        description: `${values.nome} foi adicionado ao estoque com sucesso.`,
      });
    }

    setIsDialogOpen(false);
    form.reset();
    setIsEditMode(false);
    setProdutoEditando(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-orange-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Produtos</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie produtos e controle de estoque
          </p>
        </div>
        <Button variant="default" size="lg" className="gap-2 bg-gradient-to-r from-orange-vivid to-red-vivid hover:shadow-glow" onClick={handleNovoProduto}>
          <Plus className="w-5 h-5" />
          Novo Produto
        </Button>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lista">Lista de Produtos</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="estoque">Controle de Estoque</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Lista de Produtos */}
        <TabsContent value="lista" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Produtos Cadastrados</CardTitle>
                  <CardDescription>
                    {produtos.length} produtos no sistema
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
                    placeholder="Buscar produtos..." 
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {produtos.map((produto) => (
                  <Card key={produto.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{produto.nome}</h3>
                            <span className="text-xs bg-muted px-2 py-1 rounded">
                              {produto.codigo}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Tags className="w-4 h-4" />
                              {produto.categoria}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              R$ {produto.preco.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Estoque</p>
                            <p className={`font-medium ${produto.estoque <= produto.estoqueMinimo ? 'text-red-vivid' : 'text-green-vivid'}`}>
                              {produto.estoque} unidades
                              {produto.estoque <= produto.estoqueMinimo && (
                                <AlertTriangle className="w-4 h-4 inline ml-1 text-red-vivid" />
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => editarProduto(produto)}
                              className="gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Editar
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => excluirProduto(produto.id)}
                              className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categorias */}
        <TabsContent value="categorias" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tags className="w-5 h-5 text-purple-vivid" />
                Categorias de Produtos
              </CardTitle>
              <CardDescription>
                Organize seus produtos por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Package className="w-8 h-8 text-orange-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Alimentação</h3>
                    <p className="text-sm text-muted-foreground">1 produto</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Package className="w-8 h-8 text-blue-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Higiene</h3>
                    <p className="text-sm text-muted-foreground">1 produto</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Controle de Estoque */}
        <TabsContent value="estoque" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUp className="w-5 h-5 text-green-vivid" />
                  Entrada de Estoque
                </CardTitle>
                <CardDescription>
                  Registrar nova entrada de produtos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ArrowUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDown className="w-5 h-5 text-red-vivid" />
                  Saída de Estoque
                </CardTitle>
                <CardDescription>
                  Registrar saídas e vendas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ArrowDown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Funcionalidade em desenvolvimento.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="relatorios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios de Produtos</CardTitle>
              <CardDescription>
                Análises e estatísticas de estoque
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <Package className="w-8 h-8 text-orange-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Relatório Geral</h3>
                    <p className="text-sm text-muted-foreground">Visão geral do estoque</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Estoque Baixo</h3>
                    <p className="text-sm text-muted-foreground">Produtos com estoque baixo</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-vivid mx-auto mb-2" />
                    <h3 className="font-medium">Valor do Estoque</h3>
                    <p className="text-sm text-muted-foreground">Análise financeira</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para Novo Produto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Edite as informações do produto' : 'Cadastre um novo produto no estoque'}
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
                      <FormLabel>Nome do produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ração Premium Dog" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="codigo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: RAC001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria} value={categoria}>
                            {categoria}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="preco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0,00" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="estoque"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque inicial</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="estoqueMinimo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque mínimo</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (opcional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descrição detalhada do produto..." 
                        className="resize-none" 
                        rows={3}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="default" className="bg-gradient-to-r from-orange-vivid to-red-vivid">
                  {isEditMode ? 'Atualizar Produto' : 'Cadastrar Produto'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Produtos;