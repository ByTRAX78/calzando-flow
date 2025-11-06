// src/pages/handheld/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CheckCircle,
  Sparkles,
  Loader2,
  Route
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";

// Definimos la interfaz de la Tarea
interface HandheldTask {
  id: string;
  type: "receipt" | "putaway" | "resupply" | "inventory" | "waste";
  title: string;
  subtitle: string;
  priority: "high" | "medium" | "low";
  icon: React.ElementType; // El icono se asignará en el frontend
}

// Mapeo de tipos a iconos
const taskIconMap = {
  receipt: Truck,
  putaway: ArrowDownToLine,
  resupply: ArrowUpToLine,
  inventory: FileSearch,
  waste: Trash2,
  default: Package
};

const HandheldDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [tasksOptimized, setTasksOptimized] = useState(false);
  
  // --- MODIFICACIÓN: Estado para tareas y carga ---
  const [tasks, setTasks] = useState<HandheldTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigationItems = [
    { name: 'Dashboard', href: '/handheld', icon: LayoutDashboard, active: true },
    { name: 'Recibo', href: '/handheld/receipt', icon: Truck },
    { name: 'Guardado', href: '/handheld/putaway', icon: ArrowDownToLine },
    { name: 'Resurtido', href: '/handheld/resupply', icon: ArrowUpToLine },
    { name: 'Inventario', href: '/handheld/inventory', icon: FileSearch },
    { name: 'Merma', href: '/handheld/waste', icon: Trash2 },
  ];

  // --- NUEVA FUNCIÓN: Obtener tareas del backend ---
  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/tareas/pendientes');
      if (!response.ok) {
        throw new Error('No se pudieron obtener las tareas');
      }
      const data: HandheldTask[] = await response.json();
      
      // Asignar icono basado en el tipo
      const tasksWithIcons = data.map(task => ({
        ...task,
        icon: taskIconMap[task.type] || taskIconMap.default
      }));

      setTasks(tasksWithIcons);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo conectar al servidor",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --- NUEVO: useEffect para cargar tareas al inicio ---
  useEffect(() => {
    fetchTasks();
  }, []);

  const statusCards = [
    { 
      title: "Tareas Activas", 
      value: isLoading ? "..." : tasks.length.toString(), // Modificado
      icon: Package,
      color: "bg-handheld/10 text-handheld" 
    },
    // ... otros cards (pueden seguir siendo mock)
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

  // --- ELIMINADO: Array 'pendingTasks' mock ---

  const recentActivity = [
    // ... (actividad reciente puede seguir siendo mock)
  ];

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

  const getTaskRoute = (type: string) => {
    // Asegura que la ruta coincida con HandheldLayout.tsx
    return `/handheld/${type}`;
  };

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

  const handleOptimizeRoutes = () => {
    setIsOptimizing(true);
    setTasksOptimized(false);
    
    // Simulación de IA (ordena por prioridad)
    setTimeout(() => {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      setTasks(prevTasks => 
        [...prevTasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
      );
      
      setIsOptimizing(false);
      setTasksOptimized(true);
      toast({
        title: "Rutas Optimizadas",
        description: "La IA ha recalculado el orden de tareas para minimizar el desplazamiento.",
      })
    }, 2000);
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
        
        <TabsContent value="tasks">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-handheld" />
                  Cola de Trabajo
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOptimizeRoutes}
                  disabled={isOptimizing || isLoading} // Modificado
                >
                  {isOptimizing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  {isOptimizing ? 'Optimizando...' : 'Optimizar Rutas con IA'}
                </Button>
              </div>
              <CardDescription>
                {/* ... (descripciones) */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* --- MODIFICACIÓN: Lógica de carga, vacío y listado --- */}
                {isLoading || isOptimizing ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="shadow-soft">
                      <CardContent className="p-4">
                        <div className="flex gap-3">
                          <Skeleton className="h-10 w-10 rounded-md" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : tasks.length === 0 ? (
                  <div className="text-center py-10">
                    <CheckCircle className="h-12 w-12 mx-auto text-success" />
                    <p className="mt-4 font-medium">¡Todo listo!</p>
                    <p className="text-sm text-muted-foreground">No hay tareas pendientes.</p>
                  </div>
                ) : (
                  tasks.map((task) => { // Modificado: usa 'tasks'
                    const TaskIcon = task.icon;
                    const colorClass = getModuleColorClass(task.type);
                    
                    return (
                      <Card key={task.id} className="shadow-soft hover:shadow-medium cursor-pointer transition-all">
                        <CardContent className="p-0">
                          <div className={`flex border-l-4 ${tasksOptimized ? 'border-success' : 'border-handheld'}`}>
                            <div className="p-4 flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-md bg-muted`}>
                                    <TaskIcon className={`h-5 w-5 ${tasksOptimized ? 'text-success' : 'text-handheld'}`} />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-base">{task.title}</h3>
                                    <p className="text-sm text-muted-foreground">{task.subtitle}</p>
                                    {tasksOptimized && (
                                      <Badge variant="outline" className="mt-2 bg-success/10 text-success border-success/30">
                                        <Route className="h-3 w-3 mr-1" />
                                        Ruta Optimizada
                                      </Badge>
                                    )}
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
                                  // --- MODIFICACIÓN: Navegación con estado ---
                                  onClick={() => navigate(getTaskRoute(task.type), { state: { task } })}
                                >
                                  Iniciar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          {/* ... (El contenido de Actividad Reciente puede seguir igual) ... */}
        </TabsContent>
      </Tabs>

      {/* ... (Botones de acceso rápido) ... */}

    </Layout>
  );
};

export default HandheldDashboard;