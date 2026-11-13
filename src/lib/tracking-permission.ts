import { canTrack, readChoice } from "./consent";

// The site owner requested basic blocking, including outside consent regions.
export async function permitsTracking(purpose: "analytics" | "advertising") {
  return readChoice(purpose) === "granted" && await canTrack(purpose);
}