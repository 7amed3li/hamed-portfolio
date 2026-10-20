import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  title?: string
}

export function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-md border border-border bg-surface-2 max-w-full min-w-0">
      {title && (
        <div className="border-b border-border bg-surface-3 px-4 py-2 text-xs font-mono text-muted-foreground">
          {title}
        </div>
      )}
      <div tabIndex={0} className="p-4 overflow-x-auto text-sm max-w-full focus:outline-none focus:ring-1 focus:ring-accent">
        {children}
      </div>
    </div>
  )
}
