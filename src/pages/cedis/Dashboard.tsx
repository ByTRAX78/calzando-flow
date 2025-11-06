import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Truck, 
  Package,
  CalendarClock,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  X,
  Users,
  List,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CEDISDashboard = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/cedis', icon: LayoutDashboard, active: true },
    { name: 'Embarques', href: '/cedis/shipments', icon: Truck },
    { name: 'Citas', href: '/cedis/appointments', icon: CalendarClock },
  ];

  const kpis = [
    { 
      title: "Entregas Completadas", 
      value: "24",
      change: "+3",
      period: "Hoy",
      icon: Truck,
      color: "text-success bg-success/10" 
    },
    { 
      title: "Tiempo Promedio", 
      value: "2.3h",
      change: "-0.5h",
      period: "Esta semana",
      icon: Clock,
      color: "text-cedis bg-cedis/10" 
    },
    { 
      title: "Precisión de Embarques", 
      value: "98.5%",
      change: "+0.7%",
      period: "Este mes",
      icon: CheckCircle,
      color: "text-info bg-info/10" 
    },
    { 
      title: "Pedidos Pendientes", 
      value: "15",
      change: "-4",
      period: "Vs. ayer",
      icon: Package,
      color: "text-warning bg-warning/10" 
    }
  ];

  const pendingShipments = [
    {
      id: "SHIP-1234",
      store: "Tienda Polanco",
      items: 156,
      pallets: 4,
      scheduled: "Hoy, 15:30",
      status: "ready"
    },
    {
      id: "SHIP-1235",
      store: "Tienda Santa Fe",
      items: 203,
      pallets: 5,
      scheduled: "Mañana, 09:00",
      status: "preparing"
    },
    {
      id: "SHIP-1236",
      store: "Tienda Perisur",
      items: 98,
      pallets: 2,
      scheduled: "Hoy, 17:00",
      status: "ready"
    },
    {
      id: "SHIP-1237",
      store: "Tienda Universidad",
      items: 112,
      pallets: 3,
      scheduled: "Mañana, 11:30",
      status: "pending"
    },
    {
      id: "SHIP-1238",
      store: "Tienda Lindavista",
      items: 175,
      pallets: 4,
      scheduled: "Hoy, 16:45",
      status: "ready"
    }
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
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  // Mock appointment requests that need approval
  const appointmentRequests = [
    {
      id: "REQ-5678",
      store: "Tienda Interlomas",
      date: "12/11/2025",
      time: "10:00 AM",
      items: 145,
      pallets: 3,
      urgent: false
    },
    {
      id: "REQ-5679",
      store: "Tienda Satélite",
      date: "12/11/2025",
      time: "02:30 PM",
      items: 86,
      pallets: 2,
      urgent: true
    }
  ];

  return (
    <Layout 
      title="CEDIS Dashboard"
      subtitle="Centro de Distribución"
      moduleType="cedis"
      navigation={navigationItems}
      userName="Roberto Gómez"
      userRole="Gerente de CEDIS"
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-lg p-3 ${kpi.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-sm font-medium text-success">
                    {kpi.change}
                    <span className="text-xs text-muted-foreground ml-1">
                      {kpi.period}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{kpi.title}</p>
                <p className="text-3xl font-bold">{kpi.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pending Shipments */}
        <Card className="shadow-soft md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5 text-cedis" />
              Embarques Pendientes
            </CardTitle>
            <CardDescription>
              Embarques programados para las próximas 24 horas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tienda</TableHead>
                    <TableHead className="text-center">Productos</TableHead>
                    <TableHead className="text-center">Tarimas</TableHead>
                    <TableHead>Programado</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingShipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-mono text-xs">{shipment.id}</TableCell>
                      <TableCell className="font-medium">{shipment.store}</TableCell>
                      <TableCell className="text-center">{shipment.items}</TableCell>
                      <TableCell className="text-center">{shipment.pallets}</TableCell>
                      <TableCell>{shipment.scheduled}</TableCell>
                      <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline">Detalles</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-center mt-4">
              <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">
                Ver Todos los Embarques
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Appointment Requests */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-cedis" />
              Solicitudes de Citas
            </CardTitle>
            <CardDescription>
              Pendientes de aprobación
            </CardDescription>
          </CardHeader>
          <CardContent>
            {appointmentRequests.map((req, index) => (
              <div key={req.id} className={`p-4 rounded-lg border ${req.urgent ? 'bg-warning/10 border-warning' : 'bg-background'} mb-3`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium flex items-center gap-2">
                      {req.store}
                      {req.urgent && <Badge className="bg-warning text-warning-foreground">Urgente</Badge>}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {req.date} • {req.time}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {req.items} productos • {req.pallets} tarimas
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                    <CheckCircle className="h-4 w-4 mr-1" /> Aprobar
                  </Button>
                  <Button size="sm" className="flex-1" variant="outline">
                    <Clock className="h-4 w-4 mr-1" /> Reprogramar
                  </Button>
                </div>
              </div>
            ))}
            <Button className="w-full mt-2" variant="outline">
              Ver Todas las Solicitudes
            </Button>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-cedis" />
              Estadísticas Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Eficiencia de Despacho</div>
                  <div className="text-sm font-medium">92%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-cedis rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Utilización de Espacio</div>
                  <div className="text-sm font-medium">78%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-cedis rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Cumplimiento de Programación</div>
                  <div className="text-sm font-medium">95%</div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-cedis rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div className="bg-cedis/5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium">Personal Activo</div>
                  <div className="text-sm font-medium">24 / 30</div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" /> 18 Operativos
                  </div>
                  <div className="flex items-center">
                    <List className="h-4 w-4 mr-1" /> 6 Supervisores
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CEDISDashboard;