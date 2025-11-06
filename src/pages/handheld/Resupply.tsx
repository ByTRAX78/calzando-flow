// src/pages/handheld/Resupply.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpToLine, Scan, MapPin, CheckCircle, ArrowLeft, Package } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HandheldResupply = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [task, setTask] = React.useState<{ location: string, product: string, qty: number } | null>(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: ArrowUpToLine },
  ];

  const selectTask = () => {
    setTask({
      location: "A-03-N2", // Ubicación de Bodega [cite: 104]
      product: "SKU12345 (Zapato Casual)",
      qty: 3 // Cantidad a resurtir [cite: 106]
    });
    setStep(2);
  };

  const handleScanLocation = () => {
    setStep(3); // Simula escaneo de ubicación [cite: 105]
  };
  
  const handleScanProduct = () => {
    setStep(4); // Simula escaneo de producto [cite: 106]
  };
  
  const handleComplete = () => {
    // Tarea completada, inventario transferido [cite: 107]
    setTask(null);
    setStep(1);
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
            Cola de Tareas de Resurtido [cite: 101]
          </CardTitle>
          <CardDescription>Tareas generadas por ventas en POS</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Selecciona una tarea prioritaria [cite: 103]</p>
              {/* Aquí iría la lista de tareas, simulamos una */}
              <Card className="text-left p-4 mb-6 hover:bg-muted/50 cursor-pointer" onClick={selectTask}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">SKU12345 (Zapato Casual)</p>
                    <p className="text-sm text-muted-foreground">Cantidad: 3 pzs</p>
                  </div>
                  <Package className="h-8 w-8 text-handheld" />
                </div>
              </Card>
              <Button className="w-full" variant="outline">Actualizar Tareas</Button>
            </div>
          )}

          {step === 2 && task && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{task.product}</p>
              <p className="text-lg font-medium mb-2">Instrucción de Resurtido:</p>
              <div className="bg-handheld/10 text-handheld p-4 rounded-lg mb-6">
                <p className="text-sm">IR A:</p>
                <p className="text-4xl font-bold">{task.location} [cite: 104]</p>
              </div>
              <p className="text-lg font-medium mb-4">Al llegar, escanear ubicación [cite: 105]</p>
              <Button className="w-full" size="lg" onClick={handleScanLocation}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Ubicación ({task.location})
              </Button>
            </div>
          )}
          
          {step === 3 && task && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ubicación: {task.location}</p>
              <p className="text-lg font-medium mb-4">Escanear Producto y confirmar Cantidad (3 pzs) [cite: 106]</p>
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
              <p className="text-lg font-medium mb-2">Resurtido Completo [cite: 107]</p>
              <p className="text-muted-foreground mb-6">Inventario transferido de 'Bodega' a 'Piso de Venta'.</p>
              <Button className="w-full" size="lg" onClick={handleComplete}>
                Siguiente Tarea
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldResupply;