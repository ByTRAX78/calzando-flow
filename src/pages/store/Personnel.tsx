// src/pages/tienda/Personnel.tsx
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
  UserCheck,
  Mail,
  Phone,
  Calendar
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
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const StorePersonnel = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList },
    { name: 'Personal', href: '/tienda/personnel', icon: Users, active: true },
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
      status: "active"
    },
    {
      id: "EMP-1002",
      name: "María González",
      position: "Subgerente Comercial",
      role: "subgerente",
      department: "Ventas",
      certifications: ["Ventas", "Gestión"],
      startDate: "15/08/2022",
      status: "active"
    },
    {
      id: "EMP-1003",
      name: "Carlos Mendoza",
      position: "Subgerente de Operaciones",
      role: "subgerente",
      department: "Operaciones",
      certifications: ["Recibo", "Conteo", "Gestión"],
      startDate: "03/10/2022",
      status: "active"
    },
    {
      id: "EMP-1004",
      name: "José Ramírez",
      position: "Asociado Operativo",
      role: "asociado",
      department: "Operaciones",
      certifications: ["Recibo", "Resurtido"],
      startDate: "12/01/2023",
      status: "active"
    },
    {
      id: "EMP-1005",
      name: "Ana López",
      position: "Asociado de Ventas",
      role: "asociado",
      department: "Ventas",
      certifications: ["Ventas"],
      startDate: "20/03/2023",
      status: "active"
    },
    {
      id: "EMP-1006",
      name: "Luis Torres",
      position: "Especialista de Inventario",
      role: "especialista",
      department: "Operaciones",
      certifications: ["Recibo", "Conteo", "Resurtido"],
      startDate: "05/05/2023",
      status: "active"
    },
    {
      id: "EMP-1007",
      name: "Sofía Martínez",
      position: "Líder de Equipo",
      role: "lider",
      department: "Ventas",
      certifications: ["Ventas", "Gestión"],
      startDate: "14/08/2023",
      status: "active"
    },
    {
      id: "EMP-1008",
      name: "Roberto Hernández",
      position: "Asociado Operativo",
      role: "asociado",
      department: "Operaciones",
      certifications: ["Resurtido"],
      startDate: "22/11/2023",
      status: "training"
    }
  ];

  const certifications = [
    {
      id: "CERT-001",
      name: "Recibo",
      description: "Capacitación para recibir y validar mercancía entrante",
      area: "Operaciones",
      requiredFor: ["Gerente", "Subgerente", "Especialista", "Líder", "Asociado Operativo"],
      duration: "2 semanas"
    },
    {
      id: "CERT-002",
      name: "Conteo",
      description: "Capacitación para realizar conteos de inventario precisos",
      area: "Operaciones",
      requiredFor: ["Gerente", "Subgerente", "Especialista"],
      duration: "1 semana"
    },
    {
      id: "CERT-003",
      name: "Resurtido",
      description: "Capacitación para el resurtido eficiente de mercancía",
      area: "Operaciones",
      requiredFor: ["Especialista", "Líder", "Asociado Operativo"],
      duration: "1 semana"
    },
    {
      id: "CERT-004",
      name: "Ventas",
      description: "Capacitación en técnicas de ventas y atención al cliente",
      area: "Ventas",
      requiredFor: ["Gerente", "Subgerente", "Líder", "Asociado de Ventas"],
      duration: "2 semanas"
    },
    {
      id: "CERT-005",
      name: "Gestión",
      description: "Capacitación en gestión de personal y operaciones",
      area: "Administración",
      requiredFor: ["Gerente", "Subgerente", "Líder"],
      duration: "3 semanas"
    }
  ];

  // Function to get role badge color
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

  // Function to get status badge color
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

  return (
    <Layout 
      title="Gestión de Personal"
      subtitle="Administración de roles y certificaciones"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Gerente de Tienda"
    >
      <Tabs defaultValue="team" className="mb-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="team">Equipo</TabsTrigger>
          <TabsTrigger value="certifications">Certificaciones</TabsTrigger>
        </TabsList>
        
        {/* Team Tab */}
        <TabsContent value="team">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-store" />
                  Personal de la Tienda
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-store text-store-foreground hover:bg-store/90">
                      <UserPlus className="h-4 w-4 mr-2" /> Agregar Personal
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Agregar Nuevo Personal</DialogTitle>
                      <DialogDescription>
                        Registrar un nuevo miembro del equipo en el sistema
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Nombre Completo</label>
                          <Input placeholder="Nombre y apellido" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Posición</label>
                          <Input placeholder="Cargo o puesto" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Rol</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar rol..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gerente">Gerente</SelectItem>
                              <SelectItem value="subgerente">Subgerente</SelectItem>
                              <SelectItem value="lider">Líder</SelectItem>
                              <SelectItem value="especialista">Especialista</SelectItem>
                              <SelectItem value="asociado">Asociado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Departamento</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar departamento..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administracion">Administración</SelectItem>
                              <SelectItem value="ventas">Ventas</SelectItem>
                              <SelectItem value="operaciones">Operaciones</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Fecha de Inicio</label>
                          <Input type="date" />
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Certificaciones Iniciales</label>
                          <div className="border rounded-md p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="cert-recibo" />
                              <label htmlFor="cert-recibo" className="text-sm">Recibo</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="cert-conteo" />
                              <label htmlFor="cert-conteo" className="text-sm">Conteo</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="cert-resurtido" />
                              <label htmlFor="cert-resurtido" className="text-sm">Resurtido</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="cert-ventas" />
                              <label htmlFor="cert-ventas" className="text-sm">Ventas</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="cert-gestion" />
                              <label htmlFor="cert-gestion" className="text-sm">Gestión</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-store text-store-foreground hover:bg-store/90">Agregar</Button>
                    </div>
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
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los roles</SelectItem>
                      <SelectItem value="gerente">Gerente</SelectItem>
                      <SelectItem value="subgerente">Subgerente</SelectItem>
                      <SelectItem value="lider">Líder</SelectItem>
                      <SelectItem value="especialista">Especialista</SelectItem>
                      <SelectItem value="asociado">Asociado</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="administracion">Administración</SelectItem>
                      <SelectItem value="ventas">Ventas</SelectItem>
                      <SelectItem value="operaciones">Operaciones</SelectItem>
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
                                <DialogHeader>
                                  <DialogTitle>Editar Personal</DialogTitle>
                                  <DialogDescription>
                                    Actualizar información de {person.name}
                                  </DialogDescription>
                                </DialogHeader>
                                {/* Dialogue content similar to "Add Personnel" */}
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              size="sm" 
                              className="h-8 bg-store text-store-foreground hover:bg-store/90"
                            >
                              <Award className="h-4 w-4 mr-1" /> Certificar
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
                  Mostrando 8 de 8 empleados
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Certifications Tab */}
        <TabsContent value="certifications">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-store" />
                Gestión de Certificaciones
              </CardTitle>
              <CardDescription>
                Certificaciones disponibles para roles multifuncionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Certificación</TableHead>
                      <TableHead>Descripción</TableHead>
                      <TableHead>Área</TableHead>
                      <TableHead>Requerido Para</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certifications.map((cert) => (
                      <TableRow key={cert.id}>
                        <TableCell className="font-mono text-xs">{cert.id}</TableCell>
                        <TableCell className="font-medium">{cert.name}</TableCell>
                        <TableCell>{cert.description}</TableCell>
                        <TableCell>{cert.area}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {cert.requiredFor.map((role, index) => (
                              <Badge key={index} variant="outline" className="bg-store/5">
                                {role}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{cert.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-8"
                          >
                            <UserCheck className="h-4 w-4 mr-1" /> Ver Personal
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Add new certification button */}
              <div className="mt-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-store text-store-foreground hover:bg-store/90">
                      <Plus className="h-4 w-4 mr-2" /> Nueva Certificación
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Crear Nueva Certificación</DialogTitle>
                      <DialogDescription>
                        Agregar una nueva certificación al sistema de capacitación
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Nombre de la Certificación</label>
                          <Input placeholder="Nombre descriptivo" />
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Descripción</label>
                          <Input placeholder="Descripción de la certificación" />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Área</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar área..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administracion">Administración</SelectItem>
                              <SelectItem value="ventas">Ventas</SelectItem>
                              <SelectItem value="operaciones">Operaciones</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Duración</label>
                          <Input placeholder="Ej: 2 semanas" />
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Requerido Para</label>
                          <div className="border rounded-md p-3 space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="req-gerente" />
                              <label htmlFor="req-gerente" className="text-sm">Gerente</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="req-subgerente" />
                              <label htmlFor="req-subgerente" className="text-sm">Subgerente</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="req-lider" />
                              <label htmlFor="req-lider" className="text-sm">Líder</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="req-especialista" />
                              <label htmlFor="req-especialista" className="text-sm">Especialista</label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id="req-asociado" />
                              <label htmlFor="req-asociado" className="text-sm">Asociado</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-store text-store-foreground hover:bg-store/90">Crear</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Equipo Multifuncional
                </CardTitle>
                <CardDescription>
                  Personal con múltiples certificaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Personal con 3+ certificaciones</p>
                    <p className="text-xl font-bold">3 <span className="text-sm font-normal text-store">(37.5%)</span></p>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Certificación más común</p>
                    <p className="text-xl font-bold">Recibo <span className="text-sm font-normal text-store">(5 personas)</span></p>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-1">Certificación menos común</p>
                    <p className="text-xl font-bold">Gestión <span className="text-sm font-normal text-store">(3 personas)</span></p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Capacitaciones Pendientes
                </CardTitle>
                <CardDescription>
                  Certificaciones programadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start p-3 border rounded-lg">
                    <div className="mr-3">
                      <Calendar className="h-8 w-8 text-store" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Capacitación: Conteo</h4>
                      <p className="text-sm text-muted-foreground">Roberto Hernández</p>
                      <p className="text-xs text-muted-foreground mt-1">Inicia: 12/11/2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 border rounded-lg">
                    <div className="mr-3">
                      <Calendar className="h-8 w-8 text-store" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Capacitación: Resurtido</h4>
                      <p className="text-sm text-muted-foreground">Ana López</p>
                      <p className="text-xs text-muted-foreground mt-1">Inicia: 15/11/2025</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    Ver Todas las Capacitaciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default StorePersonnel;