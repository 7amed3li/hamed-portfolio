import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { getFeaturedPosts } from "@/lib/blog";

// Lazy load everything below the fold to achieve 100/100 Performance Score
const About = dynamic(() => import("@/components/sections/DragonSploit").then(mod => mod.About));
const EngineeringPrinciples = dynamic(() => import("@/components/sections/EngineeringPrinciples").then(mod => mod.EngineeringPrinciples));
const Experience = dynamic(() => import("@/components/sections/Experience").then(mod => mod.Experience));
const Projects = dynamic(() => import("@/components/sections/QRProject").then(mod => mod.Projects));
const Stack = dynamic(() => import("@/components/sections/NodeSecure").then(mod => mod.Stack));
const Blog = dynamic(() => import("@/components/sections/Blog").then(mod => mod.Blog));
const Contact = dynamic(() => import("@/components/sections/Contact").then(mod => mod.Contact));
const StatusWidget = dynamic(() => import("@/components/ui/StatusWidget").then(mod => mod.StatusWidget));

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
