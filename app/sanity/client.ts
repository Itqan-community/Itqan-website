import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "0tupxlj8",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: true, // Enable CDN for better performance and reliability
  perspective: "published", // Ensure we get published content
});