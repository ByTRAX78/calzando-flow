import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { RefreshCw, Loader2, AlertCircle, Package, ArrowLeft } from "lucide-react";
import { Label } from "@/components/ui/label";

interface ProductoInventario {
  id: string; 
  marca: string;
  modelo: string;
  talla: string;
  piezas: number;
}

const API_URL = "http://localhost:3000/api/inventario";

export function StoreInventory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inventory, setInventory] = useState<ProductoInventario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("calzado-hombre");

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

  const getStockColor = (piezas: number) => {
    if (piezas <= 4) return "text-red-600 font-bold";
    if (piezas <= 10) return "text-yellow-600 font-bold";
    return "text-green-600 font-medium";
  };
  
  return (
    <div className="p-4 md:p-8 space-y-4">
      <Button variant="outline" onClick={() => navigate("/tienda/dashboard")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Dashboard de Tienda
      </Button>
      
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
                  <TableHead>Piezas (Stock)</TableHead>
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
                      <TableCell className={getStockColor(producto.piezas)}>
                        {producto.piezas} pz
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
                       <p className="text-muted-foreground">
                        No se encontró inventario para "{selectedCategory}".
                      </p>
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