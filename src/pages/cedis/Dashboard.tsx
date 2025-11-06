// src/pages/cedis/Dashboard.tsx
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AIInventoryService from "@/services/AIInventoryService";
import { getExamplePrediction } from '@/api/cedisApi';

// --- LÍNEA PROBLEMÁTICA ELIMINADA ---
// const predictions = await getExamplePrediction(); // <--- SE FUE

import { 
  LayoutDashboard,
  Truck, 
  Package,
  CalendarClock,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Brain,
  Sparkles,
  Activity,
  ArrowUp,
  ArrowDown,
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
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CEDISDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [aiPrediction, setAiPrediction] = useState(null);
  const [productAnalysis, setProductAnalysis] = useState([]);
  const [alerts, setAlerts] = useState([]);
  
  // --- AÑADIR NUEVO ESTADO PARA GUARDAR LA PREDICCIÓN DE IBM ---
  const [ibmPrediction, setIbmPrediction] = useState(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/cedis', icon: LayoutDashboard, active: true },
    { name: 'Embarques', href: '/cedis/shipments', icon: Truck },
    { name: 'Citas', href: '/cedis/appointments', icon: CalendarClock },
  ];

  useEffect(() => {
    loadAIPredictions();
    loadAlerts();
  }, []);

  const loadAIPredictions = async () => {
    setLoading(true);
    try {
      // --- MOVER LA LLAMADA A API AQUÍ ---
      const predictions = await getExamplePrediction();
      setIbmPrediction(predictions); // <-- Guardar en el estado
      console.log(predictions[0].values[0][0]);
      
      await AIInventoryService.initializeModel();
      const prediction = await AIInventoryService.predictNextMonth();
      setAiPrediction(prediction);
      
      const analyses = await Promise.all(
        ['NIKE-001', 'ADID-002', 'PUMA-003', 'VANS-004', 'CONV-005']
          .map(id => AIInventoryService.analyzeProduct(id))
      );
      setProductAnalysis(analyses.filter(Boolean));
    } catch (error) {
      console.error('Error loading AI predictions:', error);
    }
    setLoading(false);
  };

  const loadAlerts = async () => {
    const aiAlerts = await AIInventoryService.getInventoryAlerts();
    setAlerts(aiAlerts);
  };

  const kpis = [
    { 
      title: "Pronóstico Ventas (30d)", 
      value: aiPrediction ? `$${(aiPrediction.salesForecast / 1000).toFixed(0)}k` : "...",
      change: "+12%",
      period: "vs mes anterior",
      icon: TrendingUp,
      color: "text-success bg-success/10",
      aiPowered: true
    },
    { 
      title: "Inventario Óptimo", 
      value: aiPrediction ? `${(aiPrediction.inventoryNeeded / 1000).toFixed(0)}k u.` : "...",
      change: "IA optimizado",
      period: "Basado en demanda",
      icon: Package,
      color: "text-cedis bg-cedis/10",
      aiPowered: true
    },
    { 
      title: "Punto de Reorden",
      // --- ACTUALIZAR ESTA LÍNEA PARA LEER DEL ESTADO ---
      value: ibmPrediction ? `${ibmPrediction[0].values[0][0]} u.` : "...",
      change: "Automático",
      period: "Lead time: 5 días",
      icon: Activity,
      color: "text-info bg-info/10",
      aiPowered: true
    },
    { 
      title: "Confianza del Modelo", 
      value: aiPrediction ? `${(aiPrediction.confidence * 100).toFixed(1)}%` : "...",
      change: aiPrediction?.riskLevel === 'high' ? "Riesgo alto" : "Estable",
      period: "Precisión IA",
      icon: Brain,
      color: "text-warning bg-warning/10",
      aiPowered: true
    }
  ];

  // ... (El resto del componente sigue igual) ...
  
  const salesData = [
    { month: 'Ene', real: 145000, prediccion: null },
    { month: 'Feb', real: 128000, prediccion: null },
    { month: 'Mar', real: 155000, prediccion: null },
    { month: 'Abr', real: 148000, prediccion: null },
    { month: 'May', real: 162000, prediccion: null },
    { month: 'Jun', real: 175000, prediccion: null },
    { month: 'Jul', real: 168000, prediccion: null },
    { month: 'Ago', real: 182000, prediccion: null },
    { month: 'Sep', real: 158000, prediccion: null },
    { month: 'Oct', real: 166000, prediccion: 180000 },
    { month: 'Nov', real: null, prediccion: 195000 },
    { month: 'Dic', real: null, prediccion: 225000 }
  ];

  const pendingShipments = [
    {
      id: "SHIP-1234",
      store: "Tienda Polanco",
      items: 156,
      pallets: 4,
      scheduled: "Hoy, 15:30",
      status: "ready",
      driver: "Miguel Ángel Pérez",
      optimized: true
    },
    {
      id: "SHIP-1235",
      store: "Tienda Santa Fe",
      items: 203,
      pallets: 5,
      scheduled: "Mañana, 09:00",
      status: "preparing",
      driver: "Pendiente",
      optimized: false
    },
    {
      id: "SHIP-1236",
      store: "Tienda Perisur",
      items: 98,
      pallets: 2,
      scheduled: "Hoy, 17:00",
      status: "ready",
      driver: "Carlos Mendoza",
      optimized: true
    }
  ];

  const getStatusBadge = (status) => {
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

  const getRiskBadge = (risk) => {
    switch (risk) {
      case "Alto":
        return <Badge className="bg-destructive text-destructive-foreground">Riesgo Alto</Badge>;
      case "Medio":
        return <Badge className="bg-warning text-warning-foreground">Riesgo Medio</Badge>;
      case "Bajo":
        return <Badge className="bg-success text-success-foreground">Riesgo Bajo</Badge>;
      default:
        return <Badge>Sin evaluar</Badge>;
    }
  };

  return (
    <Layout 
      title="CEDIS Dashboard Inteligente"
      subtitle="Centro de Distribución con IA Predictiva"
      moduleType="cedis"
      navigation={navigationItems}
      userName="Roberto Gómez"
      userRole="Gerente de CEDIS"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="shadow-soft relative overflow-hidden">
              {kpi.aiPowered && (
                <div className="absolute top-2 right-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {kpi.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${kpi.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    kpi.value
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {kpi.change.includes('+') ? (
                    <ArrowUp className="h-3 w-3 text-success" />
                  ) : kpi.change.includes('-') ? (
                    <ArrowDown className="h-3 w-3 text-destructive" />
                  ) : null}
                  <span className="text-xs text-muted-foreground">
                    {kpi.change} • {kpi.period}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {alerts.length > 0 && (
        <div className="space-y-3 mb-8">
          {alerts.map((alert, index) => (
            <Alert key={index} className={
              alert.type === 'critical' ? 'border-destructive' :
              alert.type === 'warning' ? 'border-warning' : ''
            }>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <span className="font-semibold">{alert.title}:</span> {alert.message}
                </div>
                {alert.action && (
                  <Button size="sm" variant="outline">{alert.action}</Button>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Brain className="h-5 w-5 text-cedis" />
              Predicción de Ventas con IA
            </CardTitle>
            <CardDescription>
              Modelo entrenado con datos 2023-2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="real" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  name="Ventas Reales"
                />
                <Line 
                  type="monotone" 
                  dataKey="prediccion" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Predicción IA"
                />
              </LineChart>
            </ResponsiveContainer>
            {aiPrediction && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-semibold mb-2">Recomendaciones IA:</p>
                <ul className="space-y-1">
                  {aiPrediction.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-cedis" />
              Análisis Predictivo de Productos
            </CardTitle>
            <CardDescription>
              Top 5 productos monitoreados por IA
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productAnalysis.map((product, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{product.productName}</span>
                    {getRiskBadge(product.stockoutRisk)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Stock actual:</span>
                      <span className="ml-1 font-semibold">{product.currentStock}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Óptimo:</span>
                      <span className="ml-1 font-semibold text-success">{product.optimalStock}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reorden:</span>
                      <span className="ml-1 font-semibold text-warning">{product.reorderPoint}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lead:</span>
                      <span className="ml-1 font-semibold">{product.leadTime}d</span>
                    </div>
                  </div>
                  <Progress 
                    value={(product.currentStock / product.optimalStock) * 100} 
                    className="mt-2 h-2"
                  />
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-cedis text-cedis-foreground hover:bg-cedis/90">
              <Brain className="h-4 w-4 mr-2" />
              Generar Órdenes Automáticas con IA
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Truck className="h-5 w-5 text-cedis" />
              Embarques Pendientes con Optimización IA
            </CardTitle>
            <Button className="bg-cedis text-cedis-foreground hover:bg-cedis/90">
              <Sparkles className="h-4 w-4 mr-2" />
              Optimizar Rutas
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tienda</TableHead>
                  <TableHead>Artículos</TableHead>
                  <TableHead>Tarimas</TableHead>
                  <TableHead>Programado</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>IA</TableHead>
                  <TableHead>Acciones</TableHead>
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
                    <TableCell>
                      {shipment.optimized && (
                        <Badge className="bg-green-100 text-green-800">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Optimizado
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">Detalles</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CEDISDashboard;