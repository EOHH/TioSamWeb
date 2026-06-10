'use client'

import React, { useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from '@/lib/utils'

const collections = [
  { id: 1, title: 'Naruto Shippuden', count: '120 productos', image: '/images/collections/naruto.png' },
  { id: 2, title: 'Dragon Ball Super', count: '150 productos', image: '/images/collections/dragonball.png' },
  { id: 3, title: 'One Piece', count: '96 productos', image: '/images/collections/onepiece.png' },
  { id: 4, title: 'Demon Slayer', count: '85 productos', image: '/images/collections/demonslayer.png' },
  { id: 5, title: 'Jujutsu Kaisen', count: '60 productos', image: '/images/collections/jujutsu.png' },
  { id: 6, title: 'Bleach', count: '45 productos', image: '/images/collections/bleach.png' },
]

export function FeaturedCollections() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  })

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="w-full max-w-[100rem] mx-auto px-4 md:px-8 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            COLECCIONES DESTACADAS
          </h2>
        </div>
        <Link 
          href="/collections" 
          className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center transition-colors"
        >
          Ver todas <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div className="overflow-hidden -mx-4 px-4" ref={emblaRef}>
          <div className="flex touch-pan-y gap-4 md:gap-5">
            {collections.map((collection) => (
              <div 
                key={collection.id} 
                className="relative flex-[0_0_260px] md:flex-[0_0_280px] lg:flex-[0_0_300px] min-w-0"
              >
                <Link href={`/collections/${collection.id}`} className="block relative w-full aspect-[16/10] rounded-2xl overflow-hidden group/card cursor-pointer border border-white/5 bg-[#121212]">
                  
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover/card:scale-110"
                    style={{ backgroundImage: `url('${collection.image}')` }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover/card:border-purple-500/50 rounded-2xl transition-colors duration-300 pointer-events-none" />

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 p-5 flex flex-col justify-end w-full">
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {collection.title}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium drop-shadow-md">
                      {collection.count}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Arrow Right */}
        <button 
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-[#2a2a2a] hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  )
}
