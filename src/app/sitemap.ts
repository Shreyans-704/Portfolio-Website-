import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.shreyansjaiswal.me",
      lastModified: new Date(),
    },
  ];
}
