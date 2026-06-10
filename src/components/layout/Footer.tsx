"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-secondary/20">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About & Socials */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Ediciones Tio Sam</h3>
            <p className="text-sm text-muted-foreground">
              Tu destino definitivo para cartas, figuras y álbumes de anime premium en Perú.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Contacto */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="shrink-0 mt-0.5 text-primary" />
                <span>Av. Arenales 1737, Lince<br/>Lima, Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-primary" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-primary" />
                <a href="mailto:contacto@tiosam.com" className="hover:text-primary transition-colors">
                  contacto@tiosam.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tienda */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Tienda</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/cards" className="hover:text-primary transition-colors">Cartas de Anime</Link></li>
              <li><Link href="/figures" className="hover:text-primary transition-colors">Figuras y Estatuas</Link></li>
              <li><Link href="/albums" className="hover:text-primary transition-colors">Álbumes de Stickers</Link></li>
              <li><Link href="/new" className="hover:text-primary transition-colors">Nuevos Lanzamientos</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal & Reclamaciones */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li><Link href="/terminos" className="hover:text-primary transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/devoluciones" className="hover:text-primary transition-colors">Políticas de Devolución</Link></li>
              <li><Link href="/privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
            </ul>
            
            <div className="pt-2">
              <Link 
                href="/reclamaciones" 
                className="inline-flex items-center justify-center gap-2 bg-background border-2 border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all font-semibold shadow-sm w-full md:w-auto"
              >
                <BookOpen size={22} />
                <span>Libro de Reclamaciones</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Ediciones Tio Sam. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
