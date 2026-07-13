import { cn } from "@/lib/utils"
import { ShieldCheck, Star, Sparkles } from 'lucide-react'

export type AlbumTopFilter = 'Todos' | 'Destacados' | 'Novedades'

interface AlbumsTopNavProps {
  activeFilter: AlbumTopFilter
  setActiveFilter: (filter: AlbumTopFilter) => void
  counts: Record<AlbumTopFilter, number>
}

export function AlbumsTopNav({ activeFilter, setActiveFilter, counts }: AlbumsTopNavProps) {
  const tabs = [
    { id: 'Todos' as AlbumTopFilter, label: 'Todos los álbumes', icon: ShieldCheck },
    { id: 'Destacados' as AlbumTopFilter, label: 'Destacados', icon: Star },
    { id: 'Novedades' as AlbumTopFilter, label: 'Novedades', icon: Sparkles }
  ]

  return (
    <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 hide-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab.id
        const Icon = tab.icon
        return (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={cn(
              "px-5 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-3 border",
              isActive 
                ? "bg-[#2e1065]/40 border-purple-500/50 text-white shadow-[0_0_20px_rgba(109,40,217,0.2)]" 
                : "bg-black border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10"
            )}
          >
            <Icon className={cn("w-4 h-4", isActive ? "text-purple-400" : "text-gray-500")} />
            <div className="flex flex-col items-start">
              <span className="leading-none mb-1">{tab.label}</span>
              <span className={cn(
                "text-[10px] font-medium leading-none",
                isActive ? "text-purple-300" : "text-gray-500"
              )}>
                {counts[tab.id]} {counts[tab.id] === 1 ? 'álbum' : 'álbumes'}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
