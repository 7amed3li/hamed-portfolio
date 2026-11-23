import Link from 'next/link'
import { tactileButtonClasses } from '@/components/ui/TactilePrimitives'
 
export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-4xl md:text-6xl font-bold mb-4 font-mono accent-text">404</h2>
      <p className="text-xl text-muted-foreground mb-8 uppercase tracking-widest font-mono">Page Not Found</p>
      <Link href="/en" className={tactileButtonClasses("outline", "px-8 py-4 text-sm tracking-widest")}>
        Return Home
      </Link>
    </div>
  )
}
