import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/"];

  return {
    rules: [
      // Traditional Search & Live AI Retrieval / Citation Crawlers
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "Claude-SearchBot",
          "Claude-User",
          "Applebot",
          "DuckAssistBot",
        ],
        allow: "/",
        disallow,
      },
      // AI Model Training Crawlers (intentionally allowed for public portfolio & entity discovery)
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Meta-ExternalAgent",
          "Amazonbot",
          "Bytespider",
          "cohere-ai",
          "Diffbot",
          "MistralBot",
          "DeepSeekBot",
        ],
        allow: "/",
        disallow,
      },
      // Fallback wildcard rule MUST come last
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
