import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  LayoutDashboard,
  ClipboardList,
  ShoppingBag,
  Banknote,
} from "lucide-react";
import { AiAssistant } from "@/components/AiAssistant";

const StoreDashboard = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard, active: true },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  const strategicKPIs = [
    { 
      title: "Rentabilidad", 
      value: "24.5%", 
      change: "+2.3%", 
      trend: "up",
      icon: DollarSign,
      color: "text-success bg-success/10"
    },
    { 
      title: "Días de Cobertura", 
      value: "45", 
      change: "-3 días", 
      trend: "up",
      icon: Clock,
      color: "text-info bg-info/10"
    },
    { 
      title: "Rotación de Inventario", 
      value: "8.2x", 
      change: "+0.5x", 
      trend: "up",
      icon: Package,
      color: "text-secondary bg-secondary/10"
    },
    { 
      title: "Venta Perdida", 
      value: "$12.4K", 
      change: "-$2.1K", 
      trend: "up",
      icon: AlertTriangle,
      color: "text-warning bg-warning/10"
    }
  ];

  const tacticalKPIs = [
    { title: "Exactitud de Inventario (EIR)", value: "96.8%", target: "95%", percent: 96.8 },
    { title: "Tasa de Conversión", value: "18.2%", target: "15%", percent: 91 },
    { title: "Ticket Promedio", value: "$285", target: "$250", percent: 114 },
    { title: "Andén a Ubicación", value: "2.3h", target: "3h", percent: 77 }
  ];

  const pendingTasks = [
    { title: "Ajustes de inventario", count: 5, icon: Package, color: "text-store" },
    { title: "Tareas de resurtido", count: 12, icon: ClipboardList, color: "text-store" },
    { title: "Citas programadas", count: 3, icon: Clock, color: "text-store" }
  ];

  return (
    <Layout 
      title="Dashboard de Gestión"
      subtitle="Vista General de KPIs y Operaciones"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Gerente de Tienda"
    >
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-store" />
          KPIs Estratégicos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicKPIs.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${kpi.color}`}>
                      <Icon className="h-6 w-6" />
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-store" />
          KPIs Tácticos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tacticalKPIs.map((kpi) => (
            <Card key={kpi.title} className="shadow-soft">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-3">{kpi.title}</p>
                <p className="text-2xl font-bold mb-2">{kpi.value}</p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Meta:</span>
                  <span className="font-semibold text-success">{kpi.target}</span>
                </div>
                <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-store rounded-full" 
                    style={{ width: `${Math.min(kpi.percent, 100)}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <section>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-store" />
                Tareas Pendientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task, index) => {
                  const Icon = task.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${task.color} p-2 rounded-md bg-muted`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span>{task.title}</span>
                      </div>
                      <div className="bg-store/10 text-store font-semibold px-3 py-1 rounded-md">
                        {task.count}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button className="w-full mt-5">
                Ver Todas las Tareas
              </Button>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Banknote className="h-5 w-5 text-store" />
                Resumen de Ventas (Hoy)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-store/5 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Ventas Totales</p>
                  <p className="text-2xl font-bold">$24,580</p>
                </div>
                <div className="bg-store/5 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Transacciones</p>
                  <p className="text-2xl font-bold">86</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ticket Promedio</span>
                  <span className="font-medium">$285.81</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tasa de Conversión</span>
                  <span className="font-medium">18.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hora Pico</span>
                  <span className="font-medium">12:00 - 13:00</span>
                </div>
              </div>
              
              <Button className="w-full mt-5" variant="outline">
                Ver Reporte Detallado
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>

      <section>
        <AiAssistant />
      </section>

    </Layout>
  );
};

export default StoreDashboard;