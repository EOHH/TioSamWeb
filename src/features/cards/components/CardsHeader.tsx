'use client'

import { motion } from 'framer-motion'
import { LibrarySquare } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface CardsHeaderProps {
  totalCards: number;
}

export function CardsHeader({ totalCards = 0 }: CardsHeaderProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-[32px] bg-[#09090b] border border-white/5 shadow-2xl mb-8">
      {/* Background Magic/Galaxy Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Purple Nebula */}
        <div className="absolute -top-1/2 left-0 w-full h-[150%] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-900/40 via-purple-900/5 to-transparent blur-[80px]" />
        
        {/* Magic Grid/Stars overlay could go here */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[#fff] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      </div>

      <div className="relative z-10 px-8 py-16 md:py-24 lg:px-16 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-purple-400 transition-colors">Inicio</Link>
          <span>›</span>
          <span className="text-gray-300">Cartas</span>
        </div>

        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase mb-6 drop-shadow-lg"
        >
          CARTAS
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg md:text-xl font-medium max-w-xl mb-10 leading-relaxed"
        >
          Encuentra las cartas más épicas de tus animes favoritos.
        </motion.p>

        {/* Stats Pill */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-900 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <LibrarySquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{totalCards.toLocaleString()}+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cartas disponibles</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Cards Floating on the Right (Desktop Only) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[60%] h-full pointer-events-none z-0">
        
        {/* Massive Purple Core Glow (Explosion Center) */}
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/40 blur-[120px] rounded-full" />
        
        {/* Secondary Lightning/Magic Glow */}
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-[300px] h-[300px] bg-fuchsia-500/30 blur-[80px] rounded-full mix-blend-screen" />

        {/* SVGs for Lightning Effects */}
        
        {/* Lightning 1: Massive Strike */}
        <motion.svg 
          animate={{ opacity: [0, 0, 1, 0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.92, 0.94, 0.96, 1], ease: "linear" }}
          className="absolute top-0 right-[15%] w-[400px] h-full z-10 opacity-0"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          {/* Outer glow line */}
          <path d="M40 0 L60 30 L30 60 L70 90 L20 130 L80 160 L40 200" fill="none" stroke="#a855f7" strokeWidth="4" className="drop-shadow-[0_0_15px_rgba(168,85,247,1)]" />
          {/* Inner core line */}
          <path d="M40 0 L60 30 L30 60 L70 90 L20 130 L80 160 L40 200" fill="none" stroke="#fff" strokeWidth="1" />
        </motion.svg>

        {/* Lightning 2: Side Branch */}
        <motion.svg 
          animate={{ opacity: [0, 0, 0.8, 0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.8, 0.83, 0.86, 0.89, 1], delay: 1, ease: "linear" }}
          className="absolute top-[20%] right-[35%] w-[300px] h-[60%] z-0 opacity-0 transform -rotate-12"
          viewBox="0 0 100 200"
          preserveAspectRatio="none"
        >
          <path d="M50 0 L20 40 L60 80 L30 120 L80 160 L50 200" fill="none" stroke="#c084fc" strokeWidth="3" className="drop-shadow-[0_0_15px_rgba(192,132,252,1)]" />
          <path d="M50 0 L20 40 L60 80 L30 120 L80 160 L50 200" fill="none" stroke="#fff" strokeWidth="1" />
        </motion.svg>

        {/* Lightning 3: Small crackle */}
        <motion.svg 
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, times: [0, 0.95, 0.97, 1], delay: 0.5, ease: "linear" }}
          className="absolute top-[40%] right-[10%] w-[200px] h-[30%] z-20 opacity-0 transform rotate-45"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path d="M0 50 L30 30 L50 60 L80 20 L100 50" fill="none" stroke="#d8b4fe" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(216,180,254,1)]" />
          <path d="M0 50 L30 30 L50 60 L80 20 L100 50" fill="none" stroke="#fff" strokeWidth="1" />
        </motion.svg>

        {/* Card 1: Top Left (Floating back) */}
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [-15, -12, -15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[65%] w-36 h-48 xl:w-44 xl:h-64 rounded-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] border border-purple-500/20 overflow-hidden opacity-70 z-10"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/rare/manga-rare.png" alt="Manga Rare" fill sizes="20vw" className="object-cover" />
        </motion.div>

        {/* Card 2: Bottom Left (Floating down) */}
        <motion.div 
          animate={{ y: [10, -10, 10], rotate: [-20, -15, -20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[5%] right-[55%] w-40 h-56 xl:w-48 xl:h-68 rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.4)] border border-purple-400/30 overflow-hidden opacity-80 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/rare/special-edition.png" alt="Special Edition" fill sizes="20vw" className="object-cover" />
        </motion.div>

        {/* Card 3: Center (The Hero - Massive & Glowing) */}
        <motion.div 
          animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[10%] right-[25%] w-60 h-80 xl:w-72 xl:h-[400px] rounded-2xl shadow-[0_0_80px_rgba(168,85,247,0.8)] border-2 border-purple-400 overflow-hidden z-30"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 via-transparent to-purple-400/20 mix-blend-screen z-10" />
          {/* Inner intense glow border effect */}
          <div className="absolute inset-0 border border-white/40 rounded-2xl z-20 pointer-events-none mix-blend-overlay" />
          <Image src="/images/rare/god-rare.png" alt="God Rare Center" fill sizes="30vw" className="object-cover" priority />
        </motion.div>

        {/* Card 4: Right (Floating up) */}
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [15, 10, 15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[20%] right-[5%] w-48 h-64 xl:w-56 xl:h-80 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-amber-500/40 overflow-hidden opacity-90 z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/20 to-transparent mix-blend-overlay z-10" />
          <Image src="/images/rare/legendaria.png" alt="Legendary Card" fill sizes="25vw" className="object-cover" />
        </motion.div>
      </div>
    </div>
  )
}
