// src/pages/store/Inventory.tsx
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
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Loader2, AlertCircle, Package } from "lucide-react";
import { Label } from "@/components/ui/label";

// Interfaz para el producto
interface ProductoInventario {
  id: string; 
  marca: string;
  modelo: string;
  talla: string;
  piezas: number; // <--- CAMPO NUEVO
}

const API_URL = "http://localhost:3000/api/inventario";

export function StoreInventory() {
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
          throw new Error(`Error ${response.status}: No se pudo cargar el inventario.`);
        }
      } else {
        const data = await response.json();
        setInventory(data);
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

  
  // --- RENDERIZADO ---
  return (
    <div className="p-4 md:p-8 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Package className="h-6 w-6 mr-3" />
              Vista de Inventario (Redis)
            </div>
            <Button onClick={fetchInventory} variant="outline" size="icon" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
          </CardTitle>
          <CardDescription>
            Visualiza el inventario actual registrado en la base de datos de Redis.
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
                  <TableHead>ID (Redis)</TableHead>
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
                      <TableCell className="text-muted-foreground text-xs">
                        {producto.id}
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