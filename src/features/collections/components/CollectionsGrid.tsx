'use client'

import { Search, ChevronDown, ArrowRight, Star, Zap, Package2 } from 'lucide-react'
import { CollectionWithCount } from '@/types/collection'
import Link from 'next/link'
import { QuickFilter } from './CollectionsClient'

interface CollectionsGridProps {
  collections: CollectionWithCount[]
  activeFilter: QuickFilter
  setActiveFilter: (filter: QuickFilter) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  sortBy: string
  setSortBy: (sort: string) => void
}

export function CollectionsGrid({ 
  collections, 
  activeFilter, 
  setActiveFilter,
  searchQuery, 
  setSearchQuery, 
  sortBy, 
  setSortBy 
}: CollectionsGridProps) {
  const filterPills: { name: QuickFilter, icon?: React.ElementType }[] = [
    { name: 'Todos' },
    { name: 'Destacados', icon: Star },
    { name: 'Lanzamientos Recientes', icon: Zap },
    { name: 'Catálogos Grandes', icon: Package2 }
  ]

  return (
    <div className="flex-1 flex flex-col gap-6 w-full">
      
      {/* Top Bar: Pills, Search, Sort */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 hide-scrollbar">
          {filterPills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <button
                key={i}
                className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeFilter === pill.name
                    ? 'bg-gradient-to-r from-[#8b5cf6] to-purple-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] border-transparent' 
                    : 'bg-[#111] text-gray-400 border border-white/5 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setActiveFilter(pill.name)}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {pill.name}
              </button>
            )
          })}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
          <div className="relative flex-1 xl:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Buscar colección..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
          </div>
          <div className="relative shrink-0 group">
            <button className="flex items-center gap-2 bg-[#111] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors">
              Ordenar por: <span className="text-white">{sortBy}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <div className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
              <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-t-xl" onClick={() => setSortBy('Popularidad')}>Popularidad</button>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5" onClick={() => setSortBy('A - Z')}>A - Z</button>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-b-xl" onClick={() => setSortBy('Z - A')}>Z - A</button>
            </div>
          </div>
        </div>

      </div>

      {/* Grid of Collections */}
      {collections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-[#111] border border-white/5 rounded-2xl w-full">
          <Search className="w-16 h-16 text-gray-600 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">No se encontraron colecciones</h3>
          <p className="text-gray-400 text-lg">Intenta ajustar tus filtros rápidos o término de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
          {collections.map((collection) => {
            // Safely get product count from joined relation
            const productCount = collection.products && collection.products.length > 0 
              ? collection.products[0].count 
              : 0;

            return (
              <Link 
                key={collection.id} 
                href={`/collections/${collection.slug || collection.id}`}
                className="group flex flex-col rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] relative cursor-pointer"
              >
                {/* Badge based on is_featured */}
                {collection.is_featured && (
                  <div className={`absolute top-3 right-3 w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center z-10 shadow-lg`}>
                    <Star className="w-4 h-4 text-white" fill="currentColor" />
                  </div>
                )}

                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111]">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${collection.image_url || '/images/placeholder.jpg'}')` }}
                  />
                  {/* Gradient Overlay for bottom text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent opacity-90" />
                  
                  {/* Content at Bottom of Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col">
                    <h3 className="text-white font-bold text-lg leading-tight mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium mb-3">
                      {productCount} productos
                    </p>
                    <div className="flex items-center text-[#8b5cf6] text-xs font-bold uppercase tracking-wide group-hover:text-purple-400 transition-colors">
                      Ver colección 
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

    </div>
  )
}
