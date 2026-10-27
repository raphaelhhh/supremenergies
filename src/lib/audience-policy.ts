export const AUDIENCE_EVENTS = ["page_view", "navigation_click", "quote_click", "phone_click", "email_click", "review_click", "form_submit"] as const;
export type AudienceEvent = typeof AUDIENCE_EVENTS[number];

export function canTrackAudience(choice: string | null): boolean {
  return choice === "granted";
}

/** Never send query strings, fragments, contact details or private route names. */
export function publicAudiencePath(path: string): string | null {
  const clean = path.split(/[?#]/)[0];
  if (!clean || !/^\/[a-z0-9/-]*$/.test(clean) || clean.length > 200) return null;
  if (/^\/(admin|auth|\.lovable)(\/|$)/.test(clean)) return null;
  return clean;
}

export function audienceClick(href: string): AudienceEvent | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("writereview") || href.includes("placeid=")) return "review_click";
  if (href.startsWith("/devis-gratuit")) return "quote_click";
  if (href.startsWith("/") && !href.startsWith("//")) return "navigation_click";
  return null;
}