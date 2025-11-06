import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  MapPin, 
  RefreshCw, 
  Scan,
  AlertCircle,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Handheld = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Recibo Planificado",
      description: "Escanear y validar mercancía entrante",
      icon: Package,
      status: "3 citas pendientes",
      color: "bg-primary",
      badge: "success"
    },
    {
      title: "Guardado Dirigido",
      description: "Put-Away guiado por sistema",
      icon: MapPin,
      status: "12 items en cola",
      color: "bg-secondary",
      badge: "warning"
    },
    {
      title: "Resurtido Proactivo",
      description: "Tareas prioritarias de resurtido",
      icon: RefreshCw,
      status: "8 tareas urgentes",
      color: "bg-info",
      badge: "destructive"
    },
    {
      title: "Control de Inventario",
      description: "Conteo confirmatorio diario",
      icon: Scan,
      status: "Zona A pendiente",
      color: "bg-success",
      badge: "default"
    },
    {
      title: "Gestión de Mermas",
      description: "Registrar productos dañados",
      icon: AlertCircle,
      status: "2 items hoy",
      color: "bg-warning",
      badge: "default"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <header className="bg-card border-b shadow-soft sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary">Operaciones BOH</h1>
                <p className="text-xs text-muted-foreground">Asociado: María González</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-semibold">
              MG
            </div>
          </div>
        </div>
      </header>

      <div className="px-4 py-6">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">12</div>
            <div className="text-xs text-muted-foreground">Tareas Activas</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">45</div>
            <div className="text-xs text-muted-foreground">Completadas Hoy</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary mb-1">2.1h</div>
            <div className="text-xs text-muted-foreground">Tiempo Promedio</div>
          </Card>
        </div>

        {/* Modules */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary" />
            Selecciona una Operación
          </h2>
          <div className="space-y-4">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <Card 
                  key={module.title}
                  className="overflow-hidden hover:shadow-medium transition-shadow cursor-pointer group"
                >
                  <div className="flex">
                    <div className={`${module.color} p-6 flex items-center justify-center`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-base">{module.title}</h3>
                        <Badge variant={module.badge as any}>
                          {module.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {module.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        variant="outline"
                      >
                        Iniciar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-8">
          <h2 className="text-lg font-bold mb-4">Actividad Reciente</h2>
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Resurtido Completado</p>
                  <p className="text-xs text-muted-foreground">SKU 12345 - A-03-N2</p>
                  <p className="text-xs text-muted-foreground mt-1">Hace 5 minutos</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-info/10 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-info" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Guardado Completado</p>
                  <p className="text-xs text-muted-foreground">Tarima T-001</p>
                  <p className="text-xs text-muted-foreground mt-1">Hace 15 minutos</p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-strong">
        <div className="grid grid-cols-3 gap-1 p-2">
          <Button variant="ghost" className="flex-col h-auto py-3">
            <Scan className="h-5 w-5 mb-1" />
            <span className="text-xs">Escanear</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-3">
            <Package className="h-5 w-5 mb-1" />
            <span className="text-xs">Tareas</span>
          </Button>
          <Button variant="ghost" className="flex-col h-auto py-3">
            <AlertCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">Ayuda</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Handheld;
