import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  LayoutDashboard,
  Truck, 
  Package,
  CalendarClock,
  Calendar,
  CheckCircle,
  Clock,
  X,
  AlertTriangle,
  Plus,
  Search,
  Filter,
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

const CEDISAppointments = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/cedis', icon: LayoutDashboard },
    { name: 'Embarques', href: '/cedis/shipments', icon: Truck },
    { name: 'Citas', href: '/cedis/appointments', icon: CalendarClock, active: true },
  ];

  const pendingAppointments = [
    {
      id: "APT-4321",
      store: "Tienda Interlomas",
      requestedDate: "12/11/2025",
      requestedTime: "10:00 - 11:00",
      items: 145,
      pallets: 3,
      status: "pending",
      requestedBy: "Luis Torres",
      requestedAt: "05/11/2025, 14:30"
    },
    {
      id: "APT-4322",
      store: "Tienda Satélite",
      requestedDate: "12/11/2025",
      requestedTime: "14:00 - 15:00",
      items: 86,
      pallets: 2,
      status: "urgent",
      requestedBy: "María González",
      requestedAt: "05/11/2025, 16:45"
    },
    {
      id: "APT-4323",
      store: "Tienda Polanco",
      requestedDate: "13/11/2025",
      requestedTime: "09:30 - 10:30",
      items: 120,
      pallets: 3,
      status: "pending",
      requestedBy: "Juan Pérez",
      requestedAt: "06/11/2025, 08:15"
    },
    {
      id: "APT-4324",
      store: "Tienda Universidad",
      requestedDate: "13/11/2025",
      requestedTime: "13:00 - 14:00",
      items: 75,
      pallets: 2,
      status: "pending",
      requestedBy: "Ana López",
      requestedAt: "06/11/2025, 09:45"
    }
  ];

  const confirmedAppointments = [
    {
      id: "APT-4312",
      store: "Tienda Reforma",
      date: "07/11/2025",
      time: "14:00 - 15:00",
      items: 130,
      pallets: 3,
      status: "confirmed",
      shipmentId: "SHIP-1240",
      driver: "Arturo Vega",
      vehicle: "Ford Transit #AV-4578"
    },
    {
      id: "APT-4315",
      store: "Tienda Coyoacán",
      date: "07/11/2025",
      time: "16:30 - 17:30",
      items: 95,
      pallets: 2,
      status: "confirmed",
      shipmentId: "SHIP-1241",
      driver: "Miguel Ángel Pérez",
      vehicle: "Nissan NV350 #MP-2341"
    },
    {
      id: "APT-4318",
      store: "Tienda Perisur",
      date: "08/11/2025",
      time: "09:00 - 10:00",
      items: 165,
      pallets: 4,
      status: "confirmed",
      shipmentId: "SHIP-1242",
      driver: "Pendiente",
      vehicle: "Pendiente"
    }
  ];

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success text-success-foreground">Confirmada</Badge>;
      case "pending":
        return <Badge className="bg-muted text-muted-foreground">Pendiente</Badge>;
      case "urgent":
        return <Badge className="bg-warning text-warning-foreground">Urgente</Badge>;
      case "rejected":
        return <Badge className="bg-destructive text-destructive-foreground">Rechazada</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <Layout 
      title="Gestión de Citas"
      subtitle="Programación de Entregas"
      moduleType="cedis"
      navigation={navigationItems}
      userName="Roberto Gómez"
      userRole="Gerente de CEDIS"
    >
      <Tabs defaultValue="pending" className="mb-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="pending">Solicitudes Pendientes</TabsTrigger>
          <TabsTrigger value="confirmed">Citas Confirmadas</TabsTrigger>
        </TabsList>
        
        {/* Pending Appointments */}
        <TabsContent value="pending">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-cedis" />
                  Solicitudes de Citas Pendientes
                </CardTitle>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por ID, tienda o solicitante..." 
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="urgent">Urgente</SelectItem>
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
                      <TableHead>Tienda</TableHead>
                      <TableHead>Fecha Solicitada</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead className="text-center">Productos</TableHead>
                      <TableHead className="text-center">Tarimas</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-mono text-xs">{appointment.id}</TableCell>
                        <TableCell className="font-medium">{appointment.store}</TableCell>
                        <TableCell>{appointment.requestedDate}</TableCell>
                        <TableCell>{appointment.requestedTime}</TableCell>
                        <TableCell className="text-center">{appointment.items}</TableCell>
                        <TableCell className="text-center">{appointment.pallets}</TableCell>
                        <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              className="h-8 bg-success hover:bg-success/90 text-success-foreground"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              className="h-8"
                            >
                              <Clock className="h-4 w-4 mr-1" /> Reprogramar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 4 de 4 solicitudes pendientes
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium flex items-center">
                    <AlertTriangle className="h-4 w-4 text-warning mr-1" /> 1 solicitud urgente
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Confirmed Appointments */}
        <TabsContent value="confirmed">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-cedis" />
                  Citas Confirmadas
                </CardTitle>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">
                      <Plus className="h-4 w-4 mr-2" /> Nueva Cita
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Programar Nueva Cita</DialogTitle>
                      <DialogDescription>
                        Crear una cita de entrega directamente sin solicitud previa
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-4">
                          <label className="text-sm font-medium mb-1 block">Tienda</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar tienda..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="polanco">Tienda Polanco</SelectItem>
                              <SelectItem value="santafe">Tienda Santa Fe</SelectItem>
                              <SelectItem value="perisur">Tienda Perisur</SelectItem>
                              <SelectItem value="universidad">Tienda Universidad</SelectItem>
                              <SelectItem value="lindavista">Tienda Lindavista</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Fecha</label>
                          <Input type="date" />
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-sm font-medium mb-1 block">Hora</label>
                          <Input type="time" />
                        </div>
                        
                        <div className="col-span-4">
                          <label className="text-sm font-medium mb-1 block">Embarque Asociado</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar embarque..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ship1234">SHIP-1234 (Tienda Polanco)</SelectItem>
                              <SelectItem value="ship1235">SHIP-1235 (Tienda Santa Fe)</SelectItem>
                              <SelectItem value="ship1236">SHIP-1236 (Tienda Perisur)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-4">
                          <label className="text-sm font-medium mb-1 block">Conductor</label>
                          <Input placeholder="Nombre del conductor" />
                        </div>
                        
                        <div className="col-span-4">
                          <label className="text-sm font-medium mb-1 block">Vehículo</label>
                          <Input placeholder="Modelo y placa del vehículo" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">Programar Cita</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por ID, tienda o embarque..." 
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="week">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoy</SelectItem>
                      <SelectItem value="tomorrow">Mañana</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="nextweek">Próxima semana</SelectItem>
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
                      <TableHead>Tienda</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Hora</TableHead>
                      <TableHead className="text-center">Productos</TableHead>
                      <TableHead className="text-center">Tarimas</TableHead>
                      <TableHead>Embarque</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {confirmedAppointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell className="font-mono text-xs">{appointment.id}</TableCell>
                        <TableCell className="font-medium">{appointment.store}</TableCell>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell className="text-center">{appointment.items}</TableCell>
                        <TableCell className="text-center">{appointment.pallets}</TableCell>
                        <TableCell className="font-mono text-xs">{appointment.shipmentId}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8"
                            >
                              <Calendar className="h-4 w-4 mr-1" /> Detalles
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Mostrando 3 de 8 citas confirmadas
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Weekly Calendar View */}
          <Card className="shadow-soft mt-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-cedis" />
                Vista de Calendario
              </CardTitle>
              <CardDescription>
                Programación semanal de citas para entregas
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
                        
                        {/* Sample appointments */}
                        {index === 1 && (
                          <div className="bg-cedis/10 text-cedis rounded-md p-2 mb-1 text-xs">
                            <p className="font-medium truncate">T. Reforma (14:00)</p>
                            <p className="truncate">3 tarimas</p>
                          </div>
                        )}
                        
                        {index === 1 && (
                          <div className="bg-cedis/10 text-cedis rounded-md p-2 mb-1 text-xs">
                            <p className="font-medium truncate">T. Coyoacán (16:30)</p>
                            <p className="truncate">2 tarimas</p>
                          </div>
                        )}
                        
                        {index === 2 && (
                          <div className="bg-success/10 text-success rounded-md p-2 text-xs">
                            <p className="font-medium truncate">T. Perisur (09:00)</p>
                            <p className="truncate">4 tarimas</p>
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

export default CEDISAppointments;