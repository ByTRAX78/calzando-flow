import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2, CheckCircle, XCircle } from "lucide-react";

interface QrData {
  categoria: string;
  producto: {
    marca: string;
    modelo: string;
    talla: string;
    piezas: number;
  };
}

export function PutawayPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState("scan");
  
  const [manualForm, setManualForm] = useState({
    categoria: "calzado-hombre",
    marca: "",
    modelo: "",
    talla: "",
    piezas: "1",
  });

  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const scannerId = "qr-reader-container";

  useEffect(() => {
    if (activeTab === "scan" && status === "idle") {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [activeTab, status]);

  const startScanner = () => {
    if (scannerRef.current) return;
    try {
      const html5QrcodeScanner = new Html5QrcodeScanner(
        scannerId,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      const onScanSuccess = async (decodedText: string) => {
        stopScanner();
        setStatus("loading");
        let parsedData: QrData;
        try {
          parsedData = JSON.parse(decodedText);
        } catch (err) {
          setStatus("error");
          setErrorMessage(`Error de QR: El código no es un JSON válido. Texto: "${decodedText}"`);
          return;
        }

        if (!parsedData.categoria || !parsedData.producto || !parsedData.producto.piezas) {
          setStatus("error");
          setErrorMessage('Error de QR: El JSON no tiene "categoria" y "producto" con "piezas".');
          return;
        }
        
        await handleSubmitToBackend(parsedData);
      };

      html5QrcodeScanner.render(onScanSuccess, () => {});
      scannerRef.current = html5QrcodeScanner;
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(`Error al iniciar el scanner: ${err.message}`);
    }
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualForm(prev => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { categoria, marca, modelo, talla, piezas } = manualForm;

    if (!categoria || !marca || !modelo || !talla || !piezas) {
      toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
      return;
    }

    const data: QrData = {
      categoria,
      producto: { marca, modelo, talla, piezas: Number(piezas) }
    };

    setStatus("loading");
    await handleSubmitToBackend(data);
  };

  const handleSubmitToBackend = async (data: QrData) => {
    try {
      const response = await fetch("http://localhost:3000/api/inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: data.categoria,
          producto: data.producto,
        }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || "Error del servidor");
      }

      const result = await response.json();
      toast({
        title: "¡Producto Guardado!",
        description: `ID: ${result.id} (${data.producto.marca}) guardado con ${data.producto.piezas} piezas.`,
      });
      setStatus("success");
      
      setManualForm({ categoria: manualForm.categoria, marca: "", modelo: "", talla: "", piezas: "1" });

    } catch (error: any) {
      toast({ title: "Error de Red", description: error.message, variant: "destructive" });
      setStatus("error");
      setErrorMessage(`Error al guardar: ${error.message}`);
    }
  };

  const resetFlow = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="p-4 space-y-4">
      <Button variant="outline" onClick={() => navigate("/handheld/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver
      </Button>
      
      <p className="text-sm text-muted-foreground p-2 bg-yellow-100 border border-yellow-300 rounded-md">
        <strong>Ejemplo de QR:</strong> El JSON en el QR ahora debe incluir "piezas":
        <pre className="text-xs">
          {`{\n  "categoria": "calzado-hombre",\n  "producto": {\n    "marca": "Nike",\n    "modelo": "Air",\n    "talla": "27",\n    "piezas": 10\n  }\n}`}
        </pre>
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="scan">Escanear QR</TabsTrigger>
          <TabsTrigger value="manual">Ingreso Manual</TabsTrigger>
        </TabsList>

        {(status === "loading" || status === "success" || status === "error") && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center pt-6 h-72">
              {status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />}
              {status === "success" && <CheckCircle className="h-12 w-12 text-green-500 mb-4" />}
              {status === "error" && <XCircle className="h-12 w-12 text-destructive mb-4" />}
              
              <p className="font-bold">
                {status === 'loading' && 'Procesando...'}
                {status === 'success' && '¡Guardado con Éxito!'}
                {status === 'error' && 'Error al Procesar'}
              </p>
              
              {status === "error" && <p className="text-sm text-muted-foreground text-center max-w-xs break-words">{errorMessage}</p>}
              
              {(status === 'success' || status === 'error') && (
                <Button className="mt-4" variant={status === 'error' ? 'outline' : 'default'} onClick={resetFlow}>
                  {status === 'success' ? 'Registrar Siguiente' : 'Intentar de Nuevo'}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        <div className={status !== 'idle' ? 'hidden' : 'block'}>
          <TabsContent value="scan">
            <Card>
              <CardHeader>
                <CardTitle>Guardado por QR</CardTitle>
                <CardDescription>Apunta la cámara al QR del producto para registrarlo.</CardDescription>
              </CardHeader>
              <CardContent>
                <div id={scannerId} className="w-full rounded-lg overflow-hidden min-h-[300px]"></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>Guardado Manual</CardTitle>
                <CardDescription>Ingresa los datos del producto si el QR falla.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="categoria">Categoría</Label>
                    <Input id="categoria" name="categoria" value={manualForm.categoria} onChange={handleManualChange} />
                  </div>
                  <div>
                    <Label htmlFor="marca">Marca</Label>
                    <Input id="marca" name="marca" placeholder="Ej: Nike" value={manualForm.marca} onChange={handleManualChange} required />
                  </div>
                  <div>
                    <Label htmlFor="modelo">Modelo</Label>
                    <Input id="modelo" name="modelo" placeholder="Ej: Air Max" value={manualForm.modelo} onChange={handleManualChange} required />
                  </div>
                  <div>
                    <Label htmlFor="talla">Talla</Label>
                    <Input id="talla" name="talla" placeholder="Ej: 27.5" value={manualForm.talla} onChange={handleManualChange} required />
                  </div>
                  <div>
                    <Label htmlFor="piezas">Número de Piezas</Label>
                    <Input id="piezas" name="piezas" type="number" min="1" value={manualForm.piezas} onChange={handleManualChange} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Guardar Manualmente
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}