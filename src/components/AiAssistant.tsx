import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Sparkles, Bot, User, BrainCircuit, FileText } from 'lucide-react'

interface Message {
  sender: 'user' | 'bot'
  text: string
  loading?: boolean
}

export const AiAssistant = () => {
  const [summary, setSummary] = React.useState('')
  const [isSummaryLoading, setIsSummaryLoading] = React.useState(false)
  
  const [messages, setMessages] = React.useState<Message[]>([
    { sender: 'bot', text: 'Hola, soy el asistente de IA. ¿En qué puedo ayudarte hoy?' }
  ])
  const [input, setInput] = React.useState('')
  const [isBotLoading, setIsBotLoading] = React.useState(false)
  
  const [report, setReport] = React.useState('')
  const [isReportLoading, setIsReportLoading] = React.useState(false)

  const handleGenerateSummary = () => {
    setIsSummaryLoading(true)
    setSummary('')
    setTimeout(() => {
      setSummary(
        'Basado en los KPIs, la rentabilidad ha aumentado un 2.3%, lo cual es positivo. Sin embargo, la Venta Perdida ($12.4K) sigue siendo un punto crítico, posiblemente vinculado a la Exactitud de Inventario (96.8%), que aunque alta, genera discrepancias. Recomiendo auditar las categorías con mayor venta perdida.'
      )
      setIsSummaryLoading(false)
    }, 1500)
  }

  const getBotResponse = (question: string): string => {
    const q = question.toLowerCase()
    if (q.includes('stock') || q.includes('inventario')) {
      return 'El producto "Bota Industrial" (SKU12349) tiene bajo stock (8 unidades) y está por debajo de su punto de reorden (10). Recomiendo generar una tarea de resurtido urgente.'
    }
    if (q.includes('vende') || q.includes('vendido')) {
      return 'El SKU más vendido esta semana es "Zapato Casual Hombre" (SKU12345), con 78 unidades vendidas, seguido por "Zapato Deportivo Mujer" (SKU12346) con 65 unidades.'
    }
    if (q.includes('preocupante') || q.includes('riesgo')) {
      return 'El indicador más preocupante es la Venta Perdida ($12.4K). Esto sugiere que la demanda no se está cubriendo, probablemente por quiebres de stock en piso de venta o discrepancias de inventario (EIR 96.8%).'
    }
    return 'No tengo información sobre eso en este momento, pero puedo analizar los KPIs de ventas, inventario y operaciones.'
  }

  const handleAskQuestion = (question: string) => {
    if (!question.trim() || isBotLoading) return
    
    const userMessage: Message = { sender: 'user', text: question }
    setMessages(prev => [...prev, userMessage, { sender: 'bot', text: '', loading: true }])
    setInput('')
    setIsBotLoading(true)
    
    setTimeout(() => {
      const botResponse = getBotResponse(question)
      setMessages(prev => {
        const newMessages = [...prev]
        newMessages[newMessages.length - 1] = { sender: 'bot', text: botResponse }
        return newMessages
      })
      setIsBotLoading(false)
    }, 2000)
  }

  const handleGenerateReport = () => {
    setIsReportLoading(true)
    setReport('')
    setTimeout(() => {
      setReport(
        'Reporte Semanal (Simulado):\n\n1. Resumen Ejecutivo: Las ventas aumentaron un 5.2% vs. la semana anterior. La tasa de conversión mejoró en un 1.5%.\n2. Foco de Atención: La Venta Perdida se concentra en "Calzado Industrial" (45%) y "Calzado Mujer" (30%).\n3. Eficiencia Operativa: El tiempo "Andén a Ubicación" se mantiene estable en 2.3h.\n4. Acción Recomendada: Iniciar conteo cíclico en la categoría "Calzado Industrial" para corregir EIR.'
      )
      setIsReportLoading(false)
    }, 2000)
  }

  return (
    <Card className="shadow-soft md:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-store" />
          Asistente de IA (SGT)
        </CardTitle>
        <CardDescription>
          Analiza, resume y genera reportes de la operación de la tienda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ask">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="ask">
              <BrainCircuit className="h-4 w-4 mr-2" />
              Preguntar
            </TabsTrigger>
            <TabsTrigger value="summary">
              <FileText className="h-4 w-4 mr-2" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ask" className="mt-4">
            <div className="flex flex-col h-[400px]">
              <ScrollArea className="flex-1 p-4 border rounded-md bg-muted/30">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-store text-store-foreground flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card'
                        }`}
                      >
                        {msg.loading ? (
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ) : (
                          <p className="text-sm">{msg.text}</p>
                        )}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-4 flex gap-2">
                <Textarea
                  placeholder="Pregunta sobre inventario, ventas o riesgos..."
                  className="flex-1 resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAskQuestion(input);
                    }
                  }}
                />
                <Button 
                  onClick={() => handleAskQuestion(input)} 
                  disabled={isBotLoading}
                  className="h-auto"
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleAskQuestion('¿Qué productos tienen bajo stock?')}
                >
                  ¿Qué productos tienen bajo stock?
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAskQuestion('¿Cuál es el SKU más vendido esta semana?')}
                >
                  ¿SKU más vendido?
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleAskQuestion('¿Cuál es el indicador más preocupante?')}
                >
                  ¿Indicador más preocupante?
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="mt-4">
            <Button onClick={handleGenerateSummary} disabled={isSummaryLoading}>
              {isSummaryLoading ? 'Analizando...' : 'Generar Resumen de KPIs'}
            </Button>
            <Card className="mt-4 bg-muted/30">
              <CardContent className="p-4">
                {isSummaryLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ) : (
                  <p className="text-sm">
                    {summary || 'Presiona "Generar Resumen" para obtener un análisis de IA de los KPIs actuales.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-4">
            <Button onClick={handleGenerateReport} disabled={isReportLoading}>
              {isReportLoading ? 'Generando...' : 'Generar Reporte Semanal'}
            </Button>
            <Card className="mt-4 bg-muted/30">
              <CardContent className="p-4">
                {isReportLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : (
                  <pre className="text-sm whitespace-pre-wrap font-sans">
                    {report || 'Presiona "Generar Reporte" para obtener un informe simulado.'}
                  </pre>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}