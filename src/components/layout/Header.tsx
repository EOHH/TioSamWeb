'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { Button } from '@/components/ui/button'

export default function Header() {
  const totalItems = useCartStore((state) => state.totalItems())

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tighter text-primary">Ediciones Tio Sam</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium hidden md:flex">
            <Link href="/cards" className="transition-colors hover:text-foreground/80 text-foreground/60">Cards</Link>
            <Link href="/figures" className="transition-colors hover:text-foreground/80 text-foreground/60">Figures</Link>
            <Link href="/albums" className="transition-colors hover:text-foreground/80 text-foreground/60">Albums</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex w-full max-w-sm items-center space-x-2">
            {/* Search placeholder */}
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search anime collectibles..."
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
              />
            </div>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
