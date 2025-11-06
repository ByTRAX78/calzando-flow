import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Search, 
  CreditCard,
  Package,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const POS = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b shadow-soft sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Punto de Venta</h1>
                <p className="text-sm text-muted-foreground">Caja 1 - Terminal POS</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Cajero: Ana López</span>
              <div className="w-10 h-10 rounded-full bg-gradient-secondary flex items-center justify-center text-white font-semibold">
                AL
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Integration Status */}
        <section className="mb-8">
          <Card className="p-6 bg-gradient-primary text-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Integración POS ↔ SGT</h2>
                <p className="text-white/90 mb-4">
                  El sistema de punto de venta está conectado al Sistema de Gestión de Tienda
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm">Trigger de resurtido automático activo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                    <span className="text-sm">Consulta de inventario en tiempo real</span>
                  </div>
                </div>
              </div>
              <ShoppingBag className="h-16 w-16 text-white/50" />
            </div>
          </Card>
        </section>

        {/* Functionality Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-6">Funcionalidades Integradas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Resurtido Automático</h3>
                  <Badge className="mb-3 bg-success text-success-foreground">Activo</Badge>
                  <p className="text-sm text-muted-foreground mb-3">
                    Cada venta finalizada envía notificación al SGT con SKU y cantidad vendida
                  </p>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-xs font-mono text-muted-foreground mb-1">
                      Última venta procesada:
                    </p>
                    <p className="text-xs font-mono">
                      SKU: 12345 | Qty: 2 | Hora: 14:23:15
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Search className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">Consulta de Inventario</h3>
                  <Badge className="mb-3 bg-success text-success-foreground">Activo</Badge>
                  <p className="text-sm text-muted-foreground mb-3">
                    El POS consulta disponibilidad en tiempo real para informar a clientes
                  </p>
                  <Button variant="outline" className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Verificar Disponibilidad
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Integration Flow */}
        <section>
          <h2 className="text-xl font-bold mb-6">Flujo de Integración (TO-BE 2)</h2>
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Venta Finalizada en POS</h4>
                  <p className="text-sm text-muted-foreground">
                    El cajero completa la transacción y el sistema registra la venta
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-dashed border-muted-foreground/30 h-8"></div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Notificación API al SGT</h4>
                  <p className="text-sm text-muted-foreground">
                    POS envía notificación en tiempo real con SKU y cantidad vendida
                  </p>
                  <div className="mt-2 bg-muted p-2 rounded text-xs font-mono">
                    POST /api/sales/trigger-restock
                  </div>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-dashed border-muted-foreground/30 h-8"></div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Descuento de Inventario</h4>
                  <p className="text-sm text-muted-foreground">
                    SGT descuenta del inventario de "Piso de Venta"
                  </p>
                </div>
              </div>

              <div className="ml-4 border-l-2 border-dashed border-muted-foreground/30 h-8"></div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-bold mb-1">Trigger de Resurtido</h4>
                  <p className="text-sm text-muted-foreground">
                    Si el inventario cae bajo el punto de reorden, SGT genera tarea automática para Asociado Operativo
                  </p>
                  <Badge className="mt-2 bg-success text-success-foreground">Resurtido Proactivo</Badge>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Info Alert */}
        <Card className="mt-8 p-6 border-info bg-info/5">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-info flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-1 text-info">Nota de Integración</h4>
              <p className="text-sm text-muted-foreground">
                Esta página representa la integración conceptual entre el POS y el SGT. 
                La implementación real requiere conectar el software de POS existente 
                (ej. Square, Lightspeed, etc.) mediante su API al backend del SGT.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default POS;
