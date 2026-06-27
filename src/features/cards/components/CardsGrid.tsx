'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react'
import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import Link from 'next/link'

interface CardsGridProps {
  products: Product[];
  collections: Collection[];
}

export function CardsGrid({ products, collections }: CardsGridProps) {
  
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-[#09090b] rounded-[32px] border border-white/5">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No se encontraron cartas</h3>
        <p className="text-gray-500">Prueba cambiando los filtros o buscando otro término.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 content-start items-start">
      {products.map((product, index) => {
        // Use nested collection data from Supabase
        const colName = product.collections?.name || 'Ediciones Tio Sam';

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col bg-[#09090b] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors shadow-lg"
          >
            {/* Top Image Section */}
            <div className="relative w-full aspect-[3/4] bg-[#111] overflow-hidden p-3">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <Link href={`/cartas/${product.id}`} className="block relative w-full h-full rounded-xl overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${product.image_url || '/images/placeholder.jpg'}')` }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                />
              </Link>

              {/* Badges */}
              <div className="absolute top-5 left-5 flex gap-2">
                {product.featured && (
                  <div className="bg-[#1a1111] border border-amber-500/30 text-amber-500 px-2 py-1 rounded shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="text-[10px] font-black uppercase">Destacada</span>
                  </div>
                )}
                {product.is_new && !product.featured && (
                  <div className="bg-[#111a1d] border border-cyan-400/30 text-cyan-400 px-2 py-1 rounded shadow-lg flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-cyan-400" />
                    <span className="text-[10px] font-black uppercase">Nueva</span>
                  </div>
                )}
              </div>

              {/* Heart Button */}
              <button className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/50 transition-all shadow-lg z-10">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-5 flex flex-col flex-1 min-h-[160px]">
              <Link href={`/cartas/${product.id}`} className="group-hover:text-purple-400 transition-colors">
                <h3 className="text-white font-bold text-base line-clamp-1 mb-1 truncate">{product.name}</h3>
              </Link>
              <p className="text-gray-500 text-xs font-medium mb-3 truncate">{colName}</p>
              
              {/* Real Rarity and Condition Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5 overflow-hidden">
                {product.rarity && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    product.rarity === 'Secreta' ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30' :
                    product.rarity === 'Ultra Rara' ? 'text-pink-500 bg-pink-500/10 border border-pink-500/30' :
                    product.rarity === 'Super Rara' ? 'text-amber-500 bg-amber-500/10 border border-amber-500/30' :
                    product.rarity === 'Rara' ? 'text-blue-400 bg-blue-400/10 border border-blue-400/30' :
                    'text-gray-400 bg-gray-500/10 border border-gray-500/30'
                  } whitespace-nowrap`}>
                    {product.rarity.toUpperCase()}
                  </span>
                )}
                {product.condition && (
                  <span className="text-[10px] font-bold text-gray-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded whitespace-nowrap">
                    {product.condition.toUpperCase()}
                  </span>
                )}
              </div>

              {/* Footer: Price and Cart */}
              <div className="mt-auto flex items-center justify-between">
                <span className="text-white font-black text-lg">
                  S/ {product.price.toFixed(2)}
                </span>
                
                <button className="w-10 h-10 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// Ensure Search is imported if empty state is triggered
import { Search } from 'lucide-react'
