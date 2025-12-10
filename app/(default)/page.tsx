export const metadata = {
  title: "Youssef Ennaciri - Red Team Consultant",
  description: "Personal portfolio of Youssef Ennaciri - Cyber Security Consultant specializing in Red Team Operations, Malware Development, and Penetration Testing.",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Testimonials />
      <Features />
      <Cta />
    </>
  );
}