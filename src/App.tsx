// src/App.tsx
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/Index'
import NotFoundPage from './pages/NotFound'
import HandheldLayout from './layouts/HandheldLayout'
import TiendaLayout from './layouts/TiendaLayout'
import CedisLayout from './layouts/CedisLayout'
import PosPage from './pages/POS'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/tienda/*" element={<TiendaLayout />} />
      <Route path="/cedis/*" element={<CedisLayout />} />
      <Route path="/handheld/*" element={<HandheldLayout />} />
      <Route path="/pos" element={<PosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App