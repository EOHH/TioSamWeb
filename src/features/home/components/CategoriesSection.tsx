'use client'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { Category } from '@/features/categories/services/category.service'

const staticCategoryData: Record<string, { subtitle: string, image: string }> = {
  cards: {
    subtitle: 'Encuentra las cartas más épicas',
    image: '/images/categories/cards.png',
  },
  albums: {
    subtitle: 'Completa tu colección con estilo',
    image: '/images/categories/albums.png',
  },
  sobres: {
    subtitle: 'La emoción de abrir nuevas sorpresas',
    image: '/images/categories/sobres.png',
  },
  figures: {
    subtitle: 'Descubre las mejores figuras',
    image: '/images/categories/figures.png',
  },
}

interface CategoriesSectionProps {
  categories?: Category[];
}

export function CategoriesSection({ categories = [] }: CategoriesSectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (slug: string) => {
    // Check if category is already active (optional logic, but useful)
    // We just execute the requested push
    router.push(`/?category=${slug}`, { scroll: false })
  }

  // Use either fetched categories or fallback to static ones if DB is empty/failing
  const displayCategories = categories && categories.length > 0 
    ? categories 
    : [
        { id: '1', name: 'CARTAS', slug: 'cards' },
        { id: '2', name: 'ÁLBUMES', slug: 'albums' },
        { id: '3', name: 'SOBRES', slug: 'sobres' },
        { id: '4', name: 'FIGURAS', slug: 'figures' },
      ];

  return (
    <section className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-white uppercase border-l-4 border-[#7c3aed] pl-3">
          CATEGORÍAS
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {displayCategories.map((category) => {
          const staticData = staticCategoryData[category.slug] || {
            subtitle: 'Explora nuestra colección',
            image: `/images/categories/${category.slug}.png`,
          };
          
          const isActive = searchParams.get('category') === category.slug;

          return (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`group block w-full text-left relative overflow-hidden bg-[#111111] rounded-2xl border transition-all duration-500 min-h-[180px] md:min-h-[220px] ${
                isActive ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'border-white/5 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]'
              }`}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-transparent opacity-50 pointer-events-none" />

              {/* Content Container */}
              <div className="relative z-10 flex h-full justify-between items-center p-6 md:p-8 lg:p-10">
                
                {/* Left Content */}
                <div className="flex flex-col h-full justify-center max-w-[50%] z-20">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300/80 mb-6 drop-shadow font-medium">
                    {staticData.subtitle}
                  </p>
                  <div className="mt-auto">
                    <div className={`inline-flex bg-[#7c3aed] rounded-full p-2.5 transition-transform duration-300 shadow-lg shadow-purple-900/50 ${
                      isActive ? 'translate-x-2' : 'group-hover:translate-x-2'
                    }`}>
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Right Content - Image */}
                <div className="absolute right-0 bottom-0 top-0 w-[55%] flex items-end justify-end z-0 pointer-events-none overflow-visible">
                  <div className={`relative w-full h-[120%] -right-2 md:-right-6 transition-transform duration-700 ease-out origin-bottom-right ${
                    isActive ? 'scale-110 translate-y-[-5%]' : 'group-hover:scale-110 group-hover:translate-y-[-5%]'
                  }`}>
                    <Image
                      src={staticData.image}
                      alt={category.name}
                      fill
                      className="object-contain object-bottom md:object-right-bottom drop-shadow-2xl"
                      sizes="(max-width: 768px) 50vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  )
}
