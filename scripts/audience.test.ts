import { describe, expect, test } from "bun:test";
import { audienceClick, canTrackAudience, publicAudiencePath } from "../src/lib/audience-policy";

describe("Anonymous audience", () => {
  test("requires explicit consent", () => {
    expect(canTrackAudience(null)).toBe(false);
    expect(canTrackAudience("denied")).toBe(false);
    expect(canTrackAudience("granted")).toBe(true);
  });
  test("does not expose URL contact data or private pages", () => {
    expect(publicAudiencePath("/contact?email=person@example.com#phone")).toBe("/contact");
    expect(publicAudiencePath("/admin/leads")).toBeNull();
    expect(publicAudiencePath("/auth")).toBeNull();
  });
  test("counts quote, phone, email and review clicks separately", () => {
    expect(audienceClick("/devis-gratuit")).toBe("quote_click");
    expect(audienceClick("tel:0186046889")).toBe("phone_click");
    expect(audienceClick("mailto:contact@example.com")).toBe("email_click");
    expect(audienceClick("https://search.google.com/local/writereview?placeid=x")).toBe("review_click");
  });
});