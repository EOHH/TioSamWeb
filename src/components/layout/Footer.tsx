'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-gray-400 py-16 border-t border-white/5 font-sans">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Logo & Description (Spans 3 cols) */}
          <div className="lg:col-span-3">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#7c3aed] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <span className="text-white font-black text-xl">TS</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-white tracking-widest">EDICIONES</span>
                <span className="text-2xl font-black text-white tracking-wide">TIO SAM</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-8 max-w-sm">
              Tu tienda especializada en cartas, álbumes y coleccionables de anime.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              {/* Custom TikTok Icon */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Tienda (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider">TIENDA</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/collections" className="hover:text-[#7c3aed] transition-colors">Colecciones</Link></li>
              <li><Link href="/cartas" className="hover:text-[#7c3aed] transition-colors">Cartas</Link></li>
              <li><Link href="/albumes" className="hover:text-[#7c3aed] transition-colors">Álbumes</Link></li>
              <li><Link href="/products?category=sobres" className="hover:text-[#7c3aed] transition-colors">Sobres</Link></li>
              <li><Link href="/offers" className="hover:text-[#7c3aed] transition-colors">Ofertas</Link></li>
            </ul>
          </div>

          {/* Column 3: Información (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider">INFORMACIÓN</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-[#7c3aed] transition-colors">Quiénes somos</Link></li>
              <li><Link href="/shipping" className="hover:text-[#7c3aed] transition-colors">Envíos y entregas</Link></li>
              <li><Link href="/devoluciones" className="hover:text-[#7c3aed] transition-colors">Políticas de devolución</Link></li>
              <li><Link href="/terminos" className="hover:text-[#7c3aed] transition-colors">Términos y condiciones</Link></li>
              <li><Link href="/faq" className="hover:text-[#7c3aed] transition-colors">Preguntas frecuentes</Link></li>
            </ul>
          </div>

          {/* Column 4: Ayuda (Spans 2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider">AYUDA</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/account" className="hover:text-[#7c3aed] transition-colors">Mi cuenta</Link></li>
              <li><Link href="/orders" className="hover:text-[#7c3aed] transition-colors">Mis pedidos</Link></li>
              <li><Link href="/payments" className="hover:text-[#7c3aed] transition-colors">Métodos de pago</Link></li>
              <li><Link href="/contact" className="hover:text-[#7c3aed] transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 5: Newsletter (Spans 3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-6 tracking-wider">NEWSLETTER</h4>
            <p className="text-sm mb-6">
              Suscríbete para recibir novedades y ofertas exclusivas.
            </p>
            <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-[#111111] border border-white/5 text-white text-sm rounded-l-lg px-4 py-3 focus:outline-none focus:border-[#7c3aed] transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-[#7c3aed] hover:bg-purple-600 text-white px-5 rounded-r-lg flex items-center justify-center transition-colors shrink-0"
                aria-label="Suscribirse"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Ediciones Tio Sam. Todos los derechos reservados.
          </p>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            {/* These are styled generic badges acting as payment icons to match the design. In production, use real SVGs */}
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
              <span className="text-white font-black italic text-lg tracking-tighter">VISA</span>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500/80 mix-blend-screen" />
                <div className="w-6 h-6 rounded-full bg-yellow-500/80 -ml-2 mix-blend-screen" />
              </div>
              <span className="text-blue-500 font-bold text-sm bg-blue-100/10 px-1 rounded">AMEX</span>
              <span className="text-blue-400 font-black italic text-sm">PayPal</span>
              <span className="text-teal-400 font-bold text-sm italic">Yape</span>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  )
}
