import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Scan, CheckCircle, ArrowLeft, QrCode, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const HandheldReceipt = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = React.useState(1);
  const [scannedPallet, setScannedPallet] = React.useState<string | null>(null);
  const [boxCount, setBoxCount] = React.useState(0);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: Truck },
  ];

  const handleScan = () => {
    setStep(2);
    setTimeout(() => {
      setBoxCount(15);
      setScannedPallet("PLT-1 (SSCC: 00123...45678)");
      setStep(3);
      toast({
        title: "Conteo IA Completado",
        description: "Se detectaron 15 cajas en la tarima.",
      });
    }, 2500);
  };

  const handleConfirm = () => {
    setScannedPallet(null);
    setBoxCount(0);
    setStep(1);
    toast({
      title: "Recibo Confirmado",
      description: "Tarima SHIP-1234 marcada como 'Recibida'.",
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
          {step === 2 && (
            <>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-handheld" />
                Analizando Tarima con IA
              </CardTitle>
              <CardDescription>Simulando conteo automático de cajas...</CardDescription>
            </>
          )}
          {step === 3 && (
            <>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Conteo y Validación Completados
              </CardTitle>
              <CardDescription>Resultados del escaneo IA y validación ASN</CardDescription>
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

          {step === 2 && (
            <div className="text-center">
              <div className="relative w-full max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-handheld">
                <img src="/conteo-cajas.webp" alt="Conteo IA de cajas" className="w-full h-auto" />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-4">
                  <Loader2 className="h-12 w-12 animate-spin mb-4" />
                  <p className="text-xl font-semibold text-center">Contando cajas...</p>
                </div>
              </div>
            </div>
          )}

          {step === 3 && scannedPallet && (
            <div className="text-center">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">Conteo Automático IA</p>
                <p className="text-6xl font-bold text-success">{boxCount}</p>
                <p className="text-muted-foreground">Cajas Detectadas</p>
              </div>
              
              <p className="text-lg font-medium mb-2">Validación vs. ASN</p>
              <Badge className="text-base mb-6">{scannedPallet}</Badge>
              
              <div className="text-left bg-muted/50 p-4 rounded-md mb-6">
                <p className="font-semibold mb-2">Contenido (Según ASN):</p>
                <ul className="list-disc list-inside text-sm">
                  <li>SKU12345 (Zapato Casual) - 12 pzs</li>
                  <li>SKU12346 (Deportivo Mujer) - 18 pzs</li>
                </ul>
              </div>

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