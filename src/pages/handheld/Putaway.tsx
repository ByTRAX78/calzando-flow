// src/pages/handheld/Putaway.tsx
import React, { useState, useEffect } from "react";
// Importa useNavigate para el botón de "Volver"
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// Define la estructura de tu producto
interface Producto {
  marca: string;
  modelo: string;
  talla: string;
}

// Simula la obtención de ubicaciones físicas
const getPhysicalLocations = (tarimaId: string): string[] => {
  if (tarimaId.toLowerCase().includes("hombre")) {
    return ["Pasillo A, Rack 01, Nivel 1", "Pasillo A, Rack 02, Nivel 1", "Pasillo B, Rack 01, Nivel 1"];
  }
  if (tarimaId.toLowerCase().includes("dama")) {
    return ["Pasillo C, Rack 01, Nivel 1", "Pasillo C, Rack 02, Nivel 1", "Pasillo C, Rack 03, Nivel 1"];
  }
  return ["Zona General, Rack G1", "Zona General, Rack G2", "Zona General, Rack G3"];
};

// Esta es la exportación NOMBRADA (corrige el error de build)
export function PutawayPage() {
  const navigate = useNavigate(); // Hook para navegar
  const [producto, setProducto] = useState<Producto>({ marca: "", modelo: "", talla: "" });
  const [tarimaId, setTarimaId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    if (!isScanning) return;

    const scannerId = "qr-reader";
    const html5QrcodeScanner = new Html5QrcodeScanner(
      scannerId,
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    const onScanSuccess = (decodedText: string) => {
      // El QR escaneado es la 'categoria' (tarima)
      toast({ title: "Tarima Escaneada", description: decodedText });
      setTarimaId(decodedText);
      setIsScanning(false);
      html5QrcodeScanner.clear();
    };

    html5QrcodeScanner.render(onScanSuccess, () => {});

    return () => {
      html5QrcodeScanner.clear().catch(console.error);
    };
  }, [isScanning]);

  // CORREGIDO: Manejador para el formulario
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPutaway = async () => {
    if (!tarimaId || !producto.marca) {
      toast({ title: "Error", description: "Faltan datos del producto o tarima.", variant: "destructive" });
      return;
    }

    try {
      // 1. Guardar el producto en la BD (Redis)
      const response = await fetch("http://localhost:3000/api/inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: tarimaId, // El QR de la tarima es la categoría
          producto: producto,  // Los datos del producto
        }),
      });

      if (!response.ok) throw new Error("Error del servidor");
      const result = await response.json();
      toast({
        title: "¡Guardado en BD!",
        description: `Producto ${result.id} registrado en tarima ${tarimaId}.`,
      });

      // 2. Obtener y mostrar las ubicaciones físicas
      const suggestedLocations = getPhysicalLocations(tarimaId);
      setLocations(suggestedLocations);
      setProducto({ marca: "", modelo: "", talla: "" });

    } catch (error) {
      toast({ title: "Error de Red", description: "No se pudo conectar con el backend.", variant: "destructive" });
    }
  };
  
  // CORREGIDO: Función para resetear
  const handleClearAll = () => {
    setProducto({ marca: "", modelo: "", talla: "" });
    setTarimaId(null);
    setLocations([]);
    setIsScanning(false);
  }

  return (
    <div className="p-4 space-y-4">
      {/* Botón para volver al Dashboard */}
      <Button variant="outline" onClick={() => navigate("/handheld/dashboard")}>
        &larr; Volver al Dashboard
      </Button>

      {locations.length === 0 && (
        <>
          <Card>
            <CardHeader><CardTitle>Paso 1: Identificar Producto</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div><Label htmlFor="marca">Marca</Label><Input id="marca" name="marca" value={producto.marca} onChange={handleProductChange} /></div>
              <div><Label htmlFor="modelo">Modelo</Label><Input id="modelo" name="modelo" value={producto.modelo} onChange={handleProductChange} /></div>
              <div><Label htmlFor="talla">Talla</Label><Input id="talla" name="talla" value={producto.talla} onChange={handleProductChange} /></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Paso 2: Escanear Tarima (QR)</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div id="qr-reader" className="w-full"></div>
              {!isScanning && !tarimaId && (
                <Button onClick={() => setIsScanning(true)}>Iniciar Escáner QR</Button>
              )}
              {tarimaId && (
                <div className="text-center"><p className="font-bold text-green-600">Tarima: {tarimaId}</p></div>
              )}
            </CardContent>
          </Card>

          <Button
            className="w-full text-lg p-6"
            onClick={handleSubmitPutaway}
            disabled={!tarimaId || !producto.marca}
          >
            Guardar en Tarima Digital
          </Button>
        </>
      )}

      {/* --- SECCIÓN: PASO 3 --- */}
      {locations.length > 0 && (
        <Card className="border-green-500 border-2">
          <CardHeader>
            <CardTitle className="text-green-600">Paso 3: Guardar en Físico</CardTitle>
            <p>Producto guardado en tarima virtual <span className="font-bold">{tarimaId}</span>.</p>
            <p>Ahora, coloca el producto en una de estas ubicaciones:</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {locations.map((loc, index) => (
              <div key={index} className="text-lg font-semibold p-4 border rounded-md bg-zinc-100">
                {loc}
              </div>
            ))}
            <Button className="w-full mt-4" onClick={handleClearAll}>
              Escanear Siguiente Producto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}