import Link from 'next/link'
import { t } from '@/lib/translations'

export function CTA({ lang }: { lang: 'en' | 'ar' | 'tr' }) {
  const tr = t[lang].hero
  
  return (
    <div className="my-12 rounded-xl border border-accent/20 bg-accent/5 p-8 text-center">
      <h3 className="mb-4 text-2xl font-bold">Need help with your backend?</h3>
      <p className="mb-8 text-muted-foreground">
        I build and optimize full-stack apps with Node.js, React, and PostgreSQL. 
        If you have a slow API or need a robust architecture, let&apos;s talk.
      </p>
      <div className="flex justify-center gap-4">
        <Link 
          href={`/${lang}#contact`}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
        >
          {tr.cta_contact}
        </Link>
      </div>
    </div>
  )
}
