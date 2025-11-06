// src/pages/handheld/Waste.tsx
import React from 'react';
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Scan, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HandheldWaste = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [product, setProduct] = React.useState<string | null>(null);

  const navigationItems = [
    { name: 'Dashboard', href: '/handheld/dashboard', icon: Trash2 },
  ];

  const handleScanProduct = () => {
    setProduct("SKU12349 (Bota Industrial)");
    setStep(2); // Simula escaneo [cite: 121]
  };
  
  const handleConfirmWaste = () => {
    // Mueve a ubicación virtual de Merma [cite: 122]
    setStep(3); 
  };
  
  const handleComplete = () => {
    setProduct(null);
    setStep(1);
  };

  return (
    <Layout 
      title="Gestión de Mermas"
      subtitle="Módulo de Mermas"
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
            <Trash2 className="h-5 w-5 text-handheld" />
            Registrar Merma [cite: 119]
          </CardTitle>
          <CardDescription>Registrar productos dañados u obsoletos</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="text-center">
              <p className="text-lg font-medium mb-4">Escanear producto a mermar [cite: 121]</p>
              <Trash2 className="h-32 w-32 mx-auto text-muted-foreground mb-6" />
              <Button className="w-full" size="lg" onClick={handleScanProduct}>
                <Scan className="mr-2 h-5 w-5" />
                Escanear Producto
              </Button>
            </div>
          )}

          {step === 2 && product && (
            <div className="text-left">
              <p className="text-lg font-medium mb-4 text-center">{product}</p>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Seleccionar Motivo [cite: 121]</label>
                  <Select defaultValue="damaged">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar motivo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Dañado</SelectItem>
                      <SelectItem value="incomplete">Incompleto</SelectItem>
                      <SelectItem value="obsolete">Obsoleto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" size="lg" variant="destructive" onClick={handleConfirmWaste}>
                  Confirmar Merma
                </Button>
              </div>
            </div>
          )}
          
          {step === 3 && product && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              <p className="text-lg font-medium mb-2">Merma Registrada</p>
              <p className="text-muted-foreground mb-6">{product} movido a ubicación 'Merma'. [cite: 122]</p>
              <Button className="w-full" size="lg" onClick={handleComplete}>
                Escanear Siguiente
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default HandheldWaste;