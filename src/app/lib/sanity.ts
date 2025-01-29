import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { Image } from "@sanity/types";

// Create the Sanity client
export const client = createClient({
  projectId: "rlur3igs", // Replace with your project ID
  dataset: "production",
  apiVersion: "2025-01-18", // Replace with your API version
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Ensure this token is set in .env.local
  useCdn: false, // Set to true for cached data, false for real-time
});

// Build image URLs
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: Image) {
  return builder.image(source);
}
