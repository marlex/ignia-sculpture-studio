import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import PerfilEscultor from "./pages/PerfilEscultor.tsx";
import PerfilColeccionista from "./pages/PerfilColeccionista.tsx";
import ColeccionPage from "./pages/Coleccion.tsx";
import EscultoresPage from "./pages/Escultores.tsx";
import AprendePage from "./pages/Aprende.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import IgniaGalleryPage from "./pages/IgniaGallery.tsx";
import ObraDetalle from "./pages/ObraDetalle.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil/escultor" element={<PerfilEscultor />} />
          <Route path="/perfil/escultor/:slug" element={<PerfilEscultor />} />
          <Route path="/perfil/coleccionista" element={<PerfilColeccionista />} />
          <Route path="/coleccion" element={<ColeccionPage />} />
          <Route path="/escultores" element={<EscultoresPage />} />
          <Route path="/aprende" element={<AprendePage />} />
          <Route path="/editorial" element={<EditorialPage />} />
          <Route path="/ignia-gallery" element={<IgniaGalleryPage />} />
          <Route path="/obra/:slug" element={<ObraDetalle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
