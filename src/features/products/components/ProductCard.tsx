'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowRight, Heart } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url || '',
    })
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative flex flex-col h-full rounded-2xl bg-[#111111] border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]"
    >
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1 outline-none">
        
        {/* Image Container */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl bg-black/40 p-4 flex items-center justify-center">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
          />
          
          {/* Subtle gradient overlay at bottom of image to blend into content */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111111] to-transparent" />
          
          {/* Status Badges (Top Left) */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.is_new && (
              <Badge className="bg-purple-600 hover:bg-purple-500 text-white border-none text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-lg">
                Nuevo
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="destructive" className="bg-red-500 hover:bg-red-400 border-none text-[10px] uppercase tracking-wider px-2 py-0.5 shadow-lg">
                Poco Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary" className="bg-zinc-800 hover:bg-zinc-700 text-white border-none text-[10px] uppercase tracking-wider px-2 py-0.5">
                Agotado
              </Badge>
            )}
          </div>
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col flex-1 p-5 z-10 bg-[#111111]">
          
          {/* Category Pill */}
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 text-[9px] font-bold uppercase tracking-widest">
              {product.category_id || 'CARTA'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-white text-[15px] leading-snug line-clamp-2 mb-3" title={product.name}>
            {product.name}
          </h3>
          
          {/* Price */}
          <div className="mt-auto mb-5">
            <span className="text-xl font-bold text-white drop-shadow-sm">
              S/ {product.price.toFixed(2)}
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2 mt-auto">
            <Button 
              onClick={handleAddToCart}
              className={cn(
                "flex-1 h-10 text-[11px] sm:text-xs font-bold rounded-md transition-all duration-300",
                product.stock === 0 
                  ? "bg-white/5 text-white/40 cursor-not-allowed hover:bg-white/5" 
                  : "bg-[#7c3aed] text-white hover:bg-[#6d28d9] shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_25px_rgba(124,58,237,0.4)]"
              )}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'AGOTADO' : 'AGREGAR AL CARRITO'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <button className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md border border-white/10 bg-[#1a1a1a] text-white/50 hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 transition-all duration-300">
              <Heart className="w-5 h-5" />
            </button>
          </div>
          
        </div>
      </Link>
    </motion.div>
  )
}
