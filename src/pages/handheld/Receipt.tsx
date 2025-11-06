// src/pages/handheld/Receipt.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// --- AÑADIDOS Input y Label ---
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Truck, Scan, CheckCircle, ArrowLeft, QrCode } from "lucide-react"; // <-- Loader2 eliminado
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const HandheldReceipt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = React.useState(1);
  const [scannedPallet, setScannedPallet] = React.useState<string | null>(null);
  
  // --- MODIFICADO: boxCount ahora se controla manualmente ---
  const [boxCount, setBoxCount] = React.useState<number | string>(""); // Empezar vacío

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: Truck },
  ];

  // --- MODIFICADO: Flujo de escaneo simplificado ---
  const handleScan = () => {
    // Simula el escaneo de la tarima
    setScannedPallet("PLT-1 (SSCC: 00123...45678)");
    setBoxCount(""); // Resetea el conteo para ingreso manual
    setStep(3); // Salta directamente al paso de validación/conteo
    toast({
      title: "Tarima Escaneada",
      description: "Por favor, ingrese el conteo manual de cajas.",
    });
  };

  // --- MODIFICADO: 'handleConfirm' ahora valida el conteo manual ---
  const handleConfirm = () => {
    if (!scannedPallet || !boxCount || Number(boxCount) <= 0) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un número de cajas válido.",
        variant: "destructive",
      });
      return;
    }

    const palletId = scannedPallet; // Guardar antes de resetear
    setScannedPallet(null);
    setBoxCount("");
    setStep(1);
    toast({
      title: "Recibo Confirmado",
      description: `Tarima ${palletId} marcada como 'Recibida' con ${boxCount} cajas.`,
    });
  };

  return (
    <Layout 
      title="Recibo Planificado"
      subtitle="Módulo de Recibo (TO-BE 1)"
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
          {step === 1 && (
            <>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-handheld" />
                Recibo de Embarque: SHIP-1234
              </CardTitle>
              <CardDescription>Cita programada: Hoy, 15:30</CardDescription>
            </>
          )}
          {/* --- MODIFICADO: Título del Paso 3 --- */}
          {step === 3 && (
            <>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Validación Manual de Recibo
              </CardTitle>
              <CardDescription>Confirme el conteo de cajas para la tarima escaneada.</CardDescription>
            </>
          )}
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Escanear Tarima/Caja</p>
              <QrCode className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleScan}>
                <Scan className="mr-2 h-5 w-5" />
                Simular Escaneo
              </Button>
            </div>
          )}

          {/* --- ELIMINADO: 'step === 2' (Simulación de IA) ya no existe --- */}
          
          {/* --- MODIFICADO: 'step === 3' ahora incluye el input manual --- */}
          {step === 3 && scannedPallet && (
            <div className="text-left">
              
              <p className="text-lg font-medium mb-2 text-center">Validación vs. ASN</p>
              <Badge className="text-base mb-4 w-full flex justify-center">{scannedPallet}</Badge>
              
              <div className="text-left bg-muted/50 p-4 rounded-md mb-6">
                <p className="font-semibold mb-2">Contenido (Según ASN):</p>
                <ul className="list-disc list-inside text-sm">
                  <li>SKU12345 (Zapato Casual) - 12 pzs</li>
                  <li>SKU12346 (Deportivo Mujer) - 18 pzs</li>
                </ul>
              </div>

              {/* --- NUEVO CAMPO MANUAL --- */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="boxCount" className="text-base font-medium">
                  Conteo Manual de Cajas
                </Label>
                <Input
                  id="boxCount"
                  type="number"
                  value={boxCount}
                  onChange={(e) => setBoxCount(e.target.value)}
                  placeholder="Ingrese el total de cajas"
                  className="text-center text-2xl h-14"
                  min="1"
                />
              </div>
              {/* --- FIN NUEVO CAMPO --- */}

              <Button className="w-full" size="lg" onClick={handleConfirm}>
                Marcar como "Recibida"
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldReceipt;