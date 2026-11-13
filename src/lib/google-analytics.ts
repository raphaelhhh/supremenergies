import { permitsTracking } from "./tracking-permission";

// The current published GTM container only injects a second consent platform,
// not GA4. Do not load it alongside the site's own consent manager.
export async function trackAnalyticsEvent(event: string, data: Record<string, unknown> = {}) {
  if (!(await permitsTracking("analytics"))) return;
  window.dataLayer = window.dataLayer || [];
  // Never include income, contact details, postal codes or arbitrary form fields.
  window.dataLayer.push({ event, ...data, page_path: location.pathname });
}