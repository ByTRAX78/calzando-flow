// src/pages/tienda/Task.tsx
import React, { useState, useEffect } from "react"; // <-- AÑADIDO useState, useEffect
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard,
  Package, 
  ClipboardList,
  Users,
  ShoppingBag,
  CheckCircle,
  ArrowUpDown,
  Clock,
  Calendar,
  Search,
  Filter,
  Loader2 // <-- AÑADIDO
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// --- AÑADIDO: Componentes de Dialog, Label y useToast ---
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const StoreTasks = () => {
  const { toast } = useToast(); // <-- AÑADIDO
  
  // --- AÑADIDO: Estado para el formulario del Dialog ---
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    priority: "medium",
    type: "handheld_resupply",
    assigned: "José Ramírez"
  });

  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList, active: true },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  // --- MODIFICACIÓN: Tareas ahora en estado (aún mock, pero listo para fetch) ---
  const [pendingTasks, setPendingTasks] = useState([
    // ... (tus tareas mock)
    {
      id: "TASK-1234",
      title: "Resurtir Zapatos Casuales Hombre",
      type: "resupply",
      area: "Piso de Venta",
      assigned: "José Ramírez",
      priority: "high",
      status: "pending",
      created: "Hoy, 10:45",
      dueDate: "Hoy, 12:30"
    },
    // ...
  ]);

  // (Aquí podrías añadir un useEffect para cargar tareas de tienda)
  const fetchStoreTasks = () => {
    // Lógica para cargar tareas de tienda (diferente de handheld)
  }
  
  // --- AÑADIDO: Lógica para crear la tarea de handheld ---
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let taskData = {};
      
      if (formData.type === 'handheld_resupply') {
        taskData = {
          title: formData.title,
          subtitle: formData.subtitle,
          priority: formData.priority,
          assigned: formData.assigned,
          type: 'resupply', // Tipo 'resupply' para el backend
        };
      } else {
        // Lógica para crear otros tipos de tareas de tienda
        taskData = { ...formData };
      }

      const response = await fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }

      const newTask = await response.json();
      
      // Si la tarea es de handheld, no la añadimos a esta lista
      // (a menos que quieras verla aquí también)
      // setPendingTasks(prev => [newTask, ...prev]);

      toast({
        title: "Tarea Creada",
        description: `La tarea "${newTask.title}" ha sido enviada al Handheld.`,
      });

      setOpen(false); // Cierra el dialog
      setFormData({ // Resetea el formulario
        title: "",
        subtitle: "",
        priority: "medium",
        type: "handheld_resupply",
        assigned: "José Ramírez"
      });

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // ... (tus funciones getPriorityBadge y getStatusBadge) ...
    const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-warning text-warning-foreground">Alta</Badge>;
      case "medium":
        return <Badge className="bg-secondary text-secondary-foreground">Media</Badge>;
      case "low":
        return <Badge className="bg-muted text-muted-foreground">Baja</Badge>;
      default:
        return <Badge>Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-muted text-muted-foreground">Pendiente</Badge>;
      case "in-progress":
        return <Badge className="bg-store text-store-foreground">En Progreso</Badge>;
      case "completed":
        return <Badge className="bg-success text-success-foreground">Completada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <Layout 
      title="Gestión de Tareas"
      subtitle="Monitor de la cola de trabajo de BOH"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Gerente de Tienda"
    >
      <Tabs defaultValue="pending" className="mb-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="pending">Tareas Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Tareas Completadas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-store" />
                  Tareas Pendientes
                </CardTitle>
                
                {/* --- MODIFICACIÓN: Botón ahora abre un Dialog --- */}
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-store text-store-foreground hover:bg-store/90">
                      Asignar Nueva Tarea
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleCreateTask}>
                      <DialogHeader>
                        <DialogTitle>Asignar Nueva Tarea</DialogTitle>
                        <DialogDescription>
                          Crea una tarea para el equipo de tienda o envía una tarea de resurtido al Handheld.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="type" className="text-right">Tipo</Label>
                          <div className="col-span-3">
                            <Select 
                              value={formData.type} 
                              onValueChange={(value) => handleSelectChange('type', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona un tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="handheld_resupply">Handheld (Resurtido)</SelectItem>
                                <SelectItem value="store_task">Tarea de Tienda</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="title" className="text-right">Título</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleFormChange}
                            className="col-span-3"
                            placeholder="Ej: Resurtir Nike Air Max"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subtitle" className="text-right">Subtítulo</Label>
                          <Input
                            id="subtitle"
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleFormChange}
                            className="col-span-3"
                            placeholder="Ej: 5 pzs, Zona A-03"
                          />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority" className="text-right">Prioridad</Label>
                          <div className="col-span-3">
                            <Select 
                              value={formData.priority} 
                              onValueChange={(value) => handleSelectChange('priority', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona prioridad" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="high">Alta</SelectItem>
                                <SelectItem value="medium">Media</SelectItem>
                                <SelectItem value="low">Baja</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="assigned" className="text-right">Asignado</Label>
                          <div className="col-span-3">
                            <Select 
                              value={formData.assigned} 
                              onValueChange={(value) => handleSelectChange('assigned', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona empleado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="José Ramírez">José Ramírez</SelectItem>
                                <SelectItem value="Carlos Mendoza">Carlos Mendoza</SelectItem>
                                <SelectItem value="María López">María López</SelectItem>
                                <SelectItem value="Luis Torres">Luis Torres</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Crear Tarea
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* --- FIN DE LA MODIFICACIÓN DEL DIALOG --- */}
                
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                {/* ... (Filtros y búsqueda) ... */}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {/* ... (Tus TableHead) ... */}
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Tarea</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Asignado a</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Límite</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* --- MODIFICACIÓN: Mapea desde el estado 'pendingTasks' --- */}
                    {pendingTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-mono text-xs">{task.id}</TableCell>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell>{task.area}</TableCell>
                        <TableCell>{task.assigned}</TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              className="h-8 bg-store text-store-foreground hover:bg-store/90"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Completar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                            >
                              <ArrowUpDown className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {/* ... (Paginación) ... */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          {/* ... (Tu contenido de tareas completadas) ... */}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StoreTasks;