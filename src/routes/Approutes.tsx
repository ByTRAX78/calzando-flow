import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Index = lazy(() => import("@/pages/Index"));

const StoreLayout = lazy(() => import("@/layouts/StoreLayout"));
const CedisLayout = lazy(() => import("@/layouts/CedisLayout"));
const HandheldLayout = lazy(() => import("@/layouts/HandheldLayout"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Index />} />
        
        <Route path="/tienda/*" element={<StoreLayout />} />
        
        <Route path="/cedis/*" element={<CedisLayout />} />
        
        <Route path="/handheld/*" element={<HandheldLayout />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;