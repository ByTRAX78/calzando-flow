import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Package, 
  Truck, 
  Warehouse,
  Scan,
  ArrowDownToLine,
  ArrowUpToLine,
  Trash2,
  FileSearch,
  CheckCircle
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const HandheldDashboard = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/handheld', icon: LayoutDashboard, active: true },
    { name: 'Recibo', href: '/handheld/receipt', icon: Truck },
    { name: 'Guardado', href: '/handheld/putaway', icon: ArrowDownToLine },
    { name: 'Resurtido', href: '/handheld/resupply', icon: ArrowUpToLine },
    { name: 'Inventario', href: '/handheld/inventory', icon: FileSearch },
    { name: 'Merma', href: '/handheld/waste', icon: Trash2 },
  ];

  const statusCards = [
    { 
      title: "Tareas Activas", 
      value: "12",
      icon: Package,
      color: "bg-handheld/10 text-handheld" 
    },
    { 
      title: "Completadas Hoy", 
      value: "45",
      icon: CheckCircle,
      color: "bg-success/10 text-success" 
    },
    { 
      title: "Tiempo Promedio", 
      value: "2.1h",
      icon: Warehouse,
      color: "bg-secondary/10 text-secondary" 
    }
  ];

  const pendingTasks = [
    {
      id: "TASK-3456",
      type: "receipt",
      title: "Recibir Embarque",
      subtitle: "SHIP-1234 desde CEDIS",
      priority: "high",
      icon: Truck
    },
    {
      id: "TASK-3457",
      type: "putaway",
      title: "Guardar Productos",
      subtitle: "12 productos en 2 tarimas",
      priority: "medium",
      icon: ArrowDownToLine
    },
    {
      id: "TASK-3458",
      type: "resupply",
      title: "Resurtir Piso de Venta",
      subtitle: "8 productos urgentes",
      priority: "high",
      icon: ArrowUpToLine
    },
    {
      id: "TASK-3459",
      type: "inventory",
      title: "Conteo de Inventario",
      subtitle: "Zona A - Rack 3",
      priority: "medium",
      icon: FileSearch
    },
    {
      id: "TASK-3460",
      type: "waste",
      title: "Procesar Merma",
      subtitle: "2 productos dañados",
      priority: "low",
      icon: Trash2
    }
  ];

  const recentActivity = [
    {
      id: "ACT-8765",
      type: "resupply",
      description: "Resurtido Completado",
      details: "SKU 12345 - A-03-N2",
      time: "Hace 5 minutos",
      icon: ArrowUpToLine,
      color: "bg-success/10 text-success"
    },
    {
      id: "ACT-8764",
      type: "putaway",
      description: "Guardado Completado",
      details: "Tarima T-001",
      time: "Hace 15 minutos",
      icon: ArrowDownToLine,
      color: "bg-info/10 text-info"
    }
  ];

  // Function to get priority badge color
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-warning text-warning-foreground">Alta</Badge>;
      case "medium":
        return <Badge className="bg-info text-info-foreground">Media</Badge>;
      case "low":
        return <Badge className="bg-muted text-muted-foreground">Baja</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  // Helper function to get route based on task type
  const getTaskRoute = (type: string) => {
    return `/handheld/${type}`;
  };

  // Helper function to get module color class
  const getModuleColorClass = (type: string) => {
    switch (type) {
      case "receipt":
        return "bg-truck hover:bg-truck/90 text-truck-foreground";
      case "putaway":
        return "bg-secondary hover:bg-secondary/90 text-secondary-foreground";
      case "resupply":
        return "bg-handheld hover:bg-handheld/90 text-handheld-foreground";
      case "inventory":
        return "bg-info hover:bg-info/90 text-info-foreground";
      case "waste":
        return "bg-warning hover:bg-warning/90 text-warning-foreground";
      default:
        return "bg-primary hover:bg-primary/90 text-primary-foreground";
    }
  };

  return (
    <Layout 
      title="Operaciones BOH"
      subtitle="Handheld - Tareas de Operación en Tienda"
      moduleType="handheld"
      navigation={navigationItems}
      userName="María González"
      userRole="Asociado Operativo"
    >
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statusCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${card.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{card.title}</p>
                    <p className="text-2xl font-bold">{card.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="tasks" className="mb-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="tasks">Tareas Pendientes</TabsTrigger>
          <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
        </TabsList>
        
        {/* Pending Tasks Tab */}
        <TabsContent value="tasks">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Package className="h-5 w-5 text-handheld" />
                Cola de Trabajo
              </CardTitle>
              <CardDescription>
                Tareas pendientes priorizadas automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => {
                  const TaskIcon = task.icon;
                  const colorClass = getModuleColorClass(task.type);
                  
                  return (
                    <Card key={task.id} className="shadow-soft hover:shadow-medium cursor-pointer transition-all">
                      <CardContent className="p-0">
                        <div className="flex border-l-4 border-handheld">
                          <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-md bg-muted`}>
                                  <TaskIcon className={`h-5 w-5 text-handheld`} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-base">{task.title}</h3>
                                  <p className="text-sm text-muted-foreground">{task.subtitle}</p>
                                </div>
                              </div>
                              <div>
                                {getPriorityBadge(task.priority)}
                              </div>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-xs text-muted-foreground font-mono">{task.id}</span>
                              <Button 
                                className={colorClass}
                                size="sm"
                              >
                                Iniciar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recent Activity Tab */}
        <TabsContent value="activity">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>
                Últimas tareas completadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const ActivityIcon = activity.icon;
                  
                  return (
                    <Card key={activity.id} className="shadow-soft">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 ${activity.color} rounded-lg`}>
                            <ActivityIcon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{activity.description}</p>
                            <p className="text-xs text-muted-foreground">{activity.details}</p>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                {/* Show more activities button */}
                <Button variant="outline" className="w-full">
                  Ver Más Actividad
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Daily Stats Card */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Estadísticas del Día
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Resurtidos Completados</p>
                    <p className="text-xl font-bold">18 <span className="text-sm font-normal text-success">+4</span></p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Guardados</p>
                    <p className="text-xl font-bold">12 <span className="text-sm font-normal text-success">+2</span></p>
                  </div>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Tiempo Promedio por Tarea</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">24 min</p>
                    <Badge>Top 10%</Badge>
                  </div>
                </div>
                
                <div className="bg-muted/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Tasa de Completado</p>
                  <p className="text-xl font-bold">96.5%</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-success rounded-full" style={{ width: '96.5%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Access Module Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Button className="bg-handheld text-handheld-foreground hover:bg-handheld/90 h-auto py-4 flex-col">
          <Scan className="h-6 w-6 mb-2" />
          <span>Escanear</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex-col">
          <Truck className="h-6 w-6 mb-2 text-handheld" />
          <span>Recibir</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex-col">
          <ArrowDownToLine className="h-6 w-6 mb-2 text-handheld" />
          <span>Guardar</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex-col">
          <ArrowUpToLine className="h-6 w-6 mb-2 text-handheld" />
          <span>Resurtir</span>
        </Button>
        
        <Button variant="outline" className="h-auto py-4 flex-col">
          <FileSearch className="h-6 w-6 mb-2 text-handheld" />
          <span>Inventario</span>
        </Button>
      </div>

    </Layout>
  );
};

export default HandheldDashboard;