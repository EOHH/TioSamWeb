'use client'

import { useState, useMemo } from 'react'
import { CollectionWithCount } from '@/types/collection'
import { CollectionsGrid } from './CollectionsGrid'

interface CollectionsClientProps {
  initialCollections: CollectionWithCount[]
}

export type QuickFilter = 'Todos' | 'Destacados' | 'Lanzamientos Recientes' | 'Catálogos Grandes'

export function CollectionsClient({ initialCollections }: CollectionsClientProps) {
  const [activeFilter, setActiveFilter] = useState<QuickFilter>('Todos')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Popularidad')

  // Derive filtered collections
  const filteredCollections = useMemo(() => {
    let result = [...initialCollections]

    // 1. Apply Quick Pill Filter
    if (activeFilter === 'Destacados') {
      result = result.filter(c => c.is_featured === true)
    } else if (activeFilter === 'Lanzamientos Recientes') {
      // Sort by created_at descending (newest first)
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (activeFilter === 'Catálogos Grandes') {
      // Filter collections with > 10 products
      result = result.filter(c => {
        const count = c.products && c.products.length > 0 ? c.products[0].count : 0
        return count >= 10
      })
    }

    // 2. Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase()
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        (c.description && c.description.toLowerCase().includes(q))
      )
    }

    // 3. Sort
    if (sortBy === 'A - Z') {
      result.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'Z - A') {
      result.sort((a, b) => b.name.localeCompare(a.name))
    } else if (sortBy === 'Popularidad') {
      // If Popularidad, maybe sort by product count as a mock for popularity
      result.sort((a, b) => {
        const countA = a.products && a.products.length > 0 ? a.products[0].count : 0
        const countB = b.products && b.products.length > 0 ? b.products[0].count : 0
        return countB - countA
      })
    }

    return result
  }, [initialCollections, activeFilter, searchQuery, sortBy])

  return (
    <div className="w-full mt-8">
      {/* Grid Area */}
      <CollectionsGrid 
        collections={filteredCollections} 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
    </div>
  )
}
