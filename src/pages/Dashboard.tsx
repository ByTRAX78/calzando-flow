import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const strategicKPIs = [
    { 
      title: "Rentabilidad", 
      value: "24.5%", 
      change: "+2.3%", 
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    { 
      title: "Días de Cobertura", 
      value: "45", 
      change: "-3 días", 
      trend: "up",
      icon: Clock,
      color: "text-info"
    },
    { 
      title: "Rotación de Inventario", 
      value: "8.2x", 
      change: "+0.5x", 
      trend: "up",
      icon: Package,
      color: "text-secondary"
    },
    { 
      title: "Venta Perdida", 
      value: "$12.4K", 
      change: "-$2.1K", 
      trend: "up",
      icon: AlertTriangle,
      color: "text-warning"
    }
  ];

  const tacticalKPIs = [
    { title: "Exactitud de Inventario (EIR)", value: "96.8%", target: "95%" },
    { title: "Tasa de Conversión", value: "18.2%", target: "15%" },
    { title: "Ticket Promedio", value: "$285", target: "$250" },
    { title: "Andén a Ubicación", value: "2.3h", target: "3h" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Dashboard de Gestión</h1>
                <p className="text-sm text-muted-foreground">Calzando México - Vista Ejecutiva</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Gerente: Juan Pérez</span>
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                JP
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Strategic KPIs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            KPIs Estratégicos
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {strategicKPIs.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <Card key={kpi.title} className="p-6 hover:shadow-medium transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${kpi.color.replace('text-', '')}/10`}>
                      <Icon className={`h-6 w-6 ${kpi.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tactical KPIs */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            KPIs Tácticos
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {tacticalKPIs.map((kpi) => (
              <Card key={kpi.title} className="p-6">
                <p className="text-sm text-muted-foreground mb-3">{kpi.title}</p>
                <p className="text-2xl font-bold mb-2">{kpi.value}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Meta:</span>
                  <span className="font-semibold text-success">{kpi.target}</span>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary w-4/5"></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            Acciones Rápidas
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-medium transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary transition-colors">
                  <Package className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold">Gestión de Inventario</h3>
                  <p className="text-sm text-muted-foreground">Ajustes y configuración</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Aprobar ajustes, configurar puntos de reorden y consultar inventario en tiempo real.
              </p>
              <Button variant="outline" className="w-full">
                Acceder
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-secondary/10 group-hover:bg-secondary transition-colors">
                  <Clock className="h-6 w-6 text-secondary group-hover:text-secondary-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold">Gestión de Tareas</h3>
                  <p className="text-sm text-muted-foreground">Monitor BOH</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Ver cola de trabajo, tiempos de ejecución y productividad por asociado.
              </p>
              <Button variant="outline" className="w-full">
                Ver Tareas
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-medium transition-shadow cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-success/10 group-hover:bg-success transition-colors">
                  <Users className="h-6 w-6 text-success group-hover:text-success-foreground transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold">Gestión de Personal</h3>
                  <p className="text-sm text-muted-foreground">Roles y certificaciones</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Administrar usuarios, asignar roles y gestionar certificaciones del equipo.
              </p>
              <Button variant="outline" className="w-full">
                Administrar
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
