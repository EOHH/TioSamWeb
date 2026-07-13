'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FavoriteButtonProps {
  productId: string
  className?: string
}

export function FavoriteButton({ productId, className }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault() // prevent triggering Link navigation if inside one
    e.stopPropagation()
    // TODO: Connect with Supabase
    setIsFavorite(!isFavorite)
  }

  return (
    <button
      onClick={toggleFavorite}
      className={cn(
        "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-30 shadow-md",
        isFavorite 
          ? "bg-purple-600 text-white" 
          : "bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 border border-white/10",
        className
      )}
      aria-label="Toggle favorite"
    >
      <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
    </button>
  )
}
