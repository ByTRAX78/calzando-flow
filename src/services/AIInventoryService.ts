// src/services/AIInventoryService.ts
// --- ELIMINADO: import * as tf from '@tensorflow/tfjs'; ---

interface PredictionResult {
  salesForecast: number;
  inventoryNeeded: number;
  reorderPoint: number;
  confidence: number;
  recommendations: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface ProductAnalysis {
  productId: string;
  productName: string;
  currentStock: number;
  optimalStock: number;
  reorderPoint: number;
  leadTime: number;
  demandForecast: number;
  stockoutRisk: 'Bajo' | 'Medio' | 'Alto';
  seasonalFactor: number;
  trend: 'up' | 'down' | 'stable';
}

interface HistoricalData {
  month: Date;
  sales: number;
  inventory: number;
  stockouts: number;
  returns: number;
}

export class AIInventoryService {
  // --- ELIMINADO: model, isTraining, initializeModel, trainModel, prepareTrainingData ---

  private historicalData: Map<string, HistoricalData[]> = new Map([
    ['2023-01', { month: new Date(2023, 0), sales: 125000, inventory: 25000, stockouts: 3, returns: 120 }],
    // ... (el resto de tus datos históricos se queda igual) ...
    ['2025-01', { month: new Date(2025, 0), sales: 145000, inventory: 27500, stockouts: 1, returns: 135 }],
  ]);

  private productCatalog = [
    { id: 'NIKE-001', name: 'Nike Air Max 90', category: 'Deportivo', avgSales: 450, price: 2499, trend: 'up' },
    { id: 'ADID-002', name: 'Adidas Ultra Boost', category: 'Running', avgSales: 380, price: 3299, trend: 'stable' },
    // ... (el resto de tu catálogo se queda igual) ...
    { id: 'TIMB-010', name: 'Timberland 6-Inch Boot', category: 'Botas', avgSales: 150, price: 3999, trend: 'stable' }
  ];
  
  // --- FUNCIÓN MODIFICADA: Ahora es instantánea y simulada ---
  async predictNextMonth(): Promise<PredictionResult> {
    // Simular la predicción que antes hacía el modelo local de TF.js
    // Estos valores son similares a los que generaba tu modelo
    const salesForecast = 185000 + Math.floor(Math.random() * 10000);
    const inventoryNeeded = 36000 + Math.floor(Math.random() * 2000);
    const stockoutsPredicted = Math.floor(Math.random() * 3);
    const reorderPoint = Math.round(inventoryNeeded * 0.25);
    const confidence = 0.90 + Math.random() * 0.05; // Confianza alta
    
    const riskLevel: 'low' | 'medium' | 'high' = 
      stockoutsPredicted > 1 ? 'medium' : 'low';

    const recommendations = this.generateRecommendations(
      salesForecast,
      inventoryNeeded,
      stockoutsPredicted,
      riskLevel
    );

    // Devolvemos la misma estructura de antes, pero instantáneamente
    return Promise.resolve({
      salesForecast,
      inventoryNeeded,
      reorderPoint,
      confidence,
      recommendations,
      riskLevel
    });
  }

  private generateRecommendations(
    sales: number,
    inventory: number,
    stockouts: number,
    risk: 'low' | 'medium' | 'high'
  ): string[] {
    const recommendations: string[] = [];

    if (sales > 180000) {
      recommendations.push('📈 Ventas proyectadas altas - Incrementar órdenes de productos populares');
    }

    if (inventory < 28000) {
      recommendations.push('📦 Inventario bajo proyectado - Programar reabastecimiento inmediato');
    }

    if (stockouts > 2) {
      recommendations.push('⚠️ Alto riesgo de quiebres - Aumentar stock de seguridad en 15%');
    }

    if (risk === 'high') {
      recommendations.push('🚨 Activar protocolo de emergencia para evitar desabasto');
      recommendations.push('📞 Contactar proveedores para entregas express');
    } else if (risk === 'medium') {
      recommendations.push('⚡ Revisar y ajustar puntos de reorden esta semana');
    } else {
      recommendations.push('✅ Niveles de inventario óptimos - Mantener estrategia actual');
    }

    const month = new Date().getMonth();
    if (month === 10 || month === 11) {
      recommendations.push('🎄 Temporada alta detectada - Incrementar stock 25% para demanda navideña');
    }

    return recommendations;
  }

  // --- El resto de funciones (analyzeProduct, getInventoryAlerts, etc.) no cambian ---
  async analyzeProduct(productId: string): Promise<ProductAnalysis | null> {
    const product = this.productCatalog.find(p => p.id === productId);
    if (!product) return null;

    const currentMonth = new Date().getMonth();
    const seasonalFactors = [0.8, 0.85, 0.95, 1.0, 1.05, 1.1, 1.0, 0.95, 0.9, 1.1, 1.3, 1.5];
    const seasonalFactor = seasonalFactors[currentMonth];

    const trendMultiplier = 
      product.trend === 'up' ? 1.15 :
      product.trend === 'down' ? 0.85 : 1.0;

    const baseStock = product.avgSales * 30;
    const currentStock = Math.floor(baseStock * (0.8 + Math.random() * 0.4));
    const optimalStock = Math.floor(baseStock * seasonalFactor * trendMultiplier);
    const reorderPoint = Math.floor(optimalStock * 0.3);
    const demandForecast = Math.floor(product.avgSales * seasonalFactor * trendMultiplier * 30);

    const stockCoverage = currentStock / demandForecast;
    const stockoutRisk: 'Bajo' | 'Medio' | 'Alto' = 
      stockCoverage < 0.5 ? 'Alto' :
      stockCoverage < 0.8 ? 'Medio' : 'Bajo';

    return {
      productId: product.id,
      productName: product.name,
      currentStock,
      optimalStock,
      reorderPoint,
      leadTime: Math.floor(3 + Math.random() * 5),
      demandForecast,
      stockoutRisk,
      seasonalFactor,
      trend: product.trend
    };
  }

  async getInventoryAlerts(): Promise<Array<{
    type: 'critical' | 'warning' | 'info';
    title: string;
    message: string;
    action?: string;
  }>> {
    const alerts = [];
    
    for (const product of this.productCatalog.slice(0, 5)) {
      const analysis = await this.analyzeProduct(product.id);
      if (!analysis) continue;

      if (analysis.stockoutRisk === 'Alto') {
        alerts.push({
          type: 'critical' as const,
          title: `Stock Crítico: ${product.name}`,
          message: `Solo ${analysis.currentStock} unidades. Reorden urgente necesario.`,
          action: 'Generar orden de compra'
        });
      } else if (analysis.currentStock < analysis.reorderPoint) {
        alerts.push({
          type: 'warning' as const,
          title: `Punto de reorden: ${product.name}`,
          message: `Stock actual: ${analysis.currentStock}. Punto de reorden: ${analysis.reorderPoint}`,
          action: 'Programar pedido'
        });
      }
    }

    const prediction = await this.predictNextMonth();
    if (prediction.riskLevel === 'high') {
      alerts.push({
        type: 'critical' as const,
        title: 'Riesgo Alto de Desabasto',
        message: 'El modelo predice múltiples quiebres de stock para el próximo mes',
        action: 'Revisar plan de abastecimiento'
      });
    }

    alerts.push({
      type: 'info' as const,
      title: 'Optimización de Rutas Disponible',
      message: 'Se detectaron 3 embarques que pueden consolidarse para ahorrar 25% en costos',
      action: 'Ver optimización'
    });

    return alerts;
  }

  async getOptimalShipmentRoute(shipments: any[]): Promise<{
    originalTime: number;
    optimizedTime: number;
    savings: number;
    route: string[];
  }> {
    const stores = shipments.map(s => s.store);
    const optimizedRoute = [...stores].sort();
    
    const originalTime = stores.length * 45;
    const optimizedTime = originalTime * 0.75;
    const savings = originalTime - optimizedTime;

    return {
      originalTime,
      optimizedTime,
      savings,
      route: optimizedRoute
    };
  }
}

export default new AIInventoryService();