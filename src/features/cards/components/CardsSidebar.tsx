'use client'

import { SlidersHorizontal, Search, RefreshCw, Check } from 'lucide-react'
import { Collection } from '@/types/collection'

export interface CardsFilters {
  collections: string[]; // UUIDs
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  rarities?: string[];
  conditions?: string[];
  characters?: string[];
}

interface CardsSidebarProps {
  collections: Collection[];
  filters: CardsFilters;
  setFilters: React.Dispatch<React.SetStateAction<CardsFilters>>;
  clearFilters: () => void;
}

export function CardsSidebar({ collections, filters, setFilters, clearFilters }: CardsSidebarProps) {
  
  const toggleCollection = (id: string) => {
    setFilters(prev => ({
      ...prev,
      collections: prev.collections.includes(id) 
        ? prev.collections.filter(c => c !== id) 
        : [...prev.collections, id]
    }))
  }

  const activeFiltersCount = 
    filters.collections.length + 
    (filters.minPrice !== '' || filters.maxPrice !== '' ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.isNew ? 1 : 0) +
    (filters.rarities?.length || 0) +
    (filters.conditions?.length || 0) +
    (filters.characters?.length || 0)

  const toggleArrayFilter = (field: 'rarities' | 'conditions' | 'characters', value: string) => {
    setFilters(prev => {
      const current = prev[field] || [];
      return {
        ...prev,
        [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value]
      }
    })
  }

  return (
    <div className="w-full lg:w-72 shrink-0 flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
          Filtrar Cartas <SlidersHorizontal className="w-4 h-4 text-purple-500" />
        </h3>
        {activeFiltersCount > 0 && (
          <span className="text-[10px] bg-purple-500 text-white px-2 py-0.5 rounded-full font-bold">
            {activeFiltersCount}
          </span>
        )}
      </div>

      {/* Collections Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Colección</h4>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input 
            type="text" 
            placeholder="Buscar colección..." 
            className="w-full bg-[#09090b] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 mt-2 max-h-48 overflow-y-auto hide-scrollbar">
          {collections.map(col => {
            const isChecked = filters.collections.includes(col.id);
            return (
              <label key={col.id} className="flex items-center justify-between cursor-pointer group" onClick={() => toggleCollection(col.id)}>
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                    isChecked ? 'bg-purple-600 border-purple-600' : 'border-white/20 bg-[#09090b] group-hover:border-purple-500'
                  }`}>
                    {isChecked && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-sm ${isChecked ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                    {col.name}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Price Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Precio</h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">S/</span>
            <input 
              type="number" 
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              className="w-full bg-[#09090b] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <span className="text-gray-600">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">S/</span>
            <input 
              type="number" 
              placeholder="500+"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              className="w-full bg-[#09090b] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Availability Filter (replaces Condition/Character/Rarity) */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Disponibilidad</h4>
        <div className="flex flex-col gap-2">
          
          <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setFilters(prev => ({...prev, inStock: !prev.inStock}))}>
            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
              filters.inStock ? 'bg-purple-600 border-purple-600' : 'border-white/20 bg-[#09090b] group-hover:border-purple-500'
            }`}>
              {filters.inStock && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${filters.inStock ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>En Stock</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setFilters(prev => ({...prev, featured: !prev.featured}))}>
            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
              filters.featured ? 'bg-amber-500 border-amber-500' : 'border-white/20 bg-[#09090b] group-hover:border-amber-500'
            }`}>
              {filters.featured && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${filters.featured ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>Destacadas</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group" onClick={() => setFilters(prev => ({...prev, isNew: !prev.isNew}))}>
            <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
              filters.isNew ? 'bg-cyan-400 border-cyan-400' : 'border-white/20 bg-[#09090b] group-hover:border-cyan-400'
            }`}>
              {filters.isNew && <Check className="w-3 h-3 text-white" />}
            </div>
            <span className={`text-sm ${filters.isNew ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>Novedades</span>
          </label>

        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Rarity Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Rareza</h4>
        <div className="flex flex-col gap-2">
          {['Común', 'Rara', 'Super Rara', 'Ultra Rara', 'Secreta'].map(rarity => {
            const isChecked = filters.rarities?.includes(rarity);
            return (
              <label key={rarity} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-purple-600 border-purple-600' : 'border-white/20 bg-[#09090b] group-hover:border-purple-500'
                }`}>
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${isChecked ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{rarity}</span>
                <input type="checkbox" className="hidden" checked={isChecked || false} onChange={() => toggleArrayFilter('rarities', rarity)} />
              </label>
            )
          })}
        </div>
      </div>

      <div className="w-full h-px bg-white/5" />

      {/* Condition Filter */}
      <div className="flex flex-col gap-3">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Estado</h4>
        <div className="flex flex-col gap-2">
          {['Mint', 'Near Mint', 'Good', 'Damaged'].map(cond => {
            const isChecked = filters.conditions?.includes(cond);
            return (
              <label key={cond} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${
                  isChecked ? 'bg-purple-600 border-purple-600' : 'border-white/20 bg-[#09090b] group-hover:border-purple-500'
                }`}>
                  {isChecked && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${isChecked ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>{cond}</span>
                <input type="checkbox" className="hidden" checked={isChecked || false} onChange={() => toggleArrayFilter('conditions', cond)} />
              </label>
            )
          })}
        </div>
      </div>

      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <button 
          onClick={clearFilters}
          className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors text-sm font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          Limpiar filtros
        </button>
      )}

    </div>
  )
}
