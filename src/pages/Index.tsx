import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Smartphone,
  ShoppingBag,
  TrendingUp
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Dashboard de Gestión",
      description: "Gerencia y Subgerencias",
      icon: LayoutDashboard,
      path: "/dashboard",
      color: "bg-gradient-primary"
    },
    {
      title: "Operaciones Móviles",
      description: "Handheld BOH",
      icon: Smartphone,
      path: "/handheld",
      color: "bg-gradient-secondary"
    },
    {
      title: "Punto de Venta",
      description: "POS Integration",
      icon: ShoppingBag,
      path: "/pos",
      color: "bg-primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Calzando México
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sistema de Gestión de Tienda
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Optimiza tu inventario, operaciones y ventas en un solo lugar
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.path}
                className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary overflow-hidden"
                onClick={() => navigate(role.path)}
              >
                <div className={`${role.color} p-8 transition-transform group-hover:scale-105`}>
                  <Icon className="h-16 w-16 text-white mx-auto" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {role.description}
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Acceder
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Funcionalidades Clave</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Control de Inventario</h3>
              <p className="text-sm text-muted-foreground">
                Visibilidad total en tiempo real
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Gestión de Personal</h3>
              <p className="text-sm text-muted-foreground">
                Roles, tareas y certificaciones
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold mb-2">KPIs Estratégicos</h3>
              <p className="text-sm text-muted-foreground">
                Métricas que impulsan resultados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
