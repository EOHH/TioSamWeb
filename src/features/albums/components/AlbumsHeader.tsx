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
    <div className="relative w-full overflow-hidden rounded-[32px] bg-[#09090b] border border-white/5 shadow-2xl mb-8">
      {/* Background Magic/Galaxy Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Emerald Nebula */}
        <div className="absolute -top-1/2 left-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/40 via-emerald-900/5 to-transparent blur-[80px]" />
        
        {/* Magic Grid/Stars overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[#fff] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="relative z-10 px-8 py-16 md:py-24 lg:px-16 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link>
          <span>›</span>
          <span className="text-gray-300">Álbumes</span>
        </div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-6 drop-shadow-lg"
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
          Colecciona, organiza y revive los mejores momentos de tus series favoritas en un solo lugar.
        </motion.p>

        {/* Stats Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-900 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <LibrarySquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{totalAlbums.toLocaleString()}+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Álbumes disponibles</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Albums Floating on the Right (Desktop Only) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full pointer-events-none z-0">
        
        {/* Massive Emerald Core Glow */}
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/30 blur-[120px] rounded-full" />
        
        {/* Secondary Cyan Glow */}
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[80px] rounded-full mix-blend-screen" />

        {/* Floating Images (Using Collection covers as stand-ins for epic albums) */}
        
        {/* Item 1: Back/Far Left */}
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [-10, -5, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[60%] w-48 h-48 xl:w-56 xl:h-56 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] border border-white/10 overflow-hidden opacity-60 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/collections/demonslayer.png" alt="Demon Slayer" fill sizes="20vw" className="object-cover" />
        </motion.div>

        {/* Item 2: Bottom Left */}
        <motion.div 
          animate={{ y: [10, -10, 10], rotate: [-15, -10, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] right-[50%] w-52 h-52 xl:w-60 xl:h-60 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.4)] border border-emerald-400/30 overflow-hidden opacity-80 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/30 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/collections/naruto.png" alt="Naruto" fill sizes="20vw" className="object-cover" />
        </motion.div>

        {/* Item 3: Center Main */}
        <motion.div 
          animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[15%] right-[20%] w-64 h-64 xl:w-[350px] xl:h-[350px] rounded-2xl shadow-[0_0_80px_rgba(16,185,129,0.8)] border-2 border-emerald-400 overflow-hidden z-30 bg-[#09090b]"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/40 via-transparent to-emerald-400/20 mix-blend-screen z-10" />
          <div className="absolute inset-0 border border-white/40 rounded-2xl z-20 pointer-events-none mix-blend-overlay" />
          <Image src="/images/collections/dragonball.png" alt="Dragon Ball" fill sizes="30vw" className="object-contain p-4" priority />
        </motion.div>

        {/* Item 4: Front Right */}
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [10, 15, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[25%] right-[2%] w-56 h-56 xl:w-64 xl:h-64 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-cyan-500/40 overflow-hidden opacity-90 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-cyan-500/20 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/collections/onepiece.png" alt="One Piece" fill sizes="25vw" className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}
