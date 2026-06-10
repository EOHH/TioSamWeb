'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, Lock } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/utils'

const slides = [
  {
    id: 1,
    bgImage: '/images/hero_banner_1.png',
    layout: 'left',
    topText: '',
    topTextColor: '',
    titlePart1: 'COLECCIONA',
    titlePart2: 'LO ÉPICO',
    titleColor: 'from-[#b57aff] to-[#8a2be2]',
    subtitle: 'Cartas, álbumes y coleccionables exclusivos de tus animes favoritos.',
    buttons: [
      { text: 'EXPLORAR COLECCIÓN', href: '/all', primary: true, color: 'bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_20px_rgba(124,58,237,0.5)]', border: '' },
      { text: 'VER NOVEDADES', href: '/new', primary: false, color: 'hover:bg-purple-900/40', border: 'border-[#4c1d95] hover:border-purple-400' }
    ],
    features: []
  },
  {
    id: 2,
    bgImage: '/images/hero_banner_2.png',
    layout: 'split',
    topText: '— NUEVAS COLECCIONES —',
    topTextColor: 'text-yellow-500',
    titlePart1: 'NUEVAS LEYENDAS',
    titlePart2: 'TE ESPERAN',
    titleColor: 'from-[#b57aff] to-[#8a2be2]',
    subtitle: 'Descubre los lanzamientos más recientes y completa tu colección.',
    buttons: [
      { text: 'VER COLECCIONES', href: '/new', primary: true, color: 'bg-[#7c3aed] hover:bg-[#6d28d9] shadow-[0_0_20px_rgba(124,58,237,0.5)]', border: '' }
    ],
    features: [
      { icon: ShieldCheck, title: 'PRODUCTOS ORIGINALES', desc: '100% auténticos' },
      { icon: Truck, title: 'ENVÍOS RÁPIDOS', desc: 'A todo el país' },
      { icon: Lock, title: 'PAGOS SEGUROS', desc: 'Compra con confianza' },
    ]
  },
  {
    id: 3,
    bgImage: '/images/hero_banner_3.png',
    layout: 'left',
    topText: '— EDICIONES LIMITADAS —',
    topTextColor: 'text-rose-600',
    titlePart1: 'PARA VERDADEROS',
    titlePart2: 'COLECCIONISTAS',
    titleColor: 'from-rose-500 to-rose-700',
    subtitle: 'Ediciones especiales, cartas raras y mucho más.',
    buttons: [
      { text: 'DESCUBRIR EDICIONES', href: '/limited', primary: true, color: 'bg-[#e11d48] hover:bg-[#be123c] shadow-[0_0_20px_rgba(225,29,72,0.5)]', border: '' }
    ],
    features: []
  }
]

export function HeroBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="relative w-full mx-auto overflow-hidden group">
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full h-[450px] md:h-[500px]" ref={emblaRef}>
        <div className="flex w-full h-full touch-pan-y">
          {slides.map((slide, index) => (
            <div 
              key={slide.id} 
              className="relative flex-[0_0_100%] min-w-0 h-full flex items-center"
            >
              {/* Background Image (User will provide these) */}
              <div 
                className="absolute inset-0 z-0 bg-[#0a0a0a]"
                style={{
                  backgroundImage: `url('${slide.bgImage}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              
              {/* Main Background Darkener */}
              <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>

              {/* Strong Left Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#05000a] via-[#05000a]/80 to-transparent w-full md:w-[65%] z-0 pointer-events-none"></div>
              
              {/* Extra radial blur behind the LEFT text for maximum contrast */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full md:w-[50%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.7)_0%,_transparent_70%)] z-0 pointer-events-none"></div>

              {/* Extra radial blur behind the RIGHT features for maximum contrast */}
              {slide.features && slide.features.length > 0 && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-[40%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.6)_0%,_transparent_70%)] z-0 pointer-events-none"></div>
              )}

              {/* Main Content Layout */}
              <div className="relative z-10 w-full max-w-[100rem] mx-auto px-12 md:px-24 flex items-center justify-between">
                
                {/* LEFT COLUMN: Text and Buttons */}
                <div className="flex flex-col w-full max-w-xl items-start text-left">
                  {/* Top Text */}
                  {slide.topText && (
                    <div className="flex items-center gap-4 mb-2">
                      <div className={cn("h-[1px] w-8", slide.id === 2 ? "bg-yellow-500" : "bg-rose-600")}></div>
                      <span className={cn("text-xs md:text-sm font-bold tracking-[0.2em] uppercase", slide.topTextColor)}>
                        {slide.topText.replace(/—/g, '').trim()}
                      </span>
                      <div className={cn("h-[1px] w-8", slide.id === 2 ? "bg-yellow-500" : "bg-rose-600")}></div>
                    </div>
                  )}

                  {/* Typography */}
                  <div className="flex flex-col mb-4 select-none items-start">
                    <h2 className="text-[2.5rem] sm:text-5xl md:text-[4rem] font-black italic text-white tracking-widest leading-[1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                      {slide.titlePart1}
                    </h2>
                    <h1 className={cn(
                      "text-[3.5rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r leading-[0.9] mt-1",
                      slide.titleColor,
                      slide.id === 3 ? "drop-shadow-[0_0_30px_rgba(225,29,72,0.6)]" : "drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    )}>
                      {slide.titlePart2}
                    </h1>
                  </div>
                  
                  <p className="text-gray-300 text-sm md:text-base mb-8 leading-snug font-medium max-w-md">
                    {slide.subtitle}
                  </p>
                  
                  {/* Buttons */}
                  <div className="flex flex-row flex-wrap gap-4 justify-start mt-2">
                    {slide.buttons.map((btn, i) => (
                      <Link 
                        key={i}
                        href={btn.href} 
                        className={cn(
                          "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-bold text-[11px] md:text-xs tracking-widest uppercase transition-all duration-300",
                          btn.primary 
                            ? `text-white ${btn.color}`
                            : `bg-transparent text-white border ${btn.border} ${btn.color}`
                        )}
                      >
                        {btn.text} {btn.primary && <ArrowRight className="ml-2 h-4 w-4" />}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* RIGHT COLUMN: Features (Only for slide 2) */}
                {slide.features && slide.features.length > 0 && (
                  <div className="hidden lg:flex flex-col gap-8 ml-auto mr-12 relative z-10">
                    {slide.features.map((feature, i) => {
                      const Icon = feature.icon
                      return (
                        <div key={i} className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-full border border-purple-500/40 bg-black/40 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center backdrop-blur-md">
                            <Icon className="w-7 h-7 text-purple-300" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-white font-extrabold text-[15px] tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              {feature.title}
                            </span>
                            <span className="text-gray-300 text-[13px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              {feature.desc}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              index === selectedIndex 
                ? "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] scale-125" 
                : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
