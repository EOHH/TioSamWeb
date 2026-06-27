'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import { CardsSidebar, CardsFilters } from './CardsSidebar'
import { CardsGrid } from './CardsGrid'
import { CardsTopNav, TopFilter } from './CardsTopNav'

interface CardsClientProps {
  initialProducts: Product[];
  collections: Collection[];
}

export function CardsClient({ initialProducts, collections }: CardsClientProps) {
  
  // States
  const [activeTopFilter, setActiveTopFilter] = useState<TopFilter>('Todas')
  const [sidebarFilters, setSidebarFilters] = useState<CardsFilters>({
    collections: [],
    minPrice: '',
    maxPrice: '',
    inStock: false,
    featured: false,
    isNew: false,
    rarities: [],
    conditions: [],
    characters: []
  })

  // Computed Counts for Top Nav
  const counts = useMemo(() => {
    return {
      Todas: initialProducts.length,
      'Comunes': initialProducts.filter(p => p.rarity === 'Común').length,
      'Raras': initialProducts.filter(p => p.rarity === 'Rara').length,
      'Super Raras': initialProducts.filter(p => p.rarity === 'Super Rara').length,
      'Ultra Raras': initialProducts.filter(p => p.rarity === 'Ultra Rara').length,
      'Secretas': initialProducts.filter(p => p.rarity === 'Secreta').length
    }
  }, [initialProducts])

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Top Nav Filter
    if (activeTopFilter === 'Comunes') result = result.filter(p => p.rarity === 'Común')
    else if (activeTopFilter === 'Raras') result = result.filter(p => p.rarity === 'Rara')
    else if (activeTopFilter === 'Super Raras') result = result.filter(p => p.rarity === 'Super Rara')
    else if (activeTopFilter === 'Ultra Raras') result = result.filter(p => p.rarity === 'Ultra Rara')
    else if (activeTopFilter === 'Secretas') result = result.filter(p => p.rarity === 'Secreta')

    // 2. Sidebar Filters
    if (sidebarFilters.collections.length > 0) {
      result = result.filter(p => p.collection_id && sidebarFilters.collections.includes(p.collection_id))
    }
    
    if (sidebarFilters.minPrice !== '') {
      result = result.filter(p => p.price >= parseFloat(sidebarFilters.minPrice))
    }

    if (sidebarFilters.maxPrice !== '') {
      result = result.filter(p => p.price <= parseFloat(sidebarFilters.maxPrice))
    }

    if (sidebarFilters.inStock) {
      result = result.filter(p => p.stock > 0)
    }

    if (sidebarFilters.featured) {
      result = result.filter(p => p.featured)
    }

    if (sidebarFilters.isNew) {
      result = result.filter(p => p.is_new)
    }
    
    if (sidebarFilters.rarities && sidebarFilters.rarities.length > 0) {
      result = result.filter(p => p.rarity && sidebarFilters.rarities!.includes(p.rarity))
    }
    
    if (sidebarFilters.conditions && sidebarFilters.conditions.length > 0) {
      result = result.filter(p => p.condition && sidebarFilters.conditions!.includes(p.condition))
    }
    
    if (sidebarFilters.characters && sidebarFilters.characters.length > 0) {
      result = result.filter(p => p.character_name && sidebarFilters.characters!.includes(p.character_name))
    }

    return result
  }, [initialProducts, activeTopFilter, sidebarFilters])

  const handleClearSidebarFilters = () => {
    setSidebarFilters({
      collections: [],
      minPrice: '',
      maxPrice: '',
      inStock: false,
      featured: false,
      isNew: false,
      rarities: [],
      conditions: [],
      characters: []
    })
  }

  return (
    <div className="w-full flex flex-col mb-16">
      {/* Top Nav (Replaces Rarity Pills from screenshot to adapt to real data) */}
      <CardsTopNav 
        activeFilter={activeTopFilter} 
        setActiveFilter={setActiveTopFilter} 
        counts={counts} 
      />

      {/* Main Content: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        <CardsSidebar 
          collections={collections} 
          filters={sidebarFilters} 
          setFilters={setSidebarFilters} 
          clearFilters={handleClearSidebarFilters} 
        />
        <CardsGrid 
          products={filteredProducts} 
          collections={collections} 
        />
      </div>
    </div>
  )
}
