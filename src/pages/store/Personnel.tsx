// src/pages/tienda/Personnel.tsx
import React, { useState } from "react";
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
  Search,
  Filter,
  Plus,
  UserPlus,
  Award,
  UserCog,
  Send,
  Mail,
  Phone,
  Calendar,
  Loader2
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

// --- ¡¡AQUÍ ESTÁ LA CORRECCIÓN!! ---
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
// --- FIN DE LA CORRECCIÓN ---

import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const StorePersonnel = () => {
  const { toast } = useToast();
  // Estado para el formulario de delegar tarea
  const [taskDetails, setTaskDetails] = useState({ title: "", subtitle: "", priority: "medium" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para controlar qué dialog está abierto
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList }, // <-- Ruta corregida
    { name: 'Personal', href: '/tienda/personnel', icon: Users, active: true }, // <-- Marcado como activo
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  const personnel = [
    {
      id: "EMP-1001",
      name: "Juan Pérez",
      position: "Gerente de Tienda",
      role: "gerente",
      department: "Administración",
      certifications: ["Recibo", "Conteo", "Gestión"],
      startDate: "01/06/2022",
      status: "active",
      isHandheld: false // No usa handheld
    },
    {
      id: "EMP-1002",
      name: "María González",
      position: "Subgerente Comercial",
      role: "subgerente",
      department: "Ventas",
      certifications: ["Ventas", "Gestión"],
      startDate: "15/08/2022",
      status: "active",
      isHandheld: false // No usa handheld
    },
    {
      id: "EMP-1003",
      name: "Carlos Mendoza",
      position: "Subgerente de Operaciones",
      role: "subgerente",
      department: "Operaciones",
      certifications: ["Recibo", "Conteo", "Gestión"],
      startDate: "03/10/2022",
      status: "active",
      isHandheld: false // No usa handheld
    },
    {
      id: "EMP-1004",
      name: "José Ramírez",
      position: "Asociado Operativo",
      role: "asociado",
      department: "Operaciones",
      certifications: ["Recibo", "Resurtido"],
      startDate: "12/01/2023",
      status: "active",
      isHandheld: true // SÍ usa handheld
    },
    {
      id: "EMP-1005",
      name: "Ana López",
      position: "Asociado de Ventas",
      role: "asociado",
      department: "Ventas",
      certifications: ["Ventas"],
      startDate: "20/03/2023",
      status: "active",
      isHandheld: false // No usa handheld
    },
    {
      id: "EMP-1006",
      name: "Luis Torres",
      position: "Especialista de Inventario",
      role: "especialista",
      department: "Operaciones",
      certifications: ["Recibo", "Conteo", "Resurtido"],
      startDate: "05/05/2023",
      status: "active",
      isHandheld: true // SÍ usa handheld
    },
    {
      id: "EMP-1008",
      name: "Roberto Hernández",
      position: "Asociado Operativo",
      role: "asociado",
      department: "Operaciones",
      certifications: ["Resurtido"],
      startDate: "22/11/2023",
      status: "training",
      isHandheld: true // SÍ usa handheld
    }
  ];

  // ... (getRoleBadge y getStatusBadge sin cambios)
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "gerente":
        return <Badge className="bg-primary text-primary-foreground">Gerente</Badge>;
      case "subgerente":
        return <Badge className="bg-secondary text-secondary-foreground">Subgerente</Badge>;
      case "lider":
        return <Badge className="bg-store text-store-foreground">Líder</Badge>;
      case "especialista":
        return <Badge className="bg-info text-info-foreground">Especialista</Badge>;
      case "asociado":
        return <Badge className="bg-muted text-muted-foreground">Asociado</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-success-foreground">Activo</Badge>;
      case "training":
        return <Badge className="bg-warning text-warning-foreground">En Capacitación</Badge>;
      case "inactive":
        return <Badge className="bg-destructive text-destructive-foreground">Inactivo</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  // --- NUEVA FUNCIÓN ---
  // Maneja el envío del formulario de delegar tarea
  const handleDelegateTask = async (personName: string) => {
    if (!taskDetails.title || !taskDetails.subtitle) {
      toast({ title: "Campos incompletos", description: "Por favor, añade título y detalles.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    
    const taskData = {
      title: taskDetails.title,
      subtitle: taskDetails.subtitle,
      priority: taskDetails.priority,
      assigned: personName,
      type: 'resupply', // Se asume que delegar es para resurtido, o puedes añadir otro campo
    };

    try {
      const response = await fetch('http://localhost:3000/api/tareas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Error al enviar la tarea al backend');
      }

      const newTask = await response.json();
      
      toast({
        title: "¡Tarea Delegada!",
        description: `Tarea "${newTask.title}" enviada a ${personName}.`,
      });

      setOpenDialogId(null); // Cierra el dialog
      setTaskDetails({ title: "", subtitle: "", priority: "medium" }); // Resetea el formulario

    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Maneja cambios en el formulario del dialog
  const handleTaskFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskPriorityChange = (value: string) => {
    setTaskDetails(prev => ({ ...prev, priority: value }));
  };

  return (
    <Layout 
      title="Gestión de Personal"
      subtitle="Administración de roles y certificaciones"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Gerente de Tienda"
    >
      {/* --- AÑADIDO: TooltipProvider --- */}
      <TooltipProvider>
        <Tabs defaultValue="team" className="mb-8">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="team">Equipo</TabsTrigger>
            <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team">
            <Card className="shadow-soft">
              <CardHeader>
                 <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-store" />
                    Equipo de Tienda
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-store text-store-foreground hover:bg-store/90">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Agregar Personal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      {/* ... (Contenido del Dialog de Agregar Personal) ... */}
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      className="pl-10" 
                      placeholder="Buscar por nombre, ID o posición..." 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all-roles">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos los roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-roles">Todos los roles</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="subgerente">Subgerente</SelectItem>
                        <SelectItem value="lider">Líder</SelectItem>
                        <SelectItem value="especialista">Especialista</SelectItem>
                        <SelectItem value="asociado">Asociado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all-status">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-status">Todos</SelectItem>
                        <SelectItem value="active">Activo</SelectItem>
                        <SelectItem value="training">En Capacitación</SelectItem>
                        <SelectItem value="inactive">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Posición</TableHead>
                        <TableHead>Rol</TableHead>
                        <TableHead>Departamento</TableHead>
                        <TableHead>Certificaciones</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {personnel.map((person) => (
                        <TableRow key={person.id}>
                          <TableCell className="font-mono text-xs">{person.id}</TableCell>
                          <TableCell className="font-medium">{person.name}</TableCell>
                          <TableCell>{person.position}</TableCell>
                          <TableCell>{getRoleBadge(person.role)}</TableCell>
                          <TableCell>{person.department}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {person.certifications.map((cert, index) => (
                                <Badge key={index} variant="outline" className="bg-store/5">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(person.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              
                              {/* --- BOTÓN DE EDITAR (SIN CAMBIOS) --- */}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="h-8"
                                  >
                                    <UserCog className="h-4 w-4 mr-1" /> Editar
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[625px]">
                                  {/* ... (Contenido del Dialog de Editar) ... */}
                                </DialogContent>
                              </Dialog>
                              
                              {/* --- MODIFICACIÓN: BOTÓN "CERTIFICAR" A "DELEGAR TAREA" --- */}
                              <Dialog 
                                open={openDialogId === person.id} 
                                onOpenChange={(open) => {
                                  if (open) {
                                    setOpenDialogId(person.id);
                                  } else {
                                    setOpenDialogId(null);
                                    setTaskDetails({ title: "", subtitle: "", priority: "medium" }); // Resetea al cerrar
                                  }
                                }}
                              >
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {/* El botón se envuelve en <span> para que el Tooltip funcione cuando está deshabilitado */}
                                    <span tabIndex={person.isHandheld ? undefined : 0}>
                                      <DialogTrigger asChild>
                                        <Button 
                                          size="sm" 
                                          className="h-8 bg-store text-store-foreground hover:bg-store/90"
                                          disabled={!person.isHandheld || isSubmitting} // Deshabilitado si no es de handheld
                                        >
                                          <Send className="h-4 w-4 mr-1" /> Delegar Tarea
                                        </Button>
                                      </DialogTrigger>
                                    </span>
                                  </TooltipTrigger>
                                  {!person.isHandheld && (
                                    <TooltipContent>
                                      <p>Solo se pueden delegar tareas a roles operativos (Handheld).</p>
                                    </TooltipContent>
                                  )}
                                </Tooltip>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Delegar Tarea a {person.name}</DialogTitle>
                                    <DialogDescription>
                                      La tarea se enviará a la cola del Handheld de este empleado.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="title" className="text-right">Título</Label>
                                      <Input
                                        id="title"
                                        name="title"
                                        value={taskDetails.title}
                                        onChange={handleTaskFormChange}
                                        className="col-span-3"
                                        placeholder="Ej: Resurtir Nike Air Max"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="subtitle" className="text-right">Detalles</Label>
                                      <Input
                                        id="subtitle"
                                        name="subtitle"
                                        value={taskDetails.subtitle}
                                        onChange={handleTaskFormChange}
                                        className="col-span-3"
                                        placeholder="Ej: 5 pzs, Zona A-03"
                                      />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="priority" className="text-right">Prioridad</Label>
                                      <div className="col-span-3">
                                        <Select 
                                          value={taskDetails.priority} 
                                          onValueChange={handleTaskPriorityChange}
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
                                  </div>
                                  <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setOpenDialogId(null)}>Cancelar</Button>
                                    <Button 
                                      type="submit" 
                                      disabled={isSubmitting}
                                      onClick={() => handleDelegateTask(person.name)} // Pasa el nombre
                                    >
                                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                      Enviar Tarea
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              
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
          
          <TabsContent value="certifications">
            {/* ... (Tu pestaña de Certificaciones no cambia) ... */}
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </Layout>
  );
};

export default StorePersonnel;