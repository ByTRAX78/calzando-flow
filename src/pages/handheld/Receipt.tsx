// src/pages/handheld/Receipt.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Scan, CheckCircle, ArrowLeft, QrCode } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HandheldReceipt = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [scannedPallet, setScannedPallet] = React.useState<string | null>(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: Truck },
  ];

  const handleScan = () => {
    // Simula un escaneo
    setScannedPallet("PLT-1 (SSCC: 00123...45678)");
    setStep(2);
  };

  const handleConfirm = () => {
    // Lógica para marcar tarima como recibida [cite: 89]
    setScannedPallet(null);
    setStep(1);
    // Aquí iría una notificación de éxito
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
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-handheld" />
            Recibo de Embarque: SHIP-1234
          </CardTitle>
          <CardDescription>Cita programada: Hoy, 15:30</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Escanear Tarima/Caja [cite: 87]</p>
              <QrCode className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleScan}>
                <Scan className="mr-2 h-5 w-5" />
                Simular Escaneo
              </Button>
            </div>
          )}

          {step === 2 && scannedPallet && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              <p className="text-lg font-medium mb-2">Tarima Validada vs. ASN [cite: 88]</p>
              <Badge className="text-base mb-6">{scannedPallet}</Badge>
              
              <div className="text-left bg-muted/50 p-4 rounded-md mb-6">
                <p className="font-semibold mb-2">Contenido (Según ASN):</p>
                <ul className="list-disc list-inside text-sm">
                  <li>SKU12345 (Zapato Casual) - 12 pzs</li>
                  <li>SKU12346 (Deportivo Mujer) - 18 pzs</li>
                </ul>
              </div>

              <Button className="w-full" size="lg" onClick={handleConfirm}>
                Marcar como "Recibida" [cite: 89]
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldReceipt;