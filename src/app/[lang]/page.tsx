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

export default function Home() {
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
        <Blog />
        <Contact />
        <StatusWidget />
      </main>
    </SmoothScrollProvider>
  );
}
