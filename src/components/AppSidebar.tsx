import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Heart,
  UserCog,
  Package,
  Calendar,
  ShoppingCart,
  DollarSign,
  FileText,
  Settings,
  LogOut,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import logoImage from "@/assets/logo-animais-cia.png";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Clientes", url: "/dashboard/clientes", icon: Users },
  { title: "Animais", url: "/dashboard/animais", icon: Heart },
  { title: "Funcionários", url: "/dashboard/funcionarios", icon: UserCog },
  { title: "Produtos", url: "/dashboard/produtos", icon: Package },
  { title: "Agendamentos", url: "/dashboard/agendamentos", icon: Calendar },
  { title: "Vendas", url: "/dashboard/vendas", icon: ShoppingCart },
  { title: "Financeiro", url: "/dashboard/financeiro", icon: DollarSign },
  { title: "Relatórios", url: "/dashboard/relatorios", icon: FileText },
  { title: "Configurações", url: "/dashboard/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavCls = ({ isActive }: { isActive: boolean }, url: string) => {
    if (isActive) {
      // Specific gradient colors for each active section using design system colors
      if (url.includes('animais')) return "bg-gradient-to-r from-orange-vivid to-green-vivid text-white font-medium shadow-glow";
      if (url.includes('clientes')) return "bg-gradient-to-r from-blue-vivid to-purple-vivid text-white font-medium shadow-glow";
      if (url.includes('funcionarios')) return "bg-gradient-to-r from-purple-vivid to-blue-vivid text-white font-medium shadow-glow";
      if (url.includes('produtos')) return "bg-gradient-to-r from-orange-vivid to-red-vivid text-white font-medium shadow-glow";
      if (url.includes('agendamentos')) return "bg-gradient-to-r from-teal-vivid to-blue-vivid text-white font-medium shadow-glow";
      if (url.includes('vendas')) return "bg-gradient-to-r from-green-vivid to-teal-vivid text-white font-medium shadow-glow";
      if (url.includes('financeiro')) return "bg-gradient-to-r from-red-vivid to-orange-vivid text-white font-medium shadow-glow";
      if (url.includes('relatorios')) return "bg-gradient-to-r from-purple-vivid to-teal-vivid text-white font-medium shadow-glow";
      if (url.includes('configuracoes')) return "bg-gradient-to-r from-muted to-accent text-white font-medium shadow-glow";
      return "bg-gradient-to-r from-blue-vivid to-purple-vivid text-white font-medium shadow-glow"; // dashboard default
    }
    return "hover:bg-sidebar-accent/50 text-sidebar-foreground transition-all duration-200";
  };

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className={isCollapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      {/* Header com Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={logoImage}
            alt="Animais e Cia" 
            className="w-8 h-8 rounded-lg"
          />
          {!isCollapsed && (
            <span className="text-sidebar-foreground font-semibold text-lg">
              Animais e Cia
            </span>
          )}
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/dashboard"}
                      className={({ isActive }) => getNavCls({ isActive }, item.url)}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer com usuário */}
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 text-sidebar-foreground">
          <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <User className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Usuário do Sistema</p>
              <p className="text-xs text-muted-foreground truncate">usuario@petshop.com</p>
            </div>
          )}
          <button className="p-1 hover:bg-sidebar-accent rounded text-sidebar-foreground">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}