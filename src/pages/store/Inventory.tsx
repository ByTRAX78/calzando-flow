import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Package, 
  ClipboardList,
  Users,
  ShoppingBag,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  ArrowUpDown,
  Eye
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

const StoreInventory = () => {
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package, active: true },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  const inventorySummary = [
    { 
      title: "Total SKUs", 
      value: "1,245",
      icon: Package,
      color: "bg-store/10 text-store" 
    },
    { 
      title: "En Piso de Venta", 
      value: "842",
      icon: ShoppingBag,
      color: "bg-info/10 text-info" 
    },
    { 
      title: "En Bodega", 
      value: "403",
      icon: Package,
      color: "bg-secondary/10 text-secondary" 
    },
    { 
      title: "Pendientes de Ajuste", 
      value: "12",
      icon: AlertTriangle,
      color: "bg-warning/10 text-warning" 
    }
  ];

  const inventoryItems = [
    {
      sku: "SKU12345",
      name: "Zapato Casual Hombre",
      category: "Calzado Hombre",
      stock: {
        total: 45,
        floor: 28,
        warehouse: 17
      },
      status: "normal",
      reorderPoint: 15,
      lastUpdated: "Hoy, 10:45"
    },
    {
      sku: "SKU12346",
      name: "Zapato Deportivo Mujer",
      category: "Calzado Mujer",
      stock: {
        total: 32,
        floor: 20,
        warehouse: 12
      },
      status: "normal",
      reorderPoint: 10,
      lastUpdated: "Hoy, 11:30"
    },
    {
      sku: "SKU12349",
      name: "Bota Industrial",
      category: "Calzado Industrial",
      stock: {
        total: 8,
        floor: 3,
        warehouse: 5
      },
      status: "low",
      reorderPoint: 10,
      lastUpdated: "Ayer, 16:20"
    },
    {
      sku: "SKU12350",
      name: "Sandalia Infantil",
      category: "Calzado Infantil",
      stock: {
        total: 24,
        floor: 18,
        warehouse: 6
      },
      status: "normal",
      reorderPoint: 12,
      lastUpdated: "Hoy, 09:15"
    },
    {
      sku: "SKU12354",
      name: "Tenis Urbanos",
      category: "Calzado Unisex",
      stock: {
        total: 0,
        floor: 0,
        warehouse: 0
      },
      status: "out",
      reorderPoint: 8,
      lastUpdated: "Hace 3 días"
    },
    {
      sku: "SKU12355",
      name: "Zapatillas Elegantes Dama",
      category: "Calzado Mujer",
      stock: {
        total: 18,
        floor: 12,
        warehouse: 6
      },
      status: "normal",
      reorderPoint: 8,
      lastUpdated: "Hoy, 14:10"
    }
  ];

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-success text-success-foreground">Normal</Badge>;
      case "low":
        return <Badge className="bg-warning text-warning-foreground">Bajo</Badge>;
      case "out":
        return <Badge className="bg-destructive text-destructive-foreground">Agotado</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  return (
    <Layout 
      title="Gestión de Inventario"
      subtitle="Control y Visualización de Stock"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Gerente de Tienda"
    >
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {inventorySummary.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`rounded-lg p-3 ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Inventory Management */}
      <Card className="shadow-soft mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Package className="h-5 w-5 text-store" />
            Control de Inventario
          </CardTitle>
          <CardDescription>
            Visualización y gestión del inventario en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Buscar por SKU, nombre o categoría..." 
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="men">Calzado Hombre</SelectItem>
                  <SelectItem value="women">Calzado Mujer</SelectItem>
                  <SelectItem value="kids">Calzado Infantil</SelectItem>
                  <SelectItem value="industrial">Calzado Industrial</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Bajo</SelectItem>
                  <SelectItem value="out">Agotado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead className="text-center">Stock Total</TableHead>
                  <TableHead className="text-center">Piso</TableHead>
                  <TableHead className="text-center">Bodega</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-center">Punto de Reorden</TableHead>
                  <TableHead>Última Actualización</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-center font-semibold">{item.stock.total}</TableCell>
                    <TableCell className="text-center">{item.stock.floor}</TableCell>
                    <TableCell className="text-center">{item.stock.warehouse}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                    <TableCell className="text-center">{item.reorderPoint}</TableCell>
                    <TableCell className="text-sm">{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
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
              Mostrando 6 de 1,245 productos
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Anterior</Button>
              <Button variant="outline" size="sm">Siguiente</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              Aprobar Ajustes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              12 ajustes pendientes de aprobación por discrepancias en conteos
            </p>
            <Button className="w-full">Revisar y Aprobar</Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-store" />
              Configurar Puntos de Reorden
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Establecer mínimos de exhibición para disparar resurtidos
            </p>
            <Button className="w-full" variant="outline">Configurar</Button>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Gestión de Mermas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Registrar productos dañados, incompletos u obsoletos
            </p>
            <Button className="w-full" variant="outline">Registrar Merma</Button>
          </CardContent>
        </Card>
      </div>

    </Layout>
  );
};

export default StoreInventory;