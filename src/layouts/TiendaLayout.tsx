// src/layouts/TiendaLayout.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import StoreDashboard from "@/pages/store/Dashboard";
import StoreInventory from "@/pages/store/Inventory";
import StoreTasks from "@/pages/store/Task";
import StorePersonnel from "@/pages/store/Personnel";
import PosPage from "@/pages/POS";

const TiendaLayout = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<StoreDashboard />} />
      <Route path="inventory" element={<StoreInventory />} />
      <Route path="tasks" element={<StoreTasks />} />
      <Route path="personnel" element={<StorePersonnel />} />
      <Route path="pos" element={<PosPage />} />
    </Routes>
  );
};

export default TiendaLayout;