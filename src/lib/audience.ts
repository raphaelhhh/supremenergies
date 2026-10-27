import { supabase } from "@/integrations/supabase/client";
import { audienceClick, canTrackAudience, publicAudiencePath, type AudienceEvent } from "./audience-policy";
import { STORAGE_KEY } from "./consent";

type Event = { page_path: string; event: AudienceEvent };
let queue: Event[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;

export function recordAudience(event: AudienceEvent) {
  if (!canTrackAudience(localStorage.getItem(STORAGE_KEY))) return;
  const page_path = publicAudiencePath(location.pathname);
  if (!page_path) return;
  queue.push({ page_path, event });
  if (queue.length >= 20) void flushAudience();
  else if (!timer) timer = setTimeout(() => void flushAudience(), 10000);
}

async function flushAudience() {
  clearTimeout(timer);
  timer = undefined;
  if (!canTrackAudience(localStorage.getItem(STORAGE_KEY))) { queue = []; return; }
  const events = queue.splice(0, 20);
  if (!events.length) return;
  const { error } = await supabase.functions.invoke("track-site-audience", { body: { consent: true, events } });
  if (error) console.warn("Audience totals could not be saved");
}

export function listenAudience() {
  const click = (e: MouseEvent) => {
    if (!(e.target instanceof Element)) return;
    const link = e.target.closest("a");
    const event = audienceClick(link?.getAttribute("href") ?? "");
    if (event) recordAudience(event);
    else if (e.target.closest('[data-audience-event="review_click"]')) recordAudience("review_click");
  };
  const consent = () => {
    if (canTrackAudience(localStorage.getItem(STORAGE_KEY))) recordAudience("page_view");
    else { queue = []; clearTimeout(timer); timer = undefined; }
  };
  const hidden = () => { if (document.visibilityState === "hidden") void flushAudience(); };
  document.addEventListener("click", click);
  document.addEventListener("visibilitychange", hidden);
  window.addEventListener("site-consent-change", consent);
  return () => {
    document.removeEventListener("click", click);
    document.removeEventListener("visibilitychange", hidden);
    window.removeEventListener("site-consent-change", consent);
  };
}