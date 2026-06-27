import { cn } from "@/lib/utils"

export type AlbumTopFilter = 'Todos' | 'Destacados' | 'Novedades'

interface AlbumsTopNavProps {
  activeFilter: AlbumTopFilter
  setActiveFilter: (filter: AlbumTopFilter) => void
  counts: Record<AlbumTopFilter, number>
}

export function AlbumsTopNav({ activeFilter, setActiveFilter, counts }: AlbumsTopNavProps) {
  const tabs: AlbumTopFilter[] = ['Todos', 'Destacados', 'Novedades']

  return (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeFilter === tab
        return (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2",
              isActive 
                ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(52,211,153,0.4)]" 
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
            )}
          >
            {tab}
            <span className={cn(
              "px-1.5 py-0.5 rounded-md text-[10px]",
              isActive ? "bg-black/20 text-white" : "bg-white/10 text-gray-400"
            )}>
              {counts[tab]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
