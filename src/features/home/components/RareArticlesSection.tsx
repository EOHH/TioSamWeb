'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

import { Product } from '@/types/product'

interface RareArticlesSectionProps {
  products: Product[];
}

export function RareArticlesSection({ products }: RareArticlesSectionProps) {
  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-white uppercase border-l-4 border-amber-500 pl-3">
          ARTÍCULOS RAROS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        
        {/* Intro Promo Card (Spans 1 column on desktop, but integrated nicely) */}
        <div className="md:col-span-1 flex flex-col justify-center items-center text-center bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative overflow-hidden">
          {/* Subtle gold glow behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-amber-500 font-bold tracking-widest text-sm mb-4">
              EDICIONES LIMITADAS
            </span>
            <p className="text-white text-lg md:text-xl font-medium mb-8 leading-relaxed">
              Cartas ultra raras para místicos coleccionistas de verdad
            </p>
            
            <Link 
              href="/rare" 
              className="group inline-flex items-center px-5 py-2.5 rounded-full border border-amber-500/50 text-amber-500 font-bold text-sm hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300"
            >
              VER ARTÍCULOS RAROS
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* The 4 Luxury Rare Showcases */}
        {products.slice(0, 4).map((product) => (
          <Link href={`/cartas/${product.id}`} key={product.id} className="block w-full">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="group relative w-full bg-[#0a0a0a] rounded-xl border border-amber-500/20 overflow-hidden transition-all duration-300 hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] h-full flex flex-col"
            >
              {/* Image wrapper with fixed aspect ratio */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-black">
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                )}
                {/* Dark vertical gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent pointer-events-none" />
                
                {/* Text Overlay Badge (Bottom Center) */}
                <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center z-10 px-2">
                  <span className="bg-gradient-to-r from-amber-600 to-yellow-400 text-black font-extrabold uppercase px-4 py-1.5 rounded-sm tracking-widest text-xs md:text-sm shadow-lg shadow-amber-900/50">
                    {product.rarity || 'RARE'}
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}

      </div>
    </section>
  )
}
