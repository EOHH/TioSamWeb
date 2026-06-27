'use client'

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Product } from '@/types/product'
import { ProductCard } from '@/features/products/components/ProductCard'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ProductSkeleton } from '@/components/ui/ProductSkeleton'

export function ProductShowcaseSkeleton() {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filter Bar Placeholder */}
      <div className="flex flex-wrap items-center gap-3">
        {['Todos', 'Cartas', 'Figuras', 'Álbumes'].map((cat, i) => (
          <div key={i} className="px-6 py-2.5 rounded-full bg-white/5 border border-transparent">
            <span className="opacity-0">{cat}</span>
          </div>
        ))}
      </div>

      {/* Grid Placeholder */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

interface ProductShowcaseProps {
  products: Product[]
}

const CATEGORIES = ['Todos', 'Cartas', 'Figuras', 'Álbumes', 'Sobres']

const categoryToSlugMap: Record<string, string> = {
  'Cartas': 'cards',
  'Figuras': 'figures',
  'Álbumes': 'albums',
  'Sobres': 'sobres'
}

const slugToCategoryMap: Record<string, string> = Object.entries(categoryToSlugMap).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as Record<string, string>
)

export function ProductShowcase({ products }: ProductShowcaseProps) {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const categoryParam = searchParams.get('category')
    
    if (categoryParam) {
      const targetUiCategory = slugToCategoryMap[categoryParam] || 'Todos'
      if (activeCategory !== targetUiCategory) {
        setActiveCategory(targetUiCategory)
        // Only scroll if we changed category via URL parameter
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100) // Small delay to let React render and grid calculate
      }
    } else {
      if (activeCategory !== 'Todos') {
        setActiveCategory('Todos')
      }
    }
  }, [searchParams])

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return products
    
    const targetCategorySlug = categoryToSlugMap[activeCategory]
    return products.filter(p => p.categories?.slug === targetCategorySlug)
  }, [products, activeCategory])

  return (
    <motion.div 
      ref={sectionRef}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 w-full scroll-mt-24"
    >
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                isActive 
                  ? "bg-purple-600/20 text-purple-300 border border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105"
                  : "bg-white/5 text-gray-400 hover:text-white border border-transparent hover:bg-white/10"
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      {/* Denser Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={`showcase-${product.id}`} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="py-24 text-center border border-white/5 rounded-2xl bg-black/40 backdrop-blur-sm">
          <p className="text-gray-400 text-lg">No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </motion.div>
  )
}
