import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0tupxlj8",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: false, // Disable CDN to get real-time updates
  perspective: "published", // Get published content
});