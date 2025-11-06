// src/pages/tienda/Task.tsx
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
  Filter
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

const StoreTasks = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList, active: true },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  const pendingTasks = [
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
    {
      id: "TASK-1235",
      title: "Recibir Embarque SHIP-1234",
      type: "receipt",
      area: "Recepción",
      assigned: "Carlos Mendoza",
      priority: "high",
      status: "in-progress",
      created: "Hoy, 09:30",
      dueDate: "Hoy, 11:00"
    },
    {
      id: "TASK-1236",
      title: "Conteo de Inventario Zona A",
      type: "inventory",
      area: "Bodega",
      assigned: "María López",
      priority: "medium",
      status: "pending",
      created: "Hoy, 08:15",
      dueDate: "Hoy, 14:00"
    },
    {
      id: "TASK-1237",
      title: "Procesar Ajuste de Inventario",
      type: "inventory",
      area: "Administración",
      assigned: "Ana García",
      priority: "medium",
      status: "pending",
      created: "Ayer, 15:30",
      dueDate: "Hoy, 16:00"
    },
    {
      id: "TASK-1238",
      title: "Registrar Merma",
      type: "waste",
      area: "Bodega",
      assigned: "Luis Torres",
      priority: "low",
      status: "pending",
      created: "Ayer, 16:20",
      dueDate: "Hoy, 17:00"
    }
  ];

  const completedTasks = [
    {
      id: "TASK-1230",
      title: "Resurtir Zapatos Deportivos Mujer",
      type: "resupply",
      assignee: "José Ramírez",
      completedAt: "Hoy, 09:15"
    },
    {
      id: "TASK-1229",
      title: "Conteo de Inventario Zona B",
      type: "inventory",
      assignee: "María López",
      completedAt: "Ayer, 15:40"
    },
    {
      id: "TASK-1227",
      title: "Recibir Embarque SHIP-1232",
      type: "receipt",
      assignee: "Carlos Mendoza",
      completedAt: "Ayer, 11:20"
    }
  ];

  // Function to get priority badge color
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

  // Function to get status badge color
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
        
        {/* Pending Tasks Tab */}
        <TabsContent value="pending">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-store" />
                  Tareas Pendientes
                </CardTitle>
                <Button className="bg-store text-store-foreground hover:bg-store/90">
                  Asignar Nueva Tarea
                </Button>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por título, ID o asignado..." 
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los tipos</SelectItem>
                      <SelectItem value="resupply">Resurtido</SelectItem>
                      <SelectItem value="receipt">Recibo</SelectItem>
                      <SelectItem value="inventory">Inventario</SelectItem>
                      <SelectItem value="waste">Merma</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="low">Baja</SelectItem>
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

              {/* Pagination and Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 5 de 12 tareas
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Completed Tasks Tab */}
        <TabsContent value="completed">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Tareas Completadas
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por título, ID o asignado..." 
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="today">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="yesterday">Ayer</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mes</SelectItem>
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
                      <TableHead>Tarea</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Completada por</TableHead>
                      <TableHead>Fecha de Completado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="font-mono text-xs">{task.id}</TableCell>
                        <TableCell className="font-medium">{task.title}</TableCell>
                        <TableCell className="capitalize">{task.type}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>{task.completedAt}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                          >
                            <Clock className="h-4 w-4 mr-1" /> Detalles
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination and Actions */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 3 de 28 tareas completadas
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Task Calendar */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-store" />
                Calendario de Tareas
              </CardTitle>
              <CardDescription>
                Vista general de tareas programadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                    <div key={day} className="text-center font-medium text-sm py-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1 h-[400px]">
                  {/* Calendar days */}
                  {Array.from({ length: 7 }).map((_, index) => {
                    // Today is Wednesday (index 2)
                    const isToday = index === 2;
                    return (
                      <div 
                        key={index} 
                        className={`border rounded-md p-2 ${isToday ? 'bg-muted/30 border-primary' : ''}`}
                      >
                        <div className="text-right text-sm mb-2">
                          {/* Display date - mocked for this example */}
                          <span className={`${isToday ? 'font-bold text-primary' : ''}`}>
                            {`${index + 6}`}
                          </span>
                        </div>
                        
                        {/* Sample tasks */}
                        {index === 2 && (
                          <div className="bg-warning/10 text-warning rounded-md p-2 mb-1 text-xs">
                            <p className="font-medium truncate">Resurtir Zapatos</p>
                            <p className="truncate">José Ramírez</p>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="bg-store/10 text-store rounded-md p-2 mb-1 text-xs">
                            <p className="font-medium truncate">Recibir Embarque</p>
                            <p className="truncate">Carlos Mendoza</p>
                          </div>
                        )}
                        
                        {index === 3 && (
                          <div className="bg-secondary/10 text-secondary rounded-md p-2 text-xs">
                            <p className="font-medium truncate">Conteo Inventario</p>
                            <p className="truncate">María López</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StoreTasks;