'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import { AlbumsSidebar, AlbumFilters } from './AlbumsSidebar'
import { AlbumsGrid } from './AlbumsGrid'
import { AlbumsTopNav, AlbumTopFilter } from './AlbumsTopNav'
import { Search, ChevronDown, ShieldCheck, Layers, Award, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface AlbumsClientProps {
  initialProducts: Product[];
  collections: Collection[];
}

export function AlbumsClient({ initialProducts, collections }: AlbumsClientProps) {
  const [topFilter, setTopFilter] = useState<AlbumTopFilter>('Todos')
  
  const [sidebarFilters, setSidebarFilters] = useState<AlbumFilters>({
    collections: [],
    minPrice: '',
    maxPrice: '',
    inStock: false,
    featured: false,
    isNew: false
  })

  // Calculate counts for top nav
  const counts = useMemo(() => {
    return {
      Todos: initialProducts.length,
      Destacados: initialProducts.filter(p => p.featured).length,
      Novedades: initialProducts.filter(p => p.is_new).length
    }
  }, [initialProducts])

  // Apply all filters
  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      // Top Nav Filter
      if (topFilter === 'Destacados' && !product.featured) return false;
      if (topFilter === 'Novedades' && !product.is_new) return false;

      // Sidebar Filters
      if (sidebarFilters.collections.length > 0) {
        if (!product.collection_id || !sidebarFilters.collections.includes(product.collection_id)) {
          return false;
        }
      }

      if (sidebarFilters.minPrice && product.price < Number(sidebarFilters.minPrice)) return false;
      if (sidebarFilters.maxPrice && product.price > Number(sidebarFilters.maxPrice)) return false;

      if (sidebarFilters.inStock && product.stock === 0) return false;
      if (sidebarFilters.featured && !product.featured) return false;
      if (sidebarFilters.isNew && !product.is_new) return false;

      return true;
    });
  }, [initialProducts, topFilter, sidebarFilters])

  return (
    <div className="flex flex-col gap-8 pb-12">
      
      {/* Top Navigation / Quick Filters */}
      <AlbumsTopNav 
        activeFilter={topFilter} 
        setActiveFilter={setTopFilter} 
        counts={counts}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <AlbumsSidebar 
            collections={collections}
            filters={sidebarFilters}
            setFilters={setSidebarFilters}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Active Filters & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-[#0a0515] border border-white/5 p-4 rounded-2xl gap-4">
            
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-400">Filtros activos:</span>
              <span className="text-white font-medium">Ninguno</span>
              <button 
                onClick={() => setSidebarFilters({collections: [], minPrice: '', maxPrice: '', inStock: false, featured: false, isNew: false})}
                className="text-purple-400 font-bold hover:text-purple-300 ml-2"
              >
                Limpiar todo
              </button>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Buscar álbum..." 
                  className="w-full bg-black border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              
              <div className="relative">
                <select className="appearance-none bg-black border border-white/10 rounded-xl pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer">
                  <option>Más populares</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Más recientes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <AlbumsGrid products={filteredProducts} collections={collections} />
          
          {/* Pagination Placeholder */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-between mt-8 border-t border-white/5 pt-8">
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">&larr;</button>
                <button className="w-10 h-10 rounded-lg bg-[#2e1065] border border-purple-500/50 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(109,40,217,0.3)]">1</button>
                <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">2</button>
                <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">3</button>
                <span className="text-gray-500 px-2">...</span>
                <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">9</button>
                <button className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">&rarr;</button>
              </div>
              <div className="hidden sm:block text-sm text-gray-400">
                Mostrando 1 - {Math.min(filteredProducts.length, 12)} de {filteredProducts.length} álbumes
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/5">
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <ShieldCheck className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Protege tu colección</h4>
                <p className="text-sm text-gray-500">Álbumes diseñados para mantener tus cartas en perfecto estado.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <Layers className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Gran capacidad</h4>
                <p className="text-sm text-gray-500">Álbumes con capacidad desde 180 hasta más de 1000 cartas.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <Award className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Materiales premium</h4>
                <p className="text-sm text-gray-500">Materiales resistentes y de alta calidad.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors">
              <BookOpen className="w-8 h-8 text-purple-500 shrink-0" />
              <div>
                <h4 className="text-white font-bold mb-1">Diseños oficiales</h4>
                <p className="text-sm text-gray-500">Álbumes oficiales de tus animes favoritos.</p>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-12 bg-[#0a0515] border border-purple-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(88,28,135,0.15)] relative overflow-hidden">
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" />
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-wide mb-2">¿NO SABES QUÉ ÁLBUM ELEGIR?</h3>
              <p className="text-gray-400">Te ayudamos a encontrar el álbum perfecto para tu colección.</p>
            </div>
            <Link 
              href="/guia-albumes" 
              className="relative z-10 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl whitespace-nowrap shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
            >
              VER GUÍA DE ÁLBUMES &rarr;
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
