import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Search, Filter, Plus, Users, Calendar, Weight, Stethoscope, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Cliente {
  id: number;
  nome: string;
}

interface Animal {
  id: number;
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  peso: string;
  cliente_id: number;
  cliente?: Cliente;
  created_at?: string;
  updated_at?: string;
}

const Animais = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [animalEditando, setAnimalEditando] = useState<Animal | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    nome: z.string().min(2, "Informe o nome do animal"),
    especie: z.string().min(1, "Selecione a espécie"),
    raca: z.string().min(2, "Informe a raça"),
    idade: z.string().min(1, "Informe a idade"),
    peso: z.string().min(1, "Informe o peso"),
    clienteId: z.string().min(1, "Selecione o cliente"),
  });

  type FormValues = z.infer<typeof formSchema>;

  // Carregar clientes do Supabase
  const carregarClientes = async () => {
    try {
      const { data, error } = await supabase
        .from('clientes')
        .select('id, nome')
        .order('nome');

      if (error) throw error;
      setClientes(data || []);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os clientes.",
        variant: "destructive",
      });
    }
  };

  // Carregar animais do Supabase
  const carregarAnimais = async () => {
    try {
      const { data, error } = await supabase
        .from('animais')
        .select(`
          *,
          cliente:clientes(id, nome)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAnimais(data || []);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os animais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao montar o componente
  useEffect(() => {
    carregarClientes();
    carregarAnimais();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      especie: "",
      raca: "",
      idade: "",
      peso: "",
      clienteId: "",
    },
  });

  const handleNovoAnimal = () => {
    setIsEditMode(false);
    setAnimalEditando(null);
    form.reset();
    setIsDialogOpen(true);
  };

  // Função para editar animal
  const editarAnimal = (animal: Animal) => {
    setAnimalEditando(animal);
    setIsEditMode(true);
    form.reset({
      nome: animal.nome,
      especie: animal.especie,
      raca: animal.raca,
      idade: animal.idade,
      peso: animal.peso,
      clienteId: animal.cliente_id.toString(),
    });
    setIsDialogOpen(true);
  };

  // Função para excluir animal
  const excluirAnimal = async (animalId: number) => {
    if (!confirm('Tem certeza que deseja excluir este animal?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('animais')
        .delete()
        .eq('id', animalId);

      if (error) {
        console.error('Erro ao excluir animal:', error);
        toast({
          title: "Erro",
          description: "Não foi possível excluir o animal.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Animal excluído com sucesso!",
        });
        await carregarAnimais();
      }
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: "Erro",
        description: "Erro inesperado ao excluir animal.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditMode && animalEditando) {
        // Atualizar animal existente
        const { error } = await supabase
          .from('animais')
          .update({
            nome: values.nome,
            especie: values.especie,
            raca: values.raca,
            idade: values.idade,
            peso: values.peso,
            cliente_id: parseInt(values.clienteId),
          })
          .eq('id', animalEditando.id);

        if (error) throw error;

        toast({
          title: "Animal atualizado!",
          description: `${values.nome} foi atualizado com sucesso.`,
        });
      } else {
        // Criar novo animal
        const { data, error } = await supabase
          .from('animais')
          .insert([
            {
              nome: values.nome,
              especie: values.especie,
              raca: values.raca,
              idade: values.idade,
              peso: values.peso,
              cliente_id: parseInt(values.clienteId),
            }
          ])
          .select(`
            *,
            cliente:clientes(id, nome)
          `);

        if (error) throw error;

        toast({
          title: "Animal cadastrado!",
          description: `${values.nome} foi cadastrado com sucesso.`,
        });
      }

      // Recarregar lista de animais
      await carregarAnimais();
      
      setIsDialogOpen(false);
      form.reset();
      setIsEditMode(false);
      setAnimalEditando(null);
    } catch (error) {
      console.error('Erro ao salvar animal:', error);
      toast({
        title: "Erro",
        description: isEditMode ? "Não foi possível atualizar o animal." : "Não foi possível cadastrar o animal.",
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
            <Heart className="w-8 h-8 text-orange-vivid" />
            <h1 className="text-3xl font-bold text-foreground">Animais</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Gerencie os pets dos seus clientes
          </p>
        </div>
        <Button variant="pet-orange" size="lg" className="gap-2" onClick={handleNovoAnimal}>
          <Plus className="w-5 h-5" />
          Novo Animal
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Buscar por nome, cliente, espécie ou raça..." 
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="default" className="gap-2 bg-card">
          <Users className="w-4 h-4" />
          Todos os clientes
        </Button>
        <Button variant="outline" size="default" className="gap-2">
          <Filter className="w-4 h-4" />
          Filtros
        </Button>
      </div>

      {/* Lista de Animais */}
      {loading ? (
        <div className="bg-card rounded-lg border border-border p-12 shadow-card text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pet-orange mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Carregando animais...</p>
        </div>
      ) : animais.length === 0 ? (
        <div className="bg-card rounded-lg border border-border p-12 shadow-card text-center">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            Nenhum animal cadastrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Comece cadastrando o primeiro animal
          </p>
          <Button variant="pet-orange" className="gap-2" onClick={handleNovoAnimal}>
            <Plus className="w-4 h-4" />
            Cadastrar Animal
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-vivid" />
              Animais Cadastrados
            </CardTitle>
            <CardDescription>
              {animais.length} animais registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {animais.map((animal) => (
                <Card key={animal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{animal.nome}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Stethoscope className="w-4 h-4" />
                            {animal.especie} - {animal.raca}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {animal.idade}
                          </span>
                          <span className="flex items-center gap-1">
                            <Weight className="w-4 h-4" />
                            {animal.peso}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-4 h-4 text-blue-vivid" />
                          <span className="text-sm">Cliente: {animal.cliente?.nome}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => editarAnimal(animal)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => excluirAnimal(animal.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog para Novo Animal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Editar Animal' : 'Novo Animal'}</DialogTitle>
            <DialogDescription>
              {isEditMode ? 'Edite as informações do animal' : 'Cadastre um novo animal no sistema'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do animal</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Rex" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="especie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espécie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a espécie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cachorro">Cachorro</SelectItem>
                        <SelectItem value="Gato">Gato</SelectItem>
                        <SelectItem value="Pássaro">Pássaro</SelectItem>
                        <SelectItem value="Coelho">Coelho</SelectItem>
                        <SelectItem value="Outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="raca"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raça</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Golden Retriever" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="idade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3 anos" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="peso"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 25 kg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="clienteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o cliente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id.toString()}>
                            {cliente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="pet-orange">
                  {isEditMode ? 'Atualizar Animal' : 'Cadastrar Animal'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Animais;