import { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  type?: 'default' | 'warning' | 'danger' | 'info'
}

export function Callout({ children, type = 'default' }: CalloutProps) {
  const getStyle = () => {
    switch (type) {
      case 'warning':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-200'
      case 'danger':
        return 'border-red-500/50 bg-red-500/10 text-red-200'
      case 'info':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-200'
      default:
        return 'border-border bg-surface-2 text-foreground'
    }
  }

  return (
    <div className={`my-6 flex items-start rounded-md border p-4 ${getStyle()}`}>
      <div className="w-full">{children}</div>
    </div>
  )
}
