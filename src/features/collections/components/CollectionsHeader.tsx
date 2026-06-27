import { Package2, Library, Star, Zap } from 'lucide-react'
import { CollectionStats } from '@/types/collection'

interface CollectionsHeaderProps {
  stats: CollectionStats
}

export function CollectionsHeader({ stats }: CollectionsHeaderProps) {
  const statCards = [
    {
      value: stats.totalActive.toString(),
      label: 'Colecciones\ndisponibles',
      icon: Package2,
      color: 'text-purple-500'
    },
    {
      value: `${stats.totalProducts}+`,
      label: 'Productos\nen catálogo',
      icon: Library,
      color: 'text-purple-400'
    },
    {
      value: `${stats.totalExclusive}+`,
      label: 'Ediciones\nexclusivas',
      icon: Star,
      color: 'text-purple-500'
    },
    {
      value: 'Nuevas',
      label: 'Colecciones\ncada mes',
      icon: Zap,
      color: 'text-purple-400'
    }
  ]

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 w-full">
      {/* Title & Subtitle */}
      <div className="flex flex-col max-w-sm">
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
          COLECCIONES
        </h1>
        <p className="text-gray-400 text-sm md:text-base leading-snug">
          Explora todas las franquicias<br />de anime disponibles.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5 flex-1 max-w-4xl">
        {statCards.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div 
              key={i} 
              className="flex items-center gap-4 bg-[#0d0d0f] border border-white/5 rounded-2xl p-4 md:p-5"
            >
              <Icon className={`w-8 h-8 ${stat.color} shrink-0`} strokeWidth={1.5} />
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl md:text-2xl leading-none mb-1">{stat.value}</span>
                <span className="text-gray-500 text-[10px] md:text-[11px] leading-tight uppercase font-medium whitespace-pre-line">
                  {stat.label}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
