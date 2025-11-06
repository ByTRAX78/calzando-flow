import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import TiendaLayout from '@/layouts/TiendaLayout';
import CedisLayout from '@/layouts/CedisLayout';
// --- AÑADE ESTA LÍNEA ---
import HandheldLayout from '@/layouts/HandheldLayout'; 

export function Approutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Rutas de la Tienda (POS, Inventario) */}
      <Route path="/tienda/*" element={<TiendaLayout />} />
      
      {/* Rutas del CEDIS */}
      <Route path="/cedis/*" element={<CedisLayout />} />

      {/* --- AÑADE ESTE BLOQUE --- */}
      {/* Rutas del Handheld (Móvil) */}
      <Route path="/handheld/*" element={<HandheldLayout />} />
      {/* --- FIN DEL BLOQUE --- */}

      {/* Ruta 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}