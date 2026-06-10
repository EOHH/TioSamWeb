import React from 'react'
import { cn } from '@/lib/utils'

interface ProductSkeletonProps {
  className?: string
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-2xl bg-[#121212] border border-white/5 overflow-hidden relative",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer",
        "before:bg-gradient-to-r before:from-transparent before:via-purple-500/10 before:to-transparent before:z-10",
        className
      )}
    >
      {/* Image Placeholder */}
      <div className="w-full aspect-square bg-white/5" />

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 p-5 pt-4">
        {/* Category & Title */}
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-purple-500/20 rounded w-1/3 mb-2" />
            <div className="h-4 bg-white/10 rounded-md w-3/4" />
            <div className="h-4 bg-white/10 rounded-md w-1/2" />
          </div>
          {/* Price */}
          <div className="h-5 bg-white/10 rounded-md w-16" />
        </div>

        {/* Description Placeholder */}
        <div className="space-y-2 mb-5 flex-1 mt-2">
          <div className="h-3 bg-white/5 rounded-md w-full" />
          <div className="h-3 bg-white/5 rounded-md w-4/5" />
        </div>

        {/* Button Placeholder */}
        <div className="mt-auto pt-2">
          <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5" />
        </div>
      </div>
    </div>
  )
}
