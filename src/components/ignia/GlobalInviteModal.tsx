import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InviteModal } from "@/components/ignia/home/InviteModal";

export const GlobalInviteModal = () => {
  const [open, setOpen] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState<"collector" | "artist" | undefined>(undefined);
  const [variant, setVariant] = useState<"default" | "partners">("default");
  const location = useLocation();

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ defaultProfile?: "collector" | "artist"; variant?: "default" | "partners" }>).detail;
      const v = detail?.variant ?? "default";
      // These join pages have their own application modal; keep it untouched (except Partnerships).
      const PAGES_WITH_OWN_MODAL = ["/join/escultores", "/join/coleccionistas"];
      if (v !== "partners" && PAGES_WITH_OWN_MODAL.some((p) => location.pathname.startsWith(p))) return;
      setDefaultProfile(detail?.defaultProfile);
      setVariant(v);
      setOpen(true);
    };
    window.addEventListener("ignia:open-invite", handleOpen);
    return () => window.removeEventListener("ignia:open-invite", handleOpen);
  }, [location.pathname]);

  return <InviteModal open={open} onClose={() => setOpen(false)} defaultProfile={defaultProfile} variant={variant} />;
};
