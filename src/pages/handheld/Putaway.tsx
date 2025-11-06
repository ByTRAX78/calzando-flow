// src/pages/handheld/Putaway.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Scan, MapPin, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HandheldPutaway = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [product, setProduct] = React.useState<string | null>(null);
  const [location, setLocation] = React.useState<string | null>(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: ArrowDownToLine },
  ];

  const handleScanProduct = () => {
    setProduct("SKU12345 (Zapato Casual)");
    setLocation("A-03-N2"); // Ubicación indicada por el SGT [cite: 93]
    setStep(2);
  };

  const handleScanLocation = () => {
    setStep(3); // Simula escaneo de ubicación [cite: 95]
  };
  
  const handleFinalScan = () => {
    // Simula escaneo de producto [cite: 97]
    setStep(4); 
  };
  
  const handleComplete = () => {
    // Producto guardado [cite: 98]
    setProduct(null);
    setLocation(null);
    setStep(1);
  };

  return (
    <Layout 
      title="Guardado Dirigido"
      subtitle="Módulo de Put-Away (TO-BE 1)"
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
            <ArrowDownToLine className="h-5 w-5 text-handheld" />
            Guardar Tarima: T-001
          </CardTitle>
          <CardDescription>12 productos restantes en tarima</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Escanear un producto de la tarima [cite: 92]</p>
              <MapPin className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleScanProduct}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Producto
              </Button>
            </div>
          )}

          {step === 2 && product && location && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">{product}</p>
              <p className="text-lg font-medium mb-2">Indicación de Guardado:</p>
              <div className="bg-handheld/10 text-handheld p-4 rounded-lg mb-6">
                <p className="text-sm">IR A:</p>
                <p className="text-4xl font-bold">{location} [cite: 93]</p>
              </div>
              <p className="text-lg font-medium mb-4">Al llegar, escanear ubicación [cite: 95]</p>
              <Button className="w-full" size="lg" onClick={handleScanLocation}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Ubicación ({location})
              </Button>
            </div>
          )}
          
          {step === 3 && product && location && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ubicación: {location}</p>
              <p className="text-lg font-medium mb-4">Escanear Producto para confirmar [cite: 97]</p>
              <MapPin className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleFinalScan}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Producto ({product})
              </Button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              <p className="text-lg font-medium mb-2">Guardado Exitoso [cite: 98]</p>
              <p className="text-muted-foreground mb-6">{product} ahora está en {location} y disponible para venta.</p>
              <Button className="w-full" size="lg" onClick={handleComplete}>
                Escanear Siguiente Producto
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldPutaway;