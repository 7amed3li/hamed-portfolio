import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/DragonSploit";
import { EngineeringPrinciples } from "@/components/sections/EngineeringPrinciples";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/QRProject";
import { Stack } from "@/components/sections/NodeSecure";
import { Blog } from "@/components/sections/Blog";
import { Contact } from "@/components/sections/Contact";
import { StatusWidget } from "@/components/ui/StatusWidget";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'ar' | 'tr' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  // Get max 3 featured posts for the home page
  const posts = getFeaturedPosts(lang).slice(0, 3);

  return (
    <SmoothScrollProvider>
      <CustomCursor />
      <main className="min-h-screen cursor-none">
        <Nav />
        <Hero />
        <About />
        <EngineeringPrinciples />
        <Experience />
        <Projects />
        <Stack />
        <Blog initialPosts={posts} lang={lang} />
        <Contact />
        <StatusWidget />
      </main>
    </SmoothScrollProvider>
  );
}
