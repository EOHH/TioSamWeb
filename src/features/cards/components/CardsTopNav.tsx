'use client'

import { LibrarySquare, Star, Zap, PackageCheck } from 'lucide-react'

export type TopFilter = 'Todas' | 'Comunes' | 'Raras' | 'Super Raras' | 'Ultra Raras' | 'Secretas'

interface CardsTopNavProps {
  activeFilter: TopFilter;
  setActiveFilter: (filter: TopFilter) => void;
  counts: Record<TopFilter, number>;
}

export function CardsTopNav({ activeFilter, setActiveFilter, counts }: CardsTopNavProps) {
  const filters: { name: TopFilter; icon: React.ElementType; colorClass: string; activeClass: string }[] = [
    { 
      name: 'Todas', 
      icon: LibrarySquare, 
      colorClass: 'text-purple-500',
      activeClass: 'border-purple-500 bg-purple-500/10'
    },
    { 
      name: 'Comunes', 
      icon: PackageCheck, 
      colorClass: 'text-gray-400',
      activeClass: 'border-gray-500 bg-gray-500/10'
    },
    { 
      name: 'Raras', 
      icon: Zap, 
      colorClass: 'text-blue-400',
      activeClass: 'border-blue-400 bg-blue-400/10'
    },
    { 
      name: 'Super Raras', 
      icon: Star, 
      colorClass: 'text-amber-500',
      activeClass: 'border-amber-500 bg-amber-500/10'
    },
    { 
      name: 'Ultra Raras', 
      icon: Zap, 
      colorClass: 'text-pink-500',
      activeClass: 'border-pink-500 bg-pink-500/10'
    },
    { 
      name: 'Secretas', 
      icon: Star, 
      colorClass: 'text-cyan-400',
      activeClass: 'border-cyan-400 bg-cyan-400/10'
    }
  ]

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 hide-scrollbar mb-6">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.name;
        
        return (
          <button
            key={filter.name}
            onClick={() => setActiveFilter(filter.name)}
            className={`flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all min-w-fit shrink-0 ${
              isActive 
                ? filter.activeClass 
                : 'border-white/5 bg-[#09090b] hover:bg-white/5'
            }`}
          >
            {/* Custom Icon Wrapper */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className={`absolute inset-0 opacity-20 ${isActive ? filter.colorClass.replace('text-', 'bg-') : 'bg-gray-500'} rotate-45 rounded-lg`} />
              <Icon className={`w-4 h-4 ${isActive ? filter.colorClass : 'text-gray-500'}`} />
            </div>
            <div className="flex flex-col text-left">
              <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {filter.name === 'Todas' ? 'Todas las cartas' : filter.name}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {counts[filter.name].toLocaleString()}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
