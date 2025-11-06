import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, Scan, MapPin, CheckCircle, ArrowLeft, Sparkles, Loader2, Route } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const HandheldPutaway = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = React.useState(1);
  const [product, setProduct] = React.useState<string | null>(null);
  const [location, setLocation] = React.useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [optimized, setOptimized] = React.useState(true);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: ArrowDownToLine },
  ];

  const handleScanProduct = () => {
    setProduct("SKU12345 (Zapato Casual)");
    setLocation("A-03-N2");
    setStep(2);
    setOptimized(true);
  };

  const handleScanLocation = () => {
    setStep(3);
  };
  
  const handleFinalScan = () => {
    setStep(4); 
  };
  
  const handleComplete = () => {
    setProduct(null);
    setLocation(null);
    setStep(1);
    setOptimized(true);
  };

  const handleRecalculate = () => {
    setIsOptimizing(true);
    setOptimized(false);
    setTimeout(() => {
      const newLocation = location === "A-03-N2" ? "B-01-N1" : "A-03-N2";
      setLocation(newLocation);
      setIsOptimizing(false);
      setOptimized(true);
      toast({
        title: "Ruta Recalculada",
        description: `La IA encontró una ubicación más óptima: ${newLocation}`,
      })
    }, 1500);
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
              <p className="text-lg font-medium mb-4">Escanear un producto de la tarima</p>
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
              {optimized && (
                <Badge variant="outline" className="mb-2 bg-success/10 text-success border-success/30">
                  <Route className="h-3 w-3 mr-1" />
                  Ruta Optimizada por IA
                </Badge>
              )}
              <div className="bg-handheld/10 text-handheld p-4 rounded-lg mb-4">
                <p className="text-sm">IR A:</p>
                {isOptimizing ? (
                  <Skeleton className="h-10 w-32 mx-auto my-1" />
                ) : (
                  <p className="text-4xl font-bold">{location}</p>
                )}
              </div>
              <p className="text-lg font-medium mb-4">Al llegar, escanear ubicación</p>
              <Button className="w-full" size="lg" onClick={handleScanLocation}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Ubicación ({location})
              </Button>
              <Button 
                className="w-full mt-2" 
                variant="outline" 
                size="sm"
                onClick={handleRecalculate}
                disabled={isOptimizing}
              >
                {isOptimizing ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                {isOptimizing ? 'Recalculando...' : 'Simular Recálculo de IA'}
              </Button>
            </div>
          )}
          
          {step === 3 && product && location && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Ubicación: {location}</p>
              <p className="text-lg font-medium mb-4">Escanear Producto para confirmar</p>
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
              <p className="text-lg font-medium mb-2">Guardado Exitoso</p>
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