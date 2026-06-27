import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface AlbumsGridProps {
  products: Product[];
  collections: Collection[];
}

export function AlbumsGrid({ products, collections }: AlbumsGridProps) {
  
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center bg-[#09090b] border border-white/5 rounded-3xl">
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
    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 content-start items-start">
      {products.map((product, index) => {
        const colName = product.collections?.name || 'Ediciones Tio Sam';
        
        return (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="group relative flex flex-col bg-[#09090b] border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-colors shadow-lg"
          >
            {/* Top Image Section */}
            <div className="relative w-full aspect-[4/5] bg-[#111] overflow-hidden p-3">
              {/* Radial glow on hover */}
              <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-500 z-10 pointer-events-none" />
              
              <Link href={`/albumes/${product.id}`} className="relative block w-full h-full rounded-xl overflow-hidden border border-white/10 group-hover:border-emerald-500/30 transition-colors z-20">
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
                  <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-600">
                    Sin imagen
                  </div>
                )}

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-30 pointer-events-none">
                  {product.is_new && (
                    <span className="bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg">
                      Nuevo
                    </span>
                  )}
                  {product.featured && (
                    <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                      <span>★</span> Destacado
                    </span>
                  )}
                </div>
              </Link>
            </div>

            {/* Bottom Content Section */}
            <div className="flex flex-col flex-1 p-4">
              <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-1">
                {colName}
              </span>
              
              <Link href={`/albumes/${product.id}`} className="block mb-2 flex-1">
                <h3 className="text-white font-bold text-sm leading-tight group-hover:text-emerald-400 transition-colors truncate">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-white font-black text-lg">
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
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(52,211,153,0.4)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-white/5 disabled:hover:border-white/10 disabled:hover:shadow-none"
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
