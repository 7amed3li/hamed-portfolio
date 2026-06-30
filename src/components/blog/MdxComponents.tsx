import Image from 'next/image'
import * as runtime from 'react/jsx-runtime'
import { useMemo } from 'react'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { CTA } from './CTA'

const getMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

const components = {
  Image,
  Callout,
  CodeBlock,
  // CTA is injected in MDXContent to receive the lang prop
  // Add custom styling for standard Markdown elements
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 scroll-m-20 border-b border-border pb-1 text-3xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-accent underline underline-offset-4 hover:text-accent/80" {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-6 italic text-muted-foreground" {...props} />
  ),
}

interface MDXProps {
  code: string;
  lang?: 'en' | 'ar' | 'tr';
}

export function MDXContent({ code, lang = 'en' }: MDXProps) {
  const Component = useMemo(() => getMDXComponent(code), [code])
  
  // Memoize the components map, including the dynamically wrapped CTA component
  const mdxComponents = useMemo(() => {
    const CustomCTA = (props: Record<string, unknown>) => <CTA lang={lang} {...props} />;
    
    return {
      ...components,
      CTA: CustomCTA
    };
  }, [lang]);
  
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={mdxComponents} />
}
