// src/pages/POS.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Loader2, ShoppingCart, AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";

// Interfaz para el producto
interface ProductoInventario {
  id: string; 
  marca: string;
  modelo: string;
  talla: string;
  piezas: number; // <--- CAMPO NUEVO
  categoria: string; 
}

const API_URL = "http://localhost:3000/api/inventario";

export function POSPage() {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<ProductoInventario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("calzado-hombre");

  /**
   * EP 2: OBTENER TODOS LOS PRODUCTOS
   */
  const fetchInventory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/${selectedCategory}`);
      if (!response.ok) {
        if (response.status === 404) {
          setInventory([]);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error ${response.status}`);
        }
      } else {
        const data = await response.json();
        const productsWithCategory = data.map((prod: any) => ({
          ...prod,
          categoria: selectedCategory,
        }));
        setInventory(productsWithCategory);
      }
    } catch (err: any) {
      setError(err.message);
      toast({ title: "Error al Cargar", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [selectedCategory]);

  /**
   * EP 3: VENDER (RESTAR 1 PIEZA)
   */
  const handleSell = async (producto: ProductoInventario) => {
    try {
      const response = await fetch(
        `${API_URL}/${producto.categoria}/${producto.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo completar la venta.");
      }

      const result = await response.json(); // { message, idVendido, piezasRestantes }

      toast({
        title: "¡Venta Exitosa!",
        description: `${producto.marca} ${producto.modelo}. Quedan: ${result.piezasRestantes} pz.`,
        className: "bg-green-100 text-green-800",
      });

      // ¡IMPORTANTE! Volvemos a cargar el inventario para reflejar el stock actualizado
      // (ya sea el nuevo número de piezas, o la eliminación del item si llegó a 0)
      fetchInventory();

    } catch (err: any) {
      setError(err.message);
      toast({ title: "Error en la Venta", description: err.message, variant: "destructive" });
    }
  };

  // --- RENDERIZADO ---
  return (
    <div className="p-4 md:p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="h-6 w-6 mr-3" />
              Punto de Venta (POS)
            </div>
            <Button onClick={fetchInventory} variant="outline" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Selecciona una categoría para ver el inventario y registrar ventas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          
          <div className="mb-4 max-w-sm">
            <Label>Seleccionar Categoría:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="calzado-hombre">Calzado (Hombre)</SelectItem>
                <SelectItem value="calzado-mujer">Calzado (Mujer)</SelectItem>
                <SelectItem value="calzado-nino">Calzado (Niño)</SelectItem>
                <SelectItem value="accesorios">Accesorios</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && (
            <div className="mb-4 text-center text-destructive flex items-center justify-center">
              <AlertCircle className="h-4 w-4 mr-2" /> {error}
            </div>
          )}

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Marca</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Talla</TableHead>
                  <TableHead>Piezas (Stock)</TableHead> {/* <--- COLUMNA NUEVA */}
                  <TableHead className="text-right">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    </TableCell>
                  </TableRow>
                ) : inventory.length > 0 ? (
                  inventory.map((producto) => (
                    <TableRow key={producto.id}>
                      <TableCell className="font-medium">{producto.marca}</TableCell>
                      <TableCell>{producto.modelo}</TableCell>
                      <TableCell>{producto.talla}</TableCell>
                      {/* --- CELDA NUEVA --- */}
                      <TableCell>
                        <strong className={producto.piezas <= 5 ? "text-red-500" : "text-green-600"}>
                          {producto.piezas} pz
                        </strong>
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" disabled={producto.piezas <= 0}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Vender
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar Venta</AlertDialogTitle>
                              <AlertDialogDescription>
                                ¿Vender 1 unidad de este producto?
                                <br />
                                <strong className="py-2 block">
                                  {producto.marca} {producto.modelo} (Talla: {producto.talla})
                                </strong>
                                Quedarán {producto.piezas - 1} piezas en stock.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleSell(producto)} className="bg-destructive hover:bg-destructive/90">
                                Sí, Confirmar Venta
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-48">
                      <p className="font-medium">No hay productos</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}