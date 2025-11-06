// src/layouts/CedisLayout.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import CEDISDashboard from "@/pages/cedis/Dashboard";
import CEDISShipments from "@/pages/cedis/Shipments";
import CEDISAppointments from "@/pages/cedis/Appointments";

const CedisLayout = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<CEDISDashboard />} />
      <Route path="shipments" element={<CEDISShipments />} />
      <Route path="appointments" element={<CEDISAppointments />} />
    </Routes>
  );
};

export default CedisLayout;