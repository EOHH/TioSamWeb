'use client'

import Link from 'next/link'
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { useStore } from '@/hooks/useStore'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { CartDrawer } from '@/features/cart/components/CartDrawer'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'Cartas', href: '/cards' },
  { name: 'Figuras', href: '/figures' },
  { name: 'Álbumes', href: '/albums' },
]

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  
  const pathname = usePathname()
  
  // Safely get totalItems handling hydration
  const totalItems = useStore(useCartStore, (state) => state.totalItems())
  
  // Animation state for cart badge bounce
  const [shouldBounce, setShouldBounce] = useState(false)
  const [prevTotal, setPrevTotal] = useState(totalItems)

  useEffect(() => {
    if (totalItems !== undefined && prevTotal !== undefined && totalItems > prevTotal) {
      setShouldBounce(true)
      const timer = setTimeout(() => setShouldBounce(false), 1000)
      return () => clearTimeout(timer)
    }
    setPrevTotal(totalItems)
  }, [totalItems, prevTotal])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black/60 backdrop-blur-md border-b border-white/10 transition-colors duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2 z-50">
              <span className="font-bold text-xl tracking-tighter text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                Tio Sam
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 ml-4" onMouseLeave={() => setHoveredPath(null)}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                const isHovered = hoveredPath === link.href
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors rounded-md"
                    onMouseEnter={() => setHoveredPath(link.href)}
                  >
                    <span className={cn(
                      "relative z-10 transition-colors duration-200",
                      isActive || isHovered ? "text-white" : "text-white/60"
                    )}>
                      {link.name}
                    </span>
                    
                    {/* Glowing underline via framer-motion */}
                    {isHovered && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_12px_2px] shadow-primary/60"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                      />
                    )}
                    
                    {/* Static active indicator */}
                    {isActive && !isHovered && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/40" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:flex w-full max-w-xs items-center relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors" />
              <input
                type="search"
                placeholder="Buscar artículos..."
                className="flex h-9 w-full rounded-full border border-white/10 bg-white/5 px-4 py-1 pl-10 text-sm text-white placeholder:text-white/40 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-black/40"
              />
            </div>
            
            <nav className="flex items-center gap-1 z-50">
              <Button variant="ghost" size="icon" asChild className="text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                <AnimatePresence>
                  {totalItems !== undefined && totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className={cn(
                        "absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg shadow-primary/40",
                        shouldBounce && "animate-bounce"
                      )}
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="sr-only">Carrito</span>
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white/70 hover:text-white hover:bg-white/10 rounded-full ml-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 top-[64px] z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 flex flex-col md:hidden"
          >
            <div className="flex flex-col p-6 space-y-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="search"
                  placeholder="Buscar artículos..."
                  className="flex h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 pl-11 text-base text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center text-2xl font-medium py-3 px-4 rounded-xl transition-all",
                          isActive 
                            ? "bg-primary/20 text-white shadow-[inset_0_0_10px_rgba(var(--primary),0.2)] border border-primary/20" 
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
