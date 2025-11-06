// src/pages/handheld/Resupply.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpToLine, Scan, MapPin, CheckCircle, ArrowLeft, Package, Route, Loader2 } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"; // <-- AÑADIDO

// Definimos la interfaz de la Tarea (debe coincidir con la del Dashboard)
interface HandheldTask {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  priority: string;
  location?: string; // Añadimos una ubicación (simulada por ahora)
  product?: string;
  qty?: number;
}

const HandheldResupply = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <-- AÑADIDO
  const { toast } = useToast(); // <-- AÑADIDO

  // --- MODIFICACIÓN: Obtener tarea del estado de navegación ---
  const [task, setTask] = React.useState<HandheldTask | null>(
    location.state?.task ? 
    { // Simulamos más detalles basados en la tarea
      ...location.state.task,
      location: location.state.task.subtitle.split(' ')[0] || "A-03-N2", // Extraer de subtítulo
      product: location.state.task.title,
      qty: parseInt(location.state.task.subtitle.split(' ')[0]) || 3
    } 
    : null
  );
  
  // --- MODIFICACIÓN: Empezar en paso 1 o 2 ---
  const [step, setStep] = React.useState(location.state?.task ? 2 : 1);
  const [isCompleting, setIsCompleting] = React.useState(false); // <-- AÑADIDO

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: ArrowUpToLine },
  ];

  // Esta función ahora es para testing si no se recibe tarea
  const selectTask = () => {
    setTask({
      id: "TASK-MOCK-123",
      type: "resupply",
      title: "SKU12345 (Zapato Casual)",
      subtitle: "3 pzs",
      priority: "high",
      location: "A-03-N2",
      product: "SKU12345 (Zapato Casual)",
      qty: 3
    });
    setStep(2);
  };

  const handleScanLocation = () => {
    setStep(3);
  };
  
  const handleScanProduct = () => {
    setStep(4);
  };
  
  // --- MODIFICACIÓN: 'handleComplete' ahora llama al API DELETE ---
  const handleComplete = async () => {
    if (!task) return;

    setIsCompleting(true);
    try {
      const response = await fetch(`http://localhost:3000/api/tareas/${task.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('No se pudo completar la tarea en el servidor');
      }

      toast({
        title: "Tarea Completada",
        description: `${task.title} ha sido completada.`,
      });

      setTask(null);
      setStep(1);
      navigate('/handheld/dashboard'); // Volver al dashboard

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Layout 
      title="Resurtido Proactivo"
      subtitle="Módulo de Resurtido (TO-BE 2)"
      moduleType="handheld"
      navigation={navigationItems}
      userName="María González"
      userRole="Asociado Operativo"
    >
      <Button variant="ghost" onClick={() => navigate('/handheld/dashboard')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Dashboard
      </Button>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpToLine className="h-5 w-5 text-handheld" />
            Cola de Tareas de Resurtido
          </CardTitle>
          <CardDescription>
            {task ? `Tarea: ${task.title}` : 'Tareas generadas por ventas en POS'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">No hay tarea seleccionada</p>
              <Card className="text-left p-4 mb-6 hover:bg-muted/50 cursor-pointer" onClick={selectTask}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">SKU12345 (Tarea Mock)</p>
                    <p className="text-sm text-muted-foreground">Cantidad: 3 pzs</p>
                  </div>
                  <Package className="h-8 w-8 text-handheld" />
                </div>
              </Card>
              <Button className="w-full" variant="outline" onClick={() => navigate('/handheld/dashboard')}>
                Actualizar Tareas
              </Button>
            </div>
          )}

          {step === 2 && task && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{task.product}</p>
              <p className="text-lg font-medium mb-2">Instrucción de Resurtido:</p>
              <Badge variant="outline" className="mb-2 bg-success/10 text-success border-success/30">
                <Route className="h-3 w-3 mr-1" />
                Ruta Optimizada por IA
              </Badge>
              <div className="bg-handheld/10 text-handheld p-4 rounded-lg mb-6">
                <p className="text-sm">IR A:</p>
                <p className="text-4xl font-bold">{task.location}</p>
              </div>
              <p className="text-lg font-medium mb-4">Al llegar, escanear ubicación</p>
              <Button className="w-full" size="lg" onClick={handleScanLocation}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Ubicación ({task.location})
              </Button>
            </div>
          )}
          
          {step === 3 && task && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ubicación: {task.location}</p>
              <p className="text-lg font-medium mb-4">Escanear Producto y confirmar Cantidad ({task.qty} pzs)</p>
              <MapPin className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleScanProduct}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Producto ({task.product})
              </Button>
            </div>
          )}

          {step === 4 && task && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              <p className="text-lg font-medium mb-2">Resurtido Completo</p>
              <p className="text-muted-foreground mb-6">Inventario transferido de 'Bodega' a 'Piso de Venta'.</p>
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleComplete}
                disabled={isCompleting} // <-- AÑADIDO
              >
                {isCompleting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Siguiente Tarea'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldResupply;