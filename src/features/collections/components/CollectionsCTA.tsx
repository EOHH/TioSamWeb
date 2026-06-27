'use client'

import { motion } from 'framer-motion'
import { Send, Sparkles, Rocket, ShieldCheck, Diamond, Gift, Lock, Shield } from 'lucide-react'

export function CollectionsCTA() {
  return (
    <section className="w-full mt-10 mb-2 relative">
      {/* Outer Container */}
      <div className="relative w-full rounded-[32px] bg-[#09090b] border border-white/5 overflow-hidden px-4 py-10 md:py-12 lg:py-14 flex flex-col items-center text-center shadow-2xl">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-[32px]">
          <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full" />
          <div className="absolute -bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-800/10 blur-[150px] rounded-full" />
        </div>

        {/* Floating Decorative Elements (Simulating the 3D objects in the design) */}
        <motion.div 
          animate={{ y: [-15, 15, -15], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] opacity-40 blur-[2px]"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-900 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <Diamond className="w-8 h-8 text-white/50" />
          </div>
        </motion.div>
        <motion.div 
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[10%] opacity-30 blur-[3px]"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/10">
            <Sparkles className="w-10 h-10 text-white/30" />
          </div>
        </motion.div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Top Pill */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/5 text-amber-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Acceso Exclusivo</span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-[64px] font-black text-white uppercase tracking-tight leading-[1.1] mb-6"
          >
            NO TE PIERDAS <br />
            NINGÚN <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">LANZAMIENTO</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base mb-8 max-w-2xl font-medium leading-relaxed"
          >
            Únete al <span className="text-purple-400 font-bold">gremio secreto</span> y sé el primero en enterarte cuando aterricen nuevas colecciones, preventas y ediciones limitadas antes que nadie.
          </motion.p>

          {/* Features Row */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 md:gap-8 px-6 py-4 rounded-full border border-white/5 bg-white/[0.02] mb-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-wider text-left leading-tight">
                Lanzamientos<br/>Anticipados
              </span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-wider text-left leading-tight">
                Acceso a<br/>Preventas
              </span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center">
                <Diamond className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-wider text-left leading-tight">
                Ediciones<br/>Limitadas
              </span>
            </div>
            <div className="hidden lg:block w-px h-8 bg-white/10" />
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                <Gift className="w-4 h-4 text-amber-500" />
              </div>
              <span className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-wider text-left leading-tight">
                Sorpresas<br/>Exclusivas
              </span>
            </div>
          </motion.div>

          {/* Input Form Wrapper */}
          <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-3xl relative mb-8 group"
          >
            {/* Glowing Border Behind Input */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-purple-400 to-amber-500 rounded-full blur-md opacity-40 group-hover:opacity-70 transition duration-500" />
            
            {/* Input Container */}
            <form className="relative flex flex-col md:flex-row items-center gap-2 bg-[#09090b] border border-white/10 rounded-[32px] p-2" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex items-center flex-1 w-full pl-4 md:pl-6">
                <Send className="w-5 h-5 text-purple-500 mr-3" />
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico..." 
                  className="w-full bg-transparent border-none text-white text-base md:text-lg py-3 focus:outline-none placeholder:text-gray-600"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-amber-500 via-orange-400 to-purple-600 hover:brightness-110 text-white font-bold text-sm md:text-base uppercase tracking-wider px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Quiero Entrar
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Avatars Row */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-4 mb-10"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                  alt="Member" 
                  className="w-10 h-10 rounded-full border-2 border-[#09090b] object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#09090b] bg-[#2a1c12] text-amber-500 text-[10px] font-black flex items-center justify-center">
                +12K
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm text-left leading-tight">
              <strong className="text-white">Más de 12,000 miembros</strong> ya forman<br className="hidden md:block" /> parte del gremio secreto.
            </p>
          </motion.div>

          {/* Trust Badges Row */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="w-full max-w-4xl border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-left">
                <span className="text-white text-xs font-bold uppercase tracking-wider">100% Privado</span>
                <span className="text-gray-500 text-[10px]">Solo para miembros</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5" />
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-left">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Sin Spam</span>
                <span className="text-gray-500 text-[10px]">Solo contenido exclusivo</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/5" />
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <div className="flex flex-col text-left">
                <span className="text-white text-xs font-bold uppercase tracking-wider">Cancela Cuando Quieras</span>
                <span className="text-gray-500 text-[10px]">Sin compromisos</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
