import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Smartphone,
  Warehouse,
  ShoppingBag,
  Truck
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Tienda",
      description: "Gestión de Tienda, Inventario y Ventas",
      icon: ShoppingBag,
      path: "/tienda", // <-- CORRECCIÓN: Cambiado de "/store" a "/tienda"
      color: "bg-store text-store-foreground",
      gradient: "from-store/80 to-store",
    },
    {
      title: "CEDIS",
      description: "Centro de Distribución e Integración",
      icon: Warehouse,
      path: "/cedis",
      color: "bg-cedis text-cedis-foreground",
      gradient: "from-cedis/80 to-cedis",
    },
    {
      title: "Handheld",
      description: "Operaciones BOH Móviles",
      icon: Smartphone,
      path: "/handheld",
      color: "bg-handheld text-handheld-foreground",
      gradient: "from-handheld/80 to-handheld",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      {/* Header */}
      <header className="bg-card border-b shadow-soft py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Calzando México</h1>
            <p className="text-sm text-muted-foreground">Sistema Integral de Gestión</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 py-12">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Bienvenido al Sistema de Gestión</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Selecciona tu rol para continuar
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <Card 
                  key={role.path}
                  className="overflow-hidden hover:shadow-medium transition-all duration-300 cursor-pointer border-2 hover:border-primary"
                  onClick={() => navigate(role.path)}
                >
                  <div className={`bg-gradient-to-br ${role.gradient} p-6 flex justify-center`}>
                    <Icon className="h-16 w-16 text-white" />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {role.description}
                    </p>
                    <Button 
                      className={`w-full ${role.color} hover:opacity-90`}
                    >
                      Ingresar
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Calzando México. Todos los derechos reservados.
            </p>
            <p className="text-sm text-muted-foreground">
              Versión 1.0.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;