'use client'

import { motion } from 'framer-motion'
import { LibrarySquare } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface AlbumsHeaderProps {
  totalAlbums: number;
}

export function AlbumsHeader({ totalAlbums = 0 }: AlbumsHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] bg-[#09090b] border border-purple-500/10 shadow-[0_0_80px_rgba(88,28,135,0.15)] mb-8">
      {/* Background Magic/Galaxy Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Purple Nebula */}
        <div className="absolute -top-1/2 left-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/50 via-purple-900/10 to-transparent blur-[100px]" />
        
        {/* Magic Grid/Stars overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[#fff] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="relative z-10 px-8 py-16 md:py-24 lg:px-16 max-w-5xl flex flex-col justify-center">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">Inicio</Link>
          <span>›</span>
          <span className="text-gray-300">Álbumes</span>
        </div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-4 drop-shadow-lg"
        >
          ÁLBUMES
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed"
        >
          Completa tu colección con nuestros álbumes oficiales para cartas.
        </motion.p>

        {/* Stats Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-4 bg-[#0a0515]/80 backdrop-blur-md border border-purple-500/20 rounded-2xl p-4 shadow-xl self-start"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-900/50 border border-purple-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <LibrarySquare className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{totalAlbums.toLocaleString()}+</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Álbumes disponibles</div>
          </div>
        </motion.div>
      </div>

      {/* Banner Hero Image Wrapper (Right side) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full pointer-events-none z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 
            Este es el contenedor exacto para que el usuario coloque su imagen 'albums-hero.png'.
            Cargará la imagen de forma nativa manteniendo el aspecto de la explosión púrpura.
          */}
          <Image 
            src="/images/banners/albums-hero.png" 
            alt="Albums Hero Banner" 
            fill 
            className="object-cover object-right"
            priority
          />
          {/* Gradient to blend the image left edge smoothly into the dark background */}
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
        </div>
      </div>
    </div>
  )
}
