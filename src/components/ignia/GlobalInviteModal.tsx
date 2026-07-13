import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { InviteModal } from "@/components/ignia/home/InviteModal";

export const GlobalInviteModal = () => {
  const [open, setOpen] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState<"collector" | "artist" | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    const handleOpen = (e: Event) => {
      // Join pages have their own application modal; keep it untouched.
      if (location.pathname.startsWith("/join/")) return;
      const detail = (e as CustomEvent<{ defaultProfile?: "collector" | "artist" }>).detail;
      setDefaultProfile(detail?.defaultProfile);
      setOpen(true);
    };
    window.addEventListener("ignia:open-invite", handleOpen);
    return () => window.removeEventListener("ignia:open-invite", handleOpen);
  }, [location.pathname]);

  return <InviteModal open={open} onClose={() => setOpen(false)} defaultProfile={defaultProfile} />;
};
