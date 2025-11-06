// src/pages/handheld/Inventory.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileSearch, Scan, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HandheldInventory = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [discrepancy, setDiscrepancy] = React.useState(false);
  
  const systemCount = 50;
  const [physicalCount, setPhysicalCount] = React.useState(systemCount);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: FileSearch },
  ];
  
  const handleScanLocation = () => {
    setStep(2); // Simula escaneo de ubicación [cite: 113]
    setDiscrepancy(false);
    setPhysicalCount(systemCount);
  };

  const handleConfirm = (correct: boolean) => {
    if (correct) {
      // Si es SÍ, se cierra la tarea [cite: 116]
      setStep(1); 
      // Notificación de éxito
    } else {
      // Si es NO, pide conteo físico [cite: 117]
      setDiscrepancy(true);
      setPhysicalCount(48); // Simula conteo
    }
  };
  
  const submitDiscrepancy = () => {
    // Genera alerta para aprobación [cite: 118]
    setStep(1);
    setDiscrepancy(false);
    // Notificación de envío
  };

  return (
    <Layout 
      title="Control de Inventario"
      subtitle="Módulo de Conteo (Mod. TO-BE 3)"
      moduleType="handheld"
      navigation={navigationItems}
      userName="María González"
      userRole="Especialista de Inventario"
    >
      <Button variant="ghost" onClick={() => navigate('/handheld/dashboard')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al Dashboard
      </Button>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-handheld" />
            Conteo Confirmatorio [cite: 108]
          </CardTitle>
          <CardDescription>Tarea de conteo diario [cite: 111]</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Ir a: A-03-N2 [cite: 112]</p>
              <p className="text-muted-foreground mb-6">Al llegar, escanea la ubicación</p>
              <Button className="w-full" size="lg" onClick={handleScanLocation}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Ubicación (A-03-N2)
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ubicación: A-03-N2</p>
              <p className="text-lg font-medium mb-4">SKU 12345</p>
              <div className="bg-handheld/10 text-handheld p-4 rounded-lg mb-6">
                <p className="text-sm">Sistema:</p>
                <p className="text-4xl font-bold">{systemCount} pzs [cite: 114]</p>
              </div>

              {!discrepancy ? (
                <>
                  <p className="text-lg font-medium mb-4">¿El conteo es correcto? [cite: 115]</p>
                  <div className="flex gap-4">
                    <Button className="flex-1" size="lg" variant="destructive" onClick={() => handleConfirm(false)}>
                      <AlertTriangle className="mr-2 h-5 w-5" /> NO
                    </Button>
                    <Button className="flex-1" size="lg" variant="default" onClick={() => handleConfirm(true)}>
                      <CheckCircle className="mr-2 h-5 w-5" /> SÍ
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-left">
                  <label className="text-sm font-medium">Ingresar conteo físico: [cite: 117]</label>
                  <Input 
                    type="number" 
                    value={physicalCount} 
                    onChange={(e) => setPhysicalCount(Number(e.target.value))}
                    className="my-2 text-2xl h-12 text-center"
                  />
                  <div className="bg-warning/10 text-warning p-3 rounded-md text-sm mb-4">
                    <p>Discrepancia: {physicalCount - systemCount} pzs</p>
                  </div>
                  <Button className="w-full" size="lg" onClick={submitDiscrepancy}>
                    Enviar Alerta de Discrepancia [cite: 118]
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldInventory;