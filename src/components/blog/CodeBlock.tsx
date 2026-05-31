import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  title?: string
}

export function CodeBlock({ children, title }: CodeBlockProps) {
  return (
    <div className="my-6 overflow-hidden rounded-md border border-border bg-surface-2">
      {title && (
        <div className="border-b border-border bg-surface-3 px-4 py-2 text-xs font-mono text-muted-foreground">
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm">
        {children}
      </div>
    </div>
  )
}
