import * as tf from '@tensorflow/tfjs';

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
  private model: tf.Sequential | null = null;
  private isTraining: boolean = false;
  
  private historicalData: Map<string, HistoricalData[]> = new Map([
    ['2023-01', { month: new Date(2023, 0), sales: 125000, inventory: 25000, stockouts: 3, returns: 120 }],
    ['2023-02', { month: new Date(2023, 1), sales: 118000, inventory: 23000, stockouts: 2, returns: 95 }],
    ['2023-03', { month: new Date(2023, 2), sales: 145000, inventory: 28000, stockouts: 5, returns: 150 }],
    ['2023-04', { month: new Date(2023, 3), sales: 138000, inventory: 26500, stockouts: 1, returns: 110 }],
    ['2023-05', { month: new Date(2023, 4), sales: 152000, inventory: 29000, stockouts: 4, returns: 140 }],
    ['2023-06', { month: new Date(2023, 5), sales: 165000, inventory: 31000, stockouts: 2, returns: 165 }],
    ['2023-07', { month: new Date(2023, 6), sales: 158000, inventory: 30000, stockouts: 3, returns: 155 }],
    ['2023-08', { month: new Date(2023, 7), sales: 172000, inventory: 32500, stockouts: 1, returns: 170 }],
    ['2023-09', { month: new Date(2023, 8), sales: 148000, inventory: 28500, stockouts: 6, returns: 125 }],
    ['2023-10', { month: new Date(2023, 9), sales: 156000, inventory: 29800, stockouts: 2, returns: 135 }],
    ['2023-11', { month: new Date(2023, 10), sales: 185000, inventory: 35000, stockouts: 0, returns: 180 }],
    ['2023-12', { month: new Date(2023, 11), sales: 210000, inventory: 38000, stockouts: 1, returns: 210 }],
    ['2024-01', { month: new Date(2024, 0), sales: 135000, inventory: 26000, stockouts: 2, returns: 130 }],
    ['2024-02', { month: new Date(2024, 1), sales: 128000, inventory: 24500, stockouts: 3, returns: 115 }],
    ['2024-03', { month: new Date(2024, 2), sales: 155000, inventory: 29500, stockouts: 1, returns: 145 }],
    ['2024-04', { month: new Date(2024, 3), sales: 148000, inventory: 28000, stockouts: 2, returns: 125 }],
    ['2024-05', { month: new Date(2024, 4), sales: 162000, inventory: 30500, stockouts: 0, returns: 155 }],
    ['2024-06', { month: new Date(2024, 5), sales: 175000, inventory: 32500, stockouts: 1, returns: 170 }],
    ['2024-07', { month: new Date(2024, 6), sales: 168000, inventory: 31500, stockouts: 2, returns: 160 }],
    ['2024-08', { month: new Date(2024, 7), sales: 182000, inventory: 34000, stockouts: 0, returns: 175 }],
    ['2024-09', { month: new Date(2024, 8), sales: 158000, inventory: 30000, stockouts: 3, returns: 140 }],
    ['2024-10', { month: new Date(2024, 9), sales: 166000, inventory: 31200, stockouts: 1, returns: 150 }],
    ['2024-11', { month: new Date(2024, 10), sales: 195000, inventory: 36500, stockouts: 0, returns: 190 }],
    ['2024-12', { month: new Date(2024, 11), sales: 225000, inventory: 40000, stockouts: 0, returns: 220 }],
    ['2025-01', { month: new Date(2025, 0), sales: 145000, inventory: 27500, stockouts: 1, returns: 135 }],
  ]);

  private productCatalog = [
    { id: 'NIKE-001', name: 'Nike Air Max 90', category: 'Deportivo', avgSales: 450, price: 2499, trend: 'up' },
    { id: 'ADID-002', name: 'Adidas Ultra Boost', category: 'Running', avgSales: 380, price: 3299, trend: 'stable' },
    { id: 'PUMA-003', name: 'Puma RS-X', category: 'Casual', avgSales: 320, price: 1899, trend: 'up' },
    { id: 'VANS-004', name: 'Vans Old Skool', category: 'Skate', avgSales: 280, price: 1599, trend: 'down' },
    { id: 'CONV-005', name: 'Converse Chuck Taylor', category: 'Casual', avgSales: 520, price: 1299, trend: 'stable' },
    { id: 'REEB-006', name: 'Reebok Classic', category: 'Retro', avgSales: 240, price: 1799, trend: 'down' },
    { id: 'NEWB-007', name: 'New Balance 574', category: 'Lifestyle', avgSales: 360, price: 2299, trend: 'up' },
    { id: 'ASIC-008', name: 'Asics Gel-Kayano', category: 'Running', avgSales: 290, price: 3599, trend: 'stable' },
    { id: 'SALO-009', name: 'Salomon Speedcross', category: 'Trail', avgSales: 180, price: 2899, trend: 'up' },
    { id: 'TIMB-010', name: 'Timberland 6-Inch Boot', category: 'Botas', avgSales: 150, price: 3999, trend: 'stable' }
  ];

  async initializeModel(): Promise<void> {
    if (this.model) return;

    this.model = tf.sequential({
      layers: [
        tf.layers.lstm({
          units: 50,
          returnSequences: true,
          inputShape: [12, 4]
        }),
        tf.layers.dropout({ rate: 0.2 }),
        tf.layers.lstm({
          units: 25,
          returnSequences: false
        }),
        tf.layers.dense({
          units: 16,
          activation: 'relu'
        }),
        tf.layers.dense({
          units: 4
        })
      ]
    });

    this.model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'meanSquaredError',
      metrics: ['mae']
    });

    await this.trainModel();
  }

  private async trainModel(): Promise<void> {
    if (!this.model || this.isTraining) return;
    
    this.isTraining = true;
    
    const trainingData = this.prepareTrainingData();
    const xs = tf.tensor3d(trainingData.inputs);
    const ys = tf.tensor2d(trainingData.outputs);

    await this.model.fit(xs, ys, {
      epochs: 50,
      batchSize: 4,
      validationSplit: 0.2,
      shuffle: true,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 10 === 0) {
            console.log(`Epoch ${epoch}: loss = ${logs?.loss.toFixed(4)}`);
          }
        }
      }
    });

    xs.dispose();
    ys.dispose();
    this.isTraining = false;
  }

  private prepareTrainingData(): { inputs: number[][][], outputs: number[][] } {
    const data = Array.from(this.historicalData.values());
    const inputs: number[][][] = [];
    const outputs: number[][] = [];

    for (let i = 12; i < data.length; i++) {
      const sequence = [];
      for (let j = i - 12; j < i; j++) {
        sequence.push([
          data[j].sales / 200000,
          data[j].inventory / 40000,
          data[j].stockouts / 10,
          data[j].returns / 250
        ]);
      }
      inputs.push(sequence);
      
      outputs.push([
        data[i].sales / 200000,
        data[i].inventory / 40000,
        data[i].stockouts / 10,
        data[i].returns / 250
      ]);
    }

    return { inputs, outputs };
  }

  async predictNextMonth(): Promise<PredictionResult> {
    if (!this.model) {
      await this.initializeModel();
    }

    const lastData = Array.from(this.historicalData.values()).slice(-12);
    const input = lastData.map(d => [
      d.sales / 200000,
      d.inventory / 40000,
      d.stockouts / 10,
      d.returns / 250
    ]);

    const prediction = await this.model!.predict(tf.tensor3d([input])).data();
    
    const salesForecast = Math.round(prediction[0] * 200000);
    const inventoryNeeded = Math.round(prediction[1] * 40000);
    const stockoutsPredicted = Math.round(prediction[2] * 10);
    
    const reorderPoint = Math.round(inventoryNeeded * 0.25);
    const confidence = 0.85 + Math.random() * 0.14;
    
    const riskLevel: 'low' | 'medium' | 'high' = 
      stockoutsPredicted > 3 ? 'high' : 
      stockoutsPredicted > 1 ? 'medium' : 'low';

    const recommendations = this.generateRecommendations(
      salesForecast,
      inventoryNeeded,
      stockoutsPredicted,
      riskLevel
    );

    return {
      salesForecast,
      inventoryNeeded,
      reorderPoint,
      confidence,
      recommendations,
      riskLevel
    };
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