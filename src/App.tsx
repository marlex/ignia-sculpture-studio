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
import AprendeArticuloPage from "./pages/AprendeArticulo.tsx";
import EditorialPage from "./pages/Editorial.tsx";
import EditorialArticuloPage from "./pages/EditorialArticulo.tsx";
import IgniaGalleryPage from "./pages/IgniaGallery.tsx";
import ObraDetalle from "./pages/ObraDetalle.tsx";
import Publicar from "./pages/Publicar.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import AddView3d from "./pages/AddView3d.tsx";
import ObraAnalytics from "./pages/ObraAnalytics.tsx";
import Legal from "./pages/Legal.tsx";
import JoinEscultores from "./pages/JoinEscultores.tsx";
import JoinColeccionistas from "./pages/JoinColeccionistas.tsx";
import JoinGalerias from "./pages/JoinGalerias.tsx";
import JoinAdvisors from "./pages/JoinAdvisors.tsx";
import UneteAIgnia from "./pages/UneteAIgnia.tsx";
import RecuperarPassword from "./pages/RecuperarPassword.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Unsubscribe from "./pages/Unsubscribe.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminOverview from "./pages/admin/Overview.tsx";
import AdminSolicitudes from "./pages/admin/Solicitudes.tsx";
import AdminArtistas from "./pages/admin/Artistas.tsx";
import AdminObras from "./pages/admin/Obras.tsx";
import AdminMetricas from "./pages/admin/Metricas.tsx";
import { GlobalInviteModal } from "@/components/ignia/GlobalInviteModal";
import { ScrollToTop } from "@/components/ignia/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
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
              <Route path="/aprende/:slug" element={<AprendeArticuloPage />} />
              <Route path="/editorial" element={<EditorialPage />} />
              <Route path="/editorial/:slug" element={<EditorialArticuloPage />} />
              <Route path="/ignia-gallery" element={<IgniaGalleryPage />} />
              <Route path="/obra/:slug" element={<ObraDetalle />} />
              <Route path="/analiticas/:slug/:obraSlug" element={<ObraAnalytics />} />
              <Route path="/legal/:slug" element={<Legal />} />
              <Route path="/join/escultores" element={<JoinEscultores />} />
              <Route path="/join/sculptors" element={<JoinEscultores />} />
              <Route path="/join/coleccionistas" element={<JoinColeccionistas />} />
              <Route path="/join/collectors" element={<JoinColeccionistas />} />
              <Route path="/join/galerias" element={<JoinGalerias />} />
              <Route path="/join/galleries" element={<JoinGalerias />} />
              <Route path="/join/curadores" element={<JoinCuradores />} />
              <Route path="/join/curators" element={<JoinCuradores />} />
              <Route path="/unete-a-ignia" element={<UneteAIgnia />} />
              <Route path="/recuperar-password" element={<RecuperarPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="solicitudes" element={<AdminSolicitudes />} />
                <Route path="artistas" element={<AdminArtistas />} />
                <Route path="obras" element={<AdminObras />} />
                <Route path="metricas" element={<AdminMetricas />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <GlobalInviteModal />
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
