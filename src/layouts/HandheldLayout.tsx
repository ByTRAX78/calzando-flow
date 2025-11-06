// src/layouts/HandheldLayout.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import HandheldDashboard from "@/pages/handheld/Dashboard";
// Importando las nuevas páginas de módulos
import HandheldReceipt from "@/pages/handheld/Receipt";
import HandheldPutaway from "@/pages/handheld/Putaway";
import HandheldResupply from "@/pages/handheld/Resupply";
import HandheldInventory from "@/pages/handheld/Inventory";
import HandheldWaste from "@/pages/handheld/Waste";
import HandheldLegacy from "@/pages/Handheld"; // Página de demo original

const HandheldLayout = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<HandheldDashboard />} />
      
      {/* Rutas para los 5 módulos operativos del PDF */}
      <Route path="receipt" element={<HandheldReceipt />} />
      <Route path="putaway" element={<HandheldPutaway />} />
      <Route path="resupply" element={<HandheldResupply />} />
      <Route path="inventory" element={<HandheldInventory />} />
      <Route path="waste" element={<HandheldWaste />} />

      {/* Ruta para la página de demo original */}
      <Route path="demo" element={<HandheldLegacy />} /> 
    </Routes>
  );
};

export default HandheldLayout;