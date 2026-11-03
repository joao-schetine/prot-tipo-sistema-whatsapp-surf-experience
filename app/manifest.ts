import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Surf Experience CRM",
    short_name: "Surf CRM",
    start_url: "/",
    display: "standalone",
    background_color: "#0E2A3A",
    theme_color: "#0E2A3A",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
