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
  // Custom styling for standard Markdown elements
  h1: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={`mt-2 scroll-m-20 text-2xl sm:text-4xl font-bold tracking-tight ${className}`} {...props} />
  ),
  h2: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={`mt-10 scroll-m-20 border-b border-border pb-2 text-xl sm:text-3xl font-bold tracking-tight text-foreground first:mt-0 ${className}`} {...props} />
  ),
  h3: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={`mt-8 scroll-m-20 text-lg sm:text-2xl font-bold tracking-tight text-foreground ${className}`} {...props} />
  ),
  a: ({ className = '', ...props }: React.HTMLAttributes<HTMLAnchorElement>) => {
    const isHeadingAnchor = className.includes('subheading-anchor')
    return (
      <a
        className={
          isHeadingAnchor
            ? `text-foreground no-underline hover:text-foreground font-bold ${className}`
            : `font-medium text-accent underline underline-offset-4 hover:text-accent/80 ${className}`
        }
        {...props}
      />
    )
  },
  p: ({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`} {...props} />
  ),
  ul: ({ className = '', ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={`my-6 ms-6 list-disc [&>li]:mt-2 ${className}`} {...props} />
  ),
  ol: ({ className = '', ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={`my-6 ms-6 list-decimal [&>li]:mt-2 ${className}`} {...props} />
  ),
  blockquote: ({ className = '', ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={`mt-6 border-s-2 border-accent ps-5 sm:ps-6 italic text-muted-foreground ${className}`} {...props} />
  ),
  table: ({ className = '', ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border bg-surface/60">
      <table className={`min-w-[540px] sm:min-w-full w-full text-xs sm:text-sm text-start border-collapse ${className}`} {...props} />
    </div>
  ),
  thead: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={`bg-surface-2 border-b border-border ${className}`} {...props} />
  ),
  tbody: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={className} {...props} />
  ),
  tr: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={`border-b border-border/60 last:border-b-0 ${className}`} {...props} />
  ),
  th: ({ className = '', ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className={`px-3 py-2.5 sm:px-4 sm:py-3 font-mono text-xs uppercase tracking-wider text-foreground whitespace-nowrap text-start ${className}`} {...props} />
  ),
  td: ({ className = '', ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={`px-3 py-2.5 sm:px-4 sm:py-3 border-t border-border/60 text-muted-foreground align-top min-w-[120px] sm:min-w-0 first:font-medium first:text-foreground ${className}`} {...props} />
  ),
  pre: ({ className = '', ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      tabIndex={0}
      className={`overflow-x-auto max-w-full my-6 rounded-lg p-4 font-mono text-sm leading-relaxed border border-border bg-surface-2 focus:outline-none focus:ring-1 focus:ring-accent ${className}`}
      {...props}
    />
  ),
  code: ({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={`font-mono text-sm ${className}`} {...props} />
  ),
  img: ({ className = '', alt = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`rounded-xl border border-border shadow-lg my-8 max-w-full h-auto mx-auto ${className}`}
      alt={alt}
      loading="lazy"
      {...props}
    />
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
