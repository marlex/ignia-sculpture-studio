import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/auth/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import PerfilEscultor from "./pages/PerfilEscultor.tsx";
import PerfilColeccionista from "./pages/PerfilColeccionista.tsx";
import ColeccionistaPublico from "./pages/ColeccionistaPublico.tsx";
import ColeccionPage from "./pages/Coleccion.tsx";
import EscultoresPage from "./pages/Escultores.tsx";
import AprendePage from "./pages/Aprende.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import IgniaGalleryPage from "./pages/IgniaGallery.tsx";
import ObraDetalle from "./pages/ObraDetalle.tsx";
import Publicar from "./pages/Publicar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AddView3d from "./pages/AddView3d.tsx";
import ObraAnalytics from "./pages/ObraAnalytics.tsx";
import Legal from "./pages/Legal.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/publicar" element={<Publicar />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:section" element={<Dashboard />} />
              <Route path="/dashboard/obras/:id/3d" element={<AddView3d />} />
              <Route path="/perfil/escultor" element={<PerfilEscultor />} />
              <Route path="/perfil/escultor/:slug" element={<PerfilEscultor />} />
              <Route path="/perfil/coleccionista" element={<PerfilColeccionista />} />
              <Route path="/coleccionista/:slug" element={<ColeccionistaPublico />} />
              <Route path="/coleccion" element={<ColeccionPage />} />
              <Route path="/escultores" element={<EscultoresPage />} />
              <Route path="/aprende" element={<AprendePage />} />
              <Route path="/editorial" element={<EditorialPage />} />
              <Route path="/ignia-gallery" element={<IgniaGalleryPage />} />
              <Route path="/obra/:slug" element={<ObraDetalle />} />
              <Route path="/analiticas/:slug/:obraSlug" element={<ObraAnalytics />} />
              <Route path="/legal/:slug" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
