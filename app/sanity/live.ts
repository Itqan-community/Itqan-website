import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Add cache busting for production
  ...(process.env.NODE_ENV === 'production' && {
    // Force fresh data in production
    revalidate: 0,
  })
});