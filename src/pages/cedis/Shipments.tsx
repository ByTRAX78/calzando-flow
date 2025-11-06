import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  LayoutDashboard,
  Truck, 
  Package,
  CalendarClock,
  Search,
  Filter,
  QrCode,
  FileText,
  Warehouse,
  Plus,
  List,
  Send,
  CheckCircle
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CEDISShipments = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/cedis', icon: LayoutDashboard },
    { name: 'Embarques', href: '/cedis/shipments', icon: Truck, active: true },
    { name: 'Citas', href: '/cedis/appointments', icon: CalendarClock },
  ];

  const shipments = [
    {
      id: "SHIP-1234",
      store: "Tienda Polanco",
      items: 156,
      pallets: 4,
      scheduled: "Hoy, 15:30",
      status: "ready",
      createdAt: "06/11/2025, 09:15",
      driver: "Miguel Ángel Pérez",
      vehicle: "Ford Transit #FL-8732"
    },
    {
      id: "SHIP-1235",
      store: "Tienda Santa Fe",
      items: 203,
      pallets: 5,
      scheduled: "08/11/2025, 09:00",
      status: "preparing",
      createdAt: "06/11/2025, 10:30",
      driver: "Pendiente",
      vehicle: "Pendiente"
    },
    {
      id: "SHIP-1236",
      store: "Tienda Perisur",
      items: 98,
      pallets: 2,
      scheduled: "Hoy, 17:00",
      status: "ready",
      createdAt: "06/11/2025, 11:45",
      driver: "Carlos Mendoza",
      vehicle: "Mercedes Sprinter #CS-3421"
    },
    {
      id: "SHIP-1237",
      store: "Tienda Universidad",
      items: 112,
      pallets: 3,
      scheduled: "08/11/2025, 11:30",
      status: "pending",
      createdAt: "06/11/2025, 14:20",
      driver: "Pendiente",
      vehicle: "Pendiente"
    },
    {
      id: "SHIP-1238",
      store: "Tienda Lindavista",
      items: 175,
      pallets: 4,
      scheduled: "Hoy, 16:45",
      status: "ready",
      createdAt: "06/11/2025, 14:45",
      driver: "Ricardo Jiménez",
      vehicle: "Nissan NV350 #RJ-9087"
    }
  ];

  const completedShipments = [
    {
      id: "SHIP-1230",
      store: "Tienda Reforma",
      items: 142,
      pallets: 3,
      completedAt: "05/11/2025, 16:20",
      status: "delivered",
      driver: "Arturo Vega"
    },
    {
      id: "SHIP-1229",
      store: "Tienda Coyoacán",
      items: 87,
      pallets: 2,
      completedAt: "05/11/2025, 14:45",
      status: "delivered",
      driver: "Miguel Ángel Pérez"
    },
    {
      id: "SHIP-1228",
      store: "Tienda Polanco",
      items: 163,
      pallets: 4,
      completedAt: "05/11/2025, 13:10",
      status: "delivered",
      driver: "Carlos Mendoza"
    },
    {
      id: "SHIP-1226",
      store: "Tienda Santa Fe",
      items: 201,
      pallets: 5,
      completedAt: "05/11/2025, 11:30",
      status: "delivered",
      driver: "Ricardo Jiménez"
    },
  ];

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-success text-success-foreground">Listo</Badge>;
      case "preparing":
        return <Badge className="bg-warning text-warning-foreground">En Preparación</Badge>;
      case "pending":
        return <Badge className="bg-muted text-muted-foreground">Pendiente</Badge>;
      case "delivered":
        return <Badge className="bg-success text-success-foreground">Entregado</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  // Sample ASN content
  const asnContent = `
  {
    "asn": {
      "id": "ASN-7890",
      "shipmentId": "SHIP-1234",
      "store": "Tienda Polanco",
      "scheduled": "07/11/2025, 15:30",
      "createdAt": "06/11/2025, 09:15",
      "pallets": [
        {
          "id": "PLT-1",
          "sscc": "00123456789012345678",
          "items": [
            {"sku": "SKU12345", "name": "Zapato Casual Hombre", "qty": 12},
            {"sku": "SKU12346", "name": "Zapato Deportivo Mujer", "qty": 18},
            {"sku": "SKU12350", "name": "Sandalia Infantil", "qty": 15}
          ]
        },
        {
          "id": "PLT-2",
          "sscc": "00123456789012345679",
          "items": [
            {"sku": "SKU12355", "name": "Zapatillas Elegantes Dama", "qty": 24},
            {"sku": "SKU12360", "name": "Mocasines Hombre", "qty": 18}
          ]
        }
      ]
    }
  }
  `;

  return (
    <Layout 
      title="Gestión de Embarques"
      subtitle="Avisos de Embarque Anticipado (ASN)"
      moduleType="cedis"
      navigation={navigationItems}
      userName="Roberto Gómez"
      userRole="Gerente de CEDIS"
    >
      <Tabs defaultValue="active" className="mb-8">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="active">Embarques Activos</TabsTrigger>
          <TabsTrigger value="completed">Completados</TabsTrigger>
        </TabsList>
        
        {/* Active Shipments */}
        <TabsContent value="active">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Truck className="h-5 w-5 text-cedis" />
                  Embarques Pendientes
                </CardTitle>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">
                        <Plus className="h-4 w-4 mr-2" /> Crear Embarque
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                      <DialogHeader>
                        <DialogTitle>Crear Nuevo Embarque</DialogTitle>
                        <DialogDescription>
                          Generar un nuevo aviso de embarque anticipado (ASN) para una tienda
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-4">
                            <label className="text-sm font-medium mb-1 block">Tienda Destino</label>
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
                            <label className="text-sm font-medium mb-1 block">Fecha Programada</label>
                            <Input type="date" />
                          </div>
                          
                          <div className="col-span-2">
                            <label className="text-sm font-medium mb-1 block">Hora</label>
                            <Input type="time" />
                          </div>
                          
                          <div className="col-span-4 mt-2">
                            <label className="text-sm font-medium mb-1 block">Productos</label>
                            <div className="border rounded-md p-3 bg-muted/20">
                              <div className="text-sm text-center text-muted-foreground mb-2">
                                Selecciona productos para incluir en el embarque
                              </div>
                              <Button className="w-full">
                                <Plus className="h-4 w-4 mr-2" /> Agregar Productos
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancelar</Button>
                        <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">Crear Embarque</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por ID, tienda o estado..." 
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los estados</SelectItem>
                      <SelectItem value="ready">Listo</SelectItem>
                      <SelectItem value="preparing">En Preparación</SelectItem>
                      <SelectItem value="pending">Pendiente</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <TableHead className="text-center">Productos</TableHead>
                      <TableHead className="text-center">Tarimas</TableHead>
                      <TableHead>Programado</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Conductor</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono text-xs">{shipment.id}</TableCell>
                        <TableCell className="font-medium">{shipment.store}</TableCell>
                        <TableCell className="text-center">{shipment.items}</TableCell>
                        <TableCell className="text-center">{shipment.pallets}</TableCell>
                        <TableCell>{shipment.scheduled}</TableCell>
                        <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                        <TableCell>{shipment.driver}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-8">
                                  <QrCode className="h-4 w-4 mr-1" /> ASN
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[725px]">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2">
                                    <QrCode className="h-5 w-5" /> Aviso de Embarque Anticipado (ASN)
                                  </DialogTitle>
                                  <DialogDescription>
                                    Detalles del embarque {shipment.id} para {shipment.store}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-2">Información General</h4>
                                      <div className="bg-muted/30 p-3 rounded-md text-sm space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">ID Embarque:</span>
                                          <span className="font-medium">{shipment.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Tienda:</span>
                                          <span className="font-medium">{shipment.store}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Programado:</span>
                                          <span className="font-medium">{shipment.scheduled}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Creado:</span>
                                          <span className="font-medium">{shipment.createdAt}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Conductor:</span>
                                          <span className="font-medium">{shipment.driver}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Vehículo:</span>
                                          <span className="font-medium">{shipment.vehicle}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                      <h4 className="text-sm font-medium mb-2">Código QR de Embarque</h4>
                                      <div className="bg-white p-4 rounded-md flex-1 flex items-center justify-center">
                                        <div className="h-40 w-40 bg-muted flex items-center justify-center">
                                          <QrCode className="h-24 w-24 text-muted-foreground/50" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <h4 className="text-sm font-medium mt-2 mb-2">Estructura del Embarque</h4>
                                  <div className="bg-muted/20 rounded-md border p-3">
                                    <pre className="text-xs overflow-auto max-h-[200px]">{asnContent}</pre>
                                  </div>
                                  
                                  <div className="flex justify-between mt-2">
                                    <Button variant="outline" size="sm" className="gap-1">
                                      <FileText className="h-4 w-4" /> Descargar ASN
                                    </Button>
                                    <Button variant="outline" size="sm" className="gap-1">
                                      <List className="h-4 w-4" /> Etiquetas de Tarimas
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            
                            <Button 
                              size="sm" 
                              className={`h-8 ${shipment.status === 'ready' ? 'bg-cedis text-cedis-foreground hover:bg-cedis/90' : ''}`}
                              disabled={shipment.status !== 'ready'}
                            >
                              <Send className="h-4 w-4 mr-1" /> Enviar
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
                  Mostrando 5 de 15 embarques
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Completed Shipments */}
        <TabsContent value="completed">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Embarques Completados
              </CardTitle>
              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por ID, tienda o conductor..." 
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
                      <TableHead>Tienda</TableHead>
                      <TableHead className="text-center">Productos</TableHead>
                      <TableHead className="text-center">Tarimas</TableHead>
                      <TableHead>Completado</TableHead>
                      <TableHead>Conductor</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono text-xs">{shipment.id}</TableCell>
                        <TableCell className="font-medium">{shipment.store}</TableCell>
                        <TableCell className="text-center">{shipment.items}</TableCell>
                        <TableCell className="text-center">{shipment.pallets}</TableCell>
                        <TableCell>{shipment.completedAt}</TableCell>
                        <TableCell>{shipment.driver}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" className="h-8">
                            <FileText className="h-4 w-4 mr-1" /> Detalles
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
                  Mostrando 4 de 32 embarques completados
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Anterior</Button>
                  <Button variant="outline" size="sm">Siguiente</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default CEDISShipments;