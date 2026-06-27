'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Product } from '@/types/product'
import { ProductCard } from '@/features/products/components/ProductCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ProductSkeleton } from '@/components/ui/ProductSkeleton'

export function FeaturedCarouselSkeleton() {
  return (
    <div className="w-full relative py-8">
      <div className="flex items-center justify-between mb-6 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">
            PRODUCTOS DESTACADOS
          </h2>
        </div>
      </div>
      <div className="overflow-hidden pb-8 pt-4">
        <div className="flex touch-pan-y">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "flex-[0_0_16rem] min-w-0 relative",
                index === 0 ? "ml-4 md:ml-8 lg:ml-12 mr-6" : "mr-6"
              )}
            >
              <ProductSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface FeaturedCarouselProps {
  products: Product[]
}

export function FeaturedCarousel({ products }: FeaturedCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )

  if (!products || products.length === 0) {
    return null
  }

  // Duplicate items if there are too few, to guarantee the endless loop effect on large screens
  const displayProducts = products.length < 10 
    ? [...products, ...products, ...products].slice(0, 12)
    : products

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full relative mt-4"
    >
      <div className="flex items-center justify-between mb-6 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide uppercase">
            PRODUCTOS DESTACADOS
          </h2>
        </div>
        <Link 
          href="/products" 
          className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors"
        >
          Ver todos <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      {/* Negative horizontal margin and compensating padding ensures the shadow/scale */}
      <div className="overflow-hidden pb-8" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {displayProducts.map((product, index) => (
            <div 
              key={`${product.id}-${index}`} 
              className={cn(
                "flex-[0_0_16rem] min-w-0 relative",
                index === 0 ? "ml-4 md:ml-8 lg:ml-12 mr-6" : "mr-6"
              )}
            >
              <ProductCard product={product} priority={index < 4} />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
