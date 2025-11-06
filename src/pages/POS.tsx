import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LayoutDashboard,
  Package, 
  ClipboardList,
  Users,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  X,
  CreditCard,
  DollarSign,
  Receipt,
  User,
  Scan,
  ShoppingCart,
  AlertCircle,
  Check,
  Printer
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const StorePOS = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerPhone, setCustomerPhone] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [amountReceived, setAmountReceived] = useState("");
  
  const navigationItems = [
    { name: 'Dashboard', href: '/tienda', icon: LayoutDashboard },
    { name: 'Inventario', href: '/tienda/inventory', icon: Package },
    { name: 'Tareas', href: '/tienda/tasks', icon: ClipboardList },
    { name: 'Personal', href: '/tienda/personnel', icon: Users },
    { name: 'Punto de Venta', href: '/tienda/pos', icon: ShoppingBag, active: true },
  ];

  const products = [
    { id: 'NIKE-001', name: 'Nike Air Max 90', price: 2499, stock: 45, category: 'deportivo', image: '👟' },
    { id: 'ADID-002', name: 'Adidas Ultra Boost', price: 3299, stock: 32, category: 'running', image: '👟' },
    { id: 'CONV-003', name: 'Converse Chuck Taylor', price: 1299, stock: 67, category: 'casual', image: '👟' },
    { id: 'VANS-004', name: 'Vans Old Skool', price: 1599, stock: 28, category: 'skate', image: '👟' },
    { id: 'PUMA-005', name: 'Puma RS-X', price: 1899, stock: 35, category: 'deportivo', image: '👟' },
    { id: 'REEB-006', name: 'Reebok Classic', price: 1799, stock: 22, category: 'retro', image: '👟' },
    { id: 'NEWB-007', name: 'New Balance 574', price: 2299, stock: 40, category: 'lifestyle', image: '👟' },
    { id: 'TIMB-008', name: 'Timberland 6-Inch', price: 3999, stock: 15, category: 'botas', image: '🥾' },
    { id: 'DRMR-009', name: 'Dr. Martens 1460', price: 4299, stock: 12, category: 'botas', image: '🥾' },
    { id: 'CLAR-010', name: 'Clarks Desert Boot', price: 2899, stock: 18, category: 'casual', image: '🥾' }
  ];

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'deportivo', label: 'Deportivo' },
    { value: 'running', label: 'Running' },
    { value: 'casual', label: 'Casual' },
    { value: 'skate', label: 'Skate' },
    { value: 'retro', label: 'Retro' },
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'botas', label: 'Botas' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const product = products.find(p => p.id === productId);
    if (quantity > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerPhone("");
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.16;
  const total = subtotal + tax;

  const processPayment = () => {
    if (cart.length === 0) return;
    
    if (paymentMethod === 'cash' && (!amountReceived || parseFloat(amountReceived) < total)) {
      alert('El monto recibido debe ser mayor o igual al total');
      return;
    }

    const transaction = {
      id: `TRX-${Date.now()}`,
      date: new Date().toLocaleString(),
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod,
      customerPhone,
      cashier: 'Juan Pérez',
      change: paymentMethod === 'cash' ? parseFloat(amountReceived) - total : 0
    };

    setCurrentTransaction(transaction);
    setShowPaymentDialog(false);
    setShowSuccessDialog(true);
    
    setTimeout(() => {
      clearCart();
      setShowSuccessDialog(false);
      setAmountReceived("");
    }, 3000);
  };

  const handleQuickCash = (amount) => {
    setAmountReceived(amount.toString());
  };

  return (
    <Layout 
      title="Punto de Venta"
      subtitle="Terminal de Ventas"
      moduleType="store"
      navigation={navigationItems}
      userName="Juan Pérez"
      userRole="Cajero Principal"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Catálogo de Productos</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Scan className="h-4 w-4 mr-2" />
                    Escanear
                  </Button>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="Buscar por nombre o código..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="p-3 border rounded-lg hover:bg-muted transition-colors text-left"
                    disabled={product.stock === 0}
                  >
                    <div className="text-2xl mb-2 text-center">{product.image}</div>
                    <div className="space-y-1">
                      <p className="text-xs font-mono text-muted-foreground">{product.id}</p>
                      <p className="font-medium text-sm line-clamp-2">{product.name}</p>
                      <p className="font-bold">${product.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant={product.stock > 10 ? "success" : product.stock > 0 ? "warning" : "destructive"}>
                          Stock: {product.stock}
                        </Badge>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-4 gap-2">
            <Button className="h-12" variant="outline">F1 - Buscar</Button>
            <Button className="h-12" variant="outline">F2 - Descuento</Button>
            <Button className="h-12" variant="outline">F3 - Cliente</Button>
            <Button className="h-12" variant="outline">F4 - Suspender</Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="shadow-soft">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Carrito de Compra
                </CardTitle>
                {cart.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearCart}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Carrito vacío</p>
                </div>
              ) : (
                <>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={item.id} className="border rounded-lg p-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.id}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-bold">
                              ${(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>IVA (16%):</span>
                      <span>${tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-success">${total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {cart.length > 0 && (
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Cliente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  placeholder="Teléfono del cliente (opcional)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  type="tel"
                />
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            <Button 
              className="w-full h-12 bg-success text-success-foreground hover:bg-success/90"
              onClick={() => setShowPaymentDialog(true)}
              disabled={cart.length === 0}
            >
              <CreditCard className="h-5 w-5 mr-2" />
              Cobrar ${total.toLocaleString()}
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="h-10">
                <Receipt className="h-4 w-4 mr-2" />
                Reimprimir
              </Button>
              <Button variant="outline" className="h-10">
                <DollarSign className="h-4 w-4 mr-2" />
                Devolución
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Procesar Pago</DialogTitle>
            <DialogDescription>
              Total a cobrar: ${total.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Método de pago</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Efectivo</SelectItem>
                  <SelectItem value="card">Tarjeta</SelectItem>
                  <SelectItem value="transfer">Transferencia</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {paymentMethod === 'cash' && (
              <div>
                <label className="text-sm font-medium mb-2 block">Monto recibido</label>
                <Input 
                  type="number"
                  placeholder="0.00"
                  value={amountReceived}
                  onChange={(e) => setAmountReceived(e.target.value)}
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickCash(Math.ceil(total / 50) * 50)}
                  >
                    ${Math.ceil(total / 50) * 50}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickCash(Math.ceil(total / 100) * 100)}
                  >
                    ${Math.ceil(total / 100) * 100}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickCash(Math.ceil(total / 500) * 500)}
                  >
                    ${Math.ceil(total / 500) * 500}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickCash(Math.ceil(total / 1000) * 1000)}
                  >
                    ${Math.ceil(total / 1000) * 1000}
                  </Button>
                </div>
                {amountReceived && parseFloat(amountReceived) >= total && (
                  <Alert className="mt-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Cambio: ${(parseFloat(amountReceived) - total).toLocaleString()}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                Cancelar
              </Button>
              <Button 
                className="bg-success text-success-foreground hover:bg-success/90"
                onClick={processPayment}
              >
                <Check className="h-4 w-4 mr-2" />
                Confirmar Pago
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-success" />
            </div>
            <DialogTitle className="text-xl mb-2">¡Venta Exitosa!</DialogTitle>
            <DialogDescription className="space-y-2">
              {currentTransaction && (
                <>
                  <p>Transacción: {currentTransaction.id}</p>
                  <p className="font-bold text-lg">Total: ${currentTransaction.total.toLocaleString()}</p>
                  {currentTransaction.change > 0 && (
                    <p className="text-warning font-bold">
                      Cambio: ${currentTransaction.change.toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </DialogDescription>
            <Button 
              className="mt-4"
              variant="outline"
              onClick={() => window.print()}
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default StorePOS;