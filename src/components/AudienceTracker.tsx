import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { listenAudience, recordAudience } from "@/lib/audience";

export default function AudienceTracker() {
  const { pathname } = useLocation();
  useEffect(() => listenAudience(), []);
  useEffect(() => { recordAudience("page_view"); }, [pathname]);
  return null;
}