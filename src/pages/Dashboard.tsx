import { Button } from "@/components/ui/button";
import { DashboardCard } from "@/components/DashboardCard";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Heart, 
  Calendar, 
  DollarSign, 
  CalendarDays,
  Search,
  UserPlus,
  FileText,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const dashboardStats = [
    {
      title: "Total de Clientes",
      value: "127",
      description: "Clientes cadastrados",
      icon: Users,
      variant: 'blue' as const
    },
    {
      title: "Animais Cadastrados",
      value: "89",
      description: "Pets ativos",
      icon: Heart,
      variant: 'magenta' as const
    },
    {
      title: "Agendamentos Hoje",
      value: "12",
      description: "Consultas marcadas",
      icon: Calendar,
      variant: 'green' as const
    },
    {
      title: "Receita do Mês",
      value: "R$ 8.450,00",
      description: "Faturamento mensal",
      icon: DollarSign,
      variant: 'orange' as const
    }
  ];

  const actionCards = [
    {
      title: "Novo Agendamento",
      value: "Agendar consulta",
      description: "Marque um novo atendimento",
      icon: CalendarDays,
      variant: 'orange' as const,
      onClick: () => navigate('/dashboard/agendamentos')
    },
    {
      title: "Novo Cliente",
      value: "Cadastrar cliente",
      description: "Adicione um novo cliente",
      icon: UserPlus,
      variant: 'teal' as const,
      onClick: () => navigate('/dashboard/clientes')
    },
    {
      title: "Relatórios",
      value: "Ver relatórios",
      description: "Analise os dados da clínica",
      icon: BarChart3,
      variant: 'purple' as const,
      onClick: () => navigate('/dashboard/relatorios')
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Visão geral da clínica veterinária
          </p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Agendamentos de Hoje */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-card-foreground">Agendamentos de Hoje</h2>
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/agendamentos')}>
            Ver Todos
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Buscar agendamentos..." 
              className="pl-10"
            />
          </div>
        </div>

        {/* Estado vazio */}
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Nenhum agendamento para hoje.</p>
        </div>
      </div>

      {/* Cards de Ações Rápidas */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {actionCards.map((card, index) => (
            <DashboardCard 
              key={index} 
              {...card} 
              isLarge={true}
              onButtonClick={card.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;