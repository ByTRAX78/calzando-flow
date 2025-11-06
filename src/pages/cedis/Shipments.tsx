import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Loader2, AlertCircle, Truck, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PedidoItem {
  id: string;
  categoria: string;
  marca: string;
  modelo: string;
  talla: string;
  piezas: number;
}

interface Pedido {
  id: string;
  fecha: string;
  estado: "pendiente" | "completado";
  totalItems: number;
  items: PedidoItem[];
}

const API_URL = "http://localhost:3000/api/pedidos";

export function CedisShipments() {
  const { toast } = useToast();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/pendientes`);
      if (!response.ok) {
        throw new Error("No se pudieron cargar los pedidos pendientes.");
      }
      const data = await response.json();
      setPedidos(data);
    } catch (err: any) {
      setError(err.message);
      toast({ title: "Error al Cargar Pedidos", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleCompleteOrder = async (pedidoId: string) => {
    try {
      const response = await fetch(`${API_URL}/${pedidoId}/completar`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("No se pudo completar el pedido.");
      }
      toast({
        title: "Pedido Completado",
        description: `El pedido ${pedidoId} ha sido marcado como completado.`,
        className: "bg-green-100 text-green-800",
      });
      fetchPedidos();
    } catch (err: any) {
      toast({ title: "Error al Completar", description: err.message, variant: "destructive" });
    }
  };

  const getStockColor = (piezas: number) => {
    if (piezas <= 4) return "text-red-600 font-bold";
    if (piezas <= 10) return "text-yellow-600 font-bold";
    return "text-green-600 font-medium";
  };

  return (
    <div className="p-4 md:p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Truck className="h-6 w-6 mr-3" />
              Gestión de Envíos (CEDIS)
            </div>
            <Button onClick={fetchPedidos} variant="outline" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Revisa y gestiona las órdenes de re-abastecimiento pendientes generadas por las tiendas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 text-center text-destructive flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-2" /> {error}
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Cargando pedidos pendientes...</p>
            </div>
          )}

          {!isLoading && !error && pedidos.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="mt-4 text-lg font-medium">¡Todo en orden!</p>
              <p className="text-muted-foreground">No hay pedidos de re-abastecimiento pendientes.</p>
            </div>
          )}

          {!isLoading && pedidos.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              {pedidos.map((pedido) => (
                <AccordionItem value={pedido.id} key={pedido.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <div className="flex flex-col text-left">
                        <span className="font-bold text-base">{pedido.id}</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(pedido.fecha).toLocaleString()}
                        </span>
                      </div>
                      <Badge variant="destructive" className="h-fit">
                        {pedido.totalItems} Items
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Marca</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead>Talla</TableHead>
                            <TableHead>Stock Actual</TableHead>
                            <TableHead>Categoría</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pedido.items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>{item.marca}</TableCell>
                              <TableCell>{item.modelo}</TableCell>
                              <TableCell>{item.talla}</TableCell>
                              <TableCell className={getStockColor(item.piezas)}>
                                {item.piezas} pz
                              </TableCell>
                              <TableCell className="text-muted-foreground">{item.categoria}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button 
                        className="mt-4 w-full" 
                        onClick={() => handleCompleteOrder(pedido.id)}
                      >
                        Marcar como Completado / Enviado
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

        </CardContent>
      </Card>
    </div>
  );
}