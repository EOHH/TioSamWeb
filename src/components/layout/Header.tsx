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
import { usePathname, useSearchParams } from 'next/navigation'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Colecciones', href: '/collections' },
  { name: 'Cartas', href: '/cartas' },
  { name: 'Álbumes', href: '/albumes' },
  { name: 'Sobres', href: '/products?category=sobres' },
  { name: 'Ofertas', href: '/offers' },
  { name: 'Novedades', href: '/new' },
]

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Create a string representing current path with query to check active states
  const currentPathWithQuery = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
  
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
  }, [pathname, searchParams])

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
      <header className="sticky top-0 z-50 w-full bg-[#050505]/95 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
        <div className="max-w-[1920px] mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12">
          
          <div className="flex items-center">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 z-50 group">
              <div className="w-10 h-10 bg-[#7c3aed] flex items-center justify-center transition-transform group-hover:scale-105" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <span className="text-white font-black text-lg">TS</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[9px] font-bold text-white tracking-widest">EDICIONES</span>
                <span className="text-xl font-black text-white tracking-wide">TIO SAM</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-start items-center ml-12">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link) => {
                // Determine if link is active
                let isActive = false;
                if (link.href === '/') {
                  isActive = pathname === '/' && !searchParams.get('category');
                } else if (link.href.includes('?')) {
                  isActive = currentPathWithQuery === link.href;
                } else {
                  isActive = pathname.startsWith(link.href);
                }
                
                return (
                  <li key={link.name} className="relative group px-1">
                    <Link
                      href={link.href}
                      className={cn(
                        "relative flex items-center py-2 px-4 text-[13px] font-bold tracking-wide transition-all duration-300 rounded-full",
                        isActive 
                          ? "text-white bg-white/5" 
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                      {/* Premium Active Line with Glow just below text */}
                      {isActive && (
                        <motion.div
                          layoutId="active-nav-indicator"
                          className="absolute -bottom-1 left-4 right-4 h-[2px] bg-[#8b5cf6] rounded-full shadow-[0_0_10px_2px_rgba(139,92,246,0.6)]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          <div className="flex items-center justify-end space-x-2 md:space-x-4">
            <nav className="flex items-center gap-1 z-50">
              {/* Search Icon */}
              <Button variant="ghost" size="icon" className="hidden sm:flex text-gray-300 hover:text-white hover:bg-white/5 rounded-full">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
              
              {/* User Icon */}
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex text-gray-300 hover:text-white hover:bg-white/5 rounded-full">
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Cuenta</span>
                </Link>
              </Button>
              
              {/* Cart Icon */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-gray-300 hover:text-white hover:bg-white/5 rounded-full"
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
                        "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8b5cf6] text-[10px] font-bold text-white shadow-lg shadow-purple-900/40",
                        shouldBounce && "animate-bounce"
                      )}
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="sr-only">Carrito</span>
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-gray-300 hover:text-white hover:bg-white/5 rounded-full ml-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
            className="fixed inset-0 top-[80px] z-40 bg-[#050505]/98 backdrop-blur-xl border-t border-white/5 flex flex-col lg:hidden"
          >
            <div className="flex flex-col p-6 space-y-8 overflow-y-auto h-full">
              {/* Mobile Search */}
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Buscar artículos..."
                  className="flex h-14 w-full rounded-2xl border border-white/10 bg-[#111] px-4 py-2 pl-12 text-base text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6] transition-all"
                />
              </div>
              
              <nav className="flex flex-col space-y-2">
                {navLinks.map((link, i) => {
                  let isActive = false;
                  if (link.href === '/') {
                    isActive = pathname === '/' && !searchParams.get('category');
                  } else if (link.href.includes('?')) {
                    isActive = currentPathWithQuery === link.href;
                  } else {
                    isActive = pathname.startsWith(link.href);
                  }
                  
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center text-xl font-bold py-4 px-6 rounded-2xl transition-all",
                          isActive 
                            ? "bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20" 
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              
              <div className="mt-auto pt-8 border-t border-white/10">
                <Link
                  href="/account"
                  className="flex items-center justify-center w-full py-4 rounded-2xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/5 font-semibold transition-colors"
                >
                  <User className="h-5 w-5 mr-3" />
                  Mi Cuenta
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
