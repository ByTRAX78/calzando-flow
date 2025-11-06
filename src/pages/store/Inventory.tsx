import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AIInventoryService from "@/services/AIInventoryService";
import { 
  LayoutDashboard,
  Package, 
  ClipboardList,
  Users,
  ShoppingBag,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  CheckCircle,
  X,
  Plus,
  Brain,
  Sparkles,
  Eye,
  Edit,
  Trash2
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
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const StoreInventory = () => {
  const [loading, setLoading] = useState(false);
  const [productAnalyses, setProductAnalyses] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAdjustmentDialog, setShowAdjustmentDialog] = useState(false);
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("");
  
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package, active: true },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag },
  ];

  const inventory = [
    {
      sku: "NIKE-001",
      name: "Nike Air Max 90",
      category: "Deportivo",
      currentStock: 245,
      minDisplay: 10,
      maxDisplay: 30,
      backStock: 215,
      price: 2499,
      cost: 1250,
      status: "optimal",
      lastMovement: "Hace 2 horas",
      trend: "up",
      rotation: 8.5,
      aiRecommendation: "Stock óptimo - Mantener niveles"
    },
    {
      sku: "ADID-002",
      name: "Adidas Ultra Boost",
      category: "Running",
      currentStock: 32,
      minDisplay: 8,
      maxDisplay: 25,
      backStock: 7,
      price: 3299,
      cost: 1650,
      status: "low",
      lastMovement: "Hace 5 horas",
      trend: "down",
      rotation: 5.2,
      aiRecommendation: "⚠️ Reorden urgente - Stock crítico"
    },
    {
      sku: "CONV-003",
      name: "Converse Chuck Taylor",
      category: "Casual",
      currentStock: 167,
      minDisplay: 12,
      maxDisplay: 35,
      backStock: 132,
      price: 1299,
      cost: 650,
      status: "optimal",
      lastMovement: "Hace 1 hora",
      trend: "stable",
      rotation: 12.3,
      aiRecommendation: "Alta rotación - Incrementar stock de seguridad"
    },
    {
      sku: "VANS-004",
      name: "Vans Old Skool",
      category: "Skate",
      currentStock: 28,
      minDisplay: 6,
      maxDisplay: 20,
      backStock: 8,
      price: 1599,
      cost: 800,
      status: "critical",
      lastMovement: "Hace 30 min",
      trend: "down",
      rotation: 3.8,
      aiRecommendation: "🚨 Stock crítico - Generar orden inmediata"
    },
    {
      sku: "PUMA-005",
      name: "Puma RS-X",
      category: "Deportivo",
      currentStock: 89,
      minDisplay: 8,
      maxDisplay: 25,
      backStock: 64,
      price: 1899,
      cost: 950,
      status: "optimal",
      lastMovement: "Hace 3 horas",
      trend: "up",
      rotation: 6.7,
      aiRecommendation: "Tendencia positiva - Preparar para temporada alta"
    },
    {
      sku: "TIMB-006",
      name: "Timberland 6-Inch Boot",
      category: "Botas",
      currentStock: 45,
      minDisplay: 4,
      maxDisplay: 15,
      backStock: 30,
      price: 3999,
      cost: 2000,
      status: "medium",
      lastMovement: "Hace 8 horas",
      trend: "stable",
      rotation: 2.1,
      aiRecommendation: "Baja rotación - Considerar promoción"
    }
  ];

  const pendingAdjustments = [
    {
      id: "ADJ-001",
      product: "Nike Air Max 90",
      type: "discrepancy",
      systemCount: 245,
      physicalCount: 243,
      difference: -2,
      requestedBy: "María López",
      date: "06/11/2025 14:30",
      status: "pending"
    },
    {
      id: "ADJ-002",
      product: "Vans Old Skool",
      type: "damage",
      systemCount: 28,
      physicalCount: 27,
      difference: -1,
      requestedBy: "Carlos Mendoza",
      date: "06/11/2025 15:45",
      status: "pending"
    },
    {
      id: "ADJ-003",
      product: "Adidas Ultra Boost",
      type: "return",
      systemCount: 32,
      physicalCount: 33,
      difference: 1,
      requestedBy: "Ana Rodríguez",
      date: "06/11/2025 16:20",
      status: "pending"
    }
  ];

  useEffect(() => {
    loadAIAnalysis();
  }, []);

  const loadAIAnalysis = async () => {
    setLoading(true);
    try {
      await AIInventoryService.initializeModel();
      const analyses = await Promise.all(
        inventory.slice(0, 5).map(item => 
          AIInventoryService.analyzeProduct(item.sku)
        )
      );
      setProductAnalyses(analyses.filter(Boolean));
    } catch (error) {
      console.error('Error loading AI analysis:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-success text-success-foreground">Óptimo</Badge>;
      case "low":
        return <Badge className="bg-warning text-warning-foreground">Bajo</Badge>;
      case "critical":
        return <Badge className="bg-destructive text-destructive-foreground">Crítico</Badge>;
      case "medium":
        return <Badge className="bg-info text-info-foreground">Medio</Badge>;
      default:
        return <Badge>Desconocido</Badge>;
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <span className="text-muted-foreground">→</span>;
  };

  const categoryData = [
    { name: 'Deportivo', value: 334, color: '#9333ea' },
    { name: 'Running', value: 32, color: '#3b82f6' },
    { name: 'Casual', value: 167, color: '#22c55e' },
    { name: 'Skate', value: 28, color: '#f59e0b' },
    { name: 'Botas', value: 45, color: '#ef4444' }
  ];

  const movementData = [
    { hour: '08:00', entradas: 45, salidas: 12 },
    { hour: '10:00', entradas: 0, salidas: 28 },
    { hour: '12:00', entradas: 120, salidas: 45 },
    { hour: '14:00', entradas: 0, salidas: 67 },
    { hour: '16:00', entradas: 80, salidas: 89 },
    { hour: '18:00', entradas: 0, salidas: 102 }
  ];

  const handleAdjustment = (adjustment, approved) => {
    console.log(`Ajuste ${adjustment.id} ${approved ? 'aprobado' : 'rechazado'}`);
  };

  const processAdjustment = () => {
    if (!selectedProduct || !adjustmentQuantity || !adjustmentReason) return;
    
    console.log('Procesando ajuste:', {
      product: selectedProduct.sku,
      quantity: adjustmentQuantity,
      reason: adjustmentReason
    });
    
    setShowAdjustmentDialog(false);
    setAdjustmentQuantity("");
    setAdjustmentReason("");
    setSelectedProduct(null);
  };

  return (
    <Layout 
      title="Control de Inventario"
      subtitle="Gestión y Análisis de Stock"
      moduleType="store"
      navigation={navigationItems}
      userName="María González"
      userRole="Subgerente Comercial"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-store" />
              Stock Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">606 unidades</div>
            <p className="text-xs text-muted-foreground mt-1">
              Valor: $987,450
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Productos Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">2</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requieren reorden urgente
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-info" />
              Rotación Promedio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.8x</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 30 días
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft relative overflow-hidden">
          <div className="absolute top-2 right-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
          </div>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-success" />
              Precisión IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Predicciones acertadas
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="mb-8">
        <TabsList className="grid grid-cols-4 w-full max-w-[600px]">
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="adjustments">Ajustes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai-insights">IA Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  Control de Stock
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-store text-store-foreground hover:bg-store/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Producto
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                        <DialogDescription>
                          Registrar un nuevo producto en el inventario
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">SKU</label>
                          <Input placeholder="Código único del producto" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Nombre</label>
                          <Input placeholder="Nombre del producto" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Precio</label>
                            <Input type="number" placeholder="0.00" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Costo</label>
                            <Input type="number" placeholder="0.00" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-1 block">Stock Inicial</label>
                            <Input type="number" placeholder="0" />
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-1 block">Categoría</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deportivo">Deportivo</SelectItem>
                                <SelectItem value="running">Running</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="botas">Botas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button className="w-full">Guardar Producto</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por SKU, nombre o categoría..." 
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="optimal">Óptimo</SelectItem>
                    <SelectItem value="low">Bajo</SelectItem>
                    <SelectItem value="critical">Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-center">Stock Total</TableHead>
                      <TableHead className="text-center">Exhibición</TableHead>
                      <TableHead className="text-center">Bodega</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Tendencia</TableHead>
                      <TableHead>IA</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow key={item.sku}>
                        <TableCell className="font-mono text-xs">{item.sku}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-center font-bold">{item.currentStock}</TableCell>
                        <TableCell className="text-center">
                          <div className="text-xs">
                            {item.maxDisplay - item.backStock}/{item.maxDisplay}
                            <Progress 
                              value={((item.maxDisplay - item.backStock) / item.maxDisplay) * 100} 
                              className="h-1 mt-1"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{item.backStock}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{getTrendIcon(item.trend)}</TableCell>
                        <TableCell>
                          {item.aiRecommendation.includes('⚠️') || item.aiRecommendation.includes('🚨') ? (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Acción
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Brain className="h-3 w-3 mr-1" />
                              OK
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedProduct(item);
                                setShowAdjustmentDialog(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="adjustments">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-warning" />
                Ajustes Pendientes de Aprobación
              </CardTitle>
              <CardDescription>
                {pendingAdjustments.length} ajustes requieren revisión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingAdjustments.map((adjustment) => (
                  <div key={adjustment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm">{adjustment.id}</span>
                          <Badge variant={adjustment.type === 'damage' ? 'destructive' : 'outline'}>
                            {adjustment.type === 'discrepancy' ? 'Discrepancia' :
                             adjustment.type === 'damage' ? 'Daño' : 'Devolución'}
                          </Badge>
                        </div>
                        <p className="font-medium">{adjustment.product}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Sistema: {adjustment.systemCount}</span>
                          <span>Físico: {adjustment.physicalCount}</span>
                          <span className={`font-bold ${adjustment.difference < 0 ? 'text-destructive' : 'text-success'}`}>
                            Diferencia: {adjustment.difference > 0 ? '+' : ''}{adjustment.difference}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Solicitado por {adjustment.requestedBy} • {adjustment.date}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAdjustment(adjustment, false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-success text-success-foreground hover:bg-success/90"
                          onClick={() => handleAdjustment(adjustment, true)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Distribución por Categoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={entry => `${entry.name}: ${entry.value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Movimientos del Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={movementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="entradas" stackId="1" stroke="#22c55e" fill="#22c55e" />
                    <Area type="monotone" dataKey="salidas" stackId="1" stroke="#ef4444" fill="#ef4444" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Análisis Predictivo con IA
              </CardTitle>
              <CardDescription>
                Recomendaciones basadas en patrones históricos y tendencias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productAnalyses.map((analysis, index) => (
                  <Alert key={index} className="border-l-4 border-l-purple-600">
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-semibold mb-2">{analysis.productName}</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Stock Actual:</span>
                          <span className="ml-2 font-medium">{analysis.currentStock}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Óptimo IA:</span>
                          <span className="ml-2 font-medium text-success">{analysis.optimalStock}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Demanda 30d:</span>
                          <span className="ml-2 font-medium">{analysis.demandForecast}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Riesgo:</span>
                          <span className={`ml-2 font-medium ${
                            analysis.stockoutRisk === 'Alto' ? 'text-destructive' :
                            analysis.stockoutRisk === 'Medio' ? 'text-warning' : 'text-success'
                          }`}>
                            {analysis.stockoutRisk}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Factor estacional: {(analysis.seasonalFactor * 100).toFixed(0)}%
                        </span>
                        <Button size="sm" variant="outline">
                          Generar Orden Automática
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAdjustmentDialog} onOpenChange={setShowAdjustmentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajuste de Inventario</DialogTitle>
            <DialogDescription>
              {selectedProduct ? `Ajustar stock de ${selectedProduct.name}` : ''}
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Stock Actual</label>
                <Input value={selectedProduct.currentStock} disabled />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Cantidad de Ajuste</label>
                <Input 
                  type="number" 
                  placeholder="Positivo para agregar, negativo para restar"
                  value={adjustmentQuantity}
                  onChange={(e) => setAdjustmentQuantity(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Motivo</label>
                <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discrepancy">Discrepancia en conteo</SelectItem>
                    <SelectItem value="damage">Producto dañado</SelectItem>
                    <SelectItem value="return">Devolución</SelectItem>
                    <SelectItem value="theft">Robo/Pérdida</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAdjustmentDialog(false)}>
                  Cancelar
                </Button>
                <Button onClick={processAdjustment}>
                  Procesar Ajuste
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StoreInventory;