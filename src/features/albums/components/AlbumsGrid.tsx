import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { FavoriteButton } from '@/components/ui/FavoriteButton'

interface AlbumsGridProps {
  products: Product[];
  collections: Collection[];
}

export function AlbumsGrid({ products, collections }: AlbumsGridProps) {
  
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-[#0a0515] border border-white/5 rounded-3xl">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <span className="text-2xl">📚</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No se encontraron álbumes</h3>
        <p className="text-gray-500 max-w-sm">
          No hay álbumes que coincidan con los filtros seleccionados. Intenta quitar algunos filtros.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 content-start items-start">
      {products.map((product, index) => {
        const colName = product.collections?.name || 'Ediciones Tio Sam';
        
        return (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col bg-[#0f0a1c] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-colors shadow-lg h-full"
          >
            {/* Top Image Section */}
            <div className="relative w-full aspect-[4/5] bg-black overflow-hidden">
              {/* Radial glow on hover */}
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/20 transition-colors duration-500 z-10 pointer-events-none mix-blend-overlay" />
              
              <Link href={`/albumes/${product.id}`} className="relative block w-full h-full border-b border-white/5 z-20">
                {product.image_url ? (
                  <Image 
                    src={product.image_url}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    unoptimized={product.image_url.includes('pinimg.com')}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 bg-[#111]">
                    Sin imagen
                  </div>
                )}
                {/* Gradient overlay to dark bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a1c] via-transparent to-transparent opacity-80" />
              </Link>

              {/* Badges Overlay */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-30 pointer-events-none">
                {product.is_new && (
                  <span className="bg-[#00f0ff] text-black text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg">
                    NUEVO
                  </span>
                )}
                {product.featured && (
                  <span className="bg-purple-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm shadow-lg flex items-center gap-1">
                    DESTACADO
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <FavoriteButton productId={product.id} />
            </div>

            {/* Bottom Content Section */}
            <div className="flex flex-col flex-1 p-5">
              
              <Link href={`/albumes/${product.id}`} className="block mb-2">
                <h3 className="text-white font-bold text-sm leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <div className="mb-4">
                <span className="inline-block bg-[#2e1065] border border-purple-500/30 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {colName}
                </span>
                <p className="text-gray-500 text-xs mt-2">Álbum Oficial</p>
              </div>
              
              <div className="flex items-end justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg tracking-tight">
                    S/ {product.price.toString()}
                  </span>
                  {product.stock <= 5 && product.stock > 0 && (
                    <span className="text-red-400 text-[10px] font-bold">¡Solo {product.stock} disponibles!</span>
                  )}
                  {product.stock === 0 && (
                    <span className="text-gray-500 text-[10px] font-bold">Agotado</span>
                  )}
                </div>

                <button 
                  disabled={product.stock === 0}
                  className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-purple-600 disabled:hover:shadow-none shadow-lg"
                  aria-label="Añadir al carrito"
                >
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
