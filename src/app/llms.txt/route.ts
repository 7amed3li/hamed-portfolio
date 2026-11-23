import { generateLlmsTxt } from "@/lib/llms-content";

export const dynamic = "force-static";

export async function GET() {
  const body = generateLlmsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
