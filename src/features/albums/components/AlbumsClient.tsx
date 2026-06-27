'use client'

import { useState, useMemo } from 'react'
import { Product } from '@/types/product'
import { Collection } from '@/types/collection'
import { AlbumsSidebar, AlbumsFilters } from './AlbumsSidebar'
import { AlbumsGrid } from './AlbumsGrid'
import { AlbumsTopNav, AlbumTopFilter } from './AlbumsTopNav'

interface AlbumsClientProps {
  initialProducts: Product[];
  collections: Collection[];
}

export function AlbumsClient({ initialProducts, collections }: AlbumsClientProps) {
  
  // States
  const [activeTopFilter, setActiveTopFilter] = useState<AlbumTopFilter>('Todos')
  const [sidebarFilters, setSidebarFilters] = useState<AlbumsFilters>({
    collections: [],
    minPrice: '',
    maxPrice: '',
    inStock: false,
    featured: false,
    isNew: false
  })

  // Computed Counts for Top Nav
  const counts = useMemo(() => {
    return {
      Todos: initialProducts.length,
      'Destacados': initialProducts.filter(p => p.featured).length,
      'Novedades': initialProducts.filter(p => p.is_new).length
    }
  }, [initialProducts])

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]

    // 1. Top Nav Filter
    if (activeTopFilter === 'Destacados') result = result.filter(p => p.featured)
    else if (activeTopFilter === 'Novedades') result = result.filter(p => p.is_new)

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

    return result
  }, [initialProducts, activeTopFilter, sidebarFilters])

  const handleClearSidebarFilters = () => {
    setSidebarFilters({
      collections: [],
      minPrice: '',
      maxPrice: '',
      inStock: false,
      featured: false,
      isNew: false
    })
  }

  return (
    <div className="w-full flex flex-col mb-16">
      {/* Top Nav */}
      <AlbumsTopNav 
        activeFilter={activeTopFilter} 
        setActiveFilter={setActiveTopFilter} 
        counts={counts} 
      />

      {/* Main Content: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        <AlbumsSidebar 
          collections={collections} 
          filters={sidebarFilters} 
          setFilters={setSidebarFilters} 
          clearFilters={handleClearSidebarFilters} 
        />
        <AlbumsGrid 
          products={filteredProducts} 
          collections={collections} 
        />
      </div>
    </div>
  )
}
