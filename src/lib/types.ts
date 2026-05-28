export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  forWho: string;
  whatIBuild: string[];
  technologies: string[];
  businessValue: string;
  proof: string;
  faq: { q: string; a: string }[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  year: string;
  tags: string[];
  heroStat: { value: string; label: string };
  problem: string;
  solution: string;
  technologies: string[];
  results: { metric: string; description: string }[];
  clientProof: string;
  cta: string;
};
