'use client'

import { Bell } from 'lucide-react'
import { Collection } from '@/types/collection'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface UpcomingReleasesProps {
  collections: Collection[]
}

export function UpcomingReleases({ collections }: UpcomingReleasesProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="w-full mt-32 mb-16">
      
      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-purple-600 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          PRÓXIMOS LANZAMIENTOS
        </h2>
      </div>

      {/* Cinematic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {collections.map((collection, index) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.slug || collection.id}`}
            className="block focus:outline-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group overflow-hidden rounded-[20px] bg-[#0a0a0a] border border-white/5 cursor-pointer shadow-lg"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111]">
                {/* Background Image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${collection.banner_url || collection.image_url || '/images/placeholder.jpg'}')` }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  whileHover={{ scale: 1.1 }}
                />
                
                {/* Dark Gradient overlay for perfect text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* NEON Tag */}
                <div className="absolute top-4 left-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-purple-600 blur-md opacity-60" />
                    <span className="relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg flex items-center shadow-xl">
                      Próximamente
                    </span>
                  </div>
                </div>

                {/* Notify Bell Button */}
                <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 z-10 group/bell">
                  <Bell className="w-4 h-4 group-hover/bell:scale-110 transition-transform" />
                </button>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-5 flex flex-col">
                  {collection.genre && (
                    <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-80">
                      {collection.genre}
                    </span>
                  )}
                  <h3 className="text-white font-black text-lg md:text-xl leading-tight mb-2 group-hover:text-purple-400 transition-colors duration-300">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="text-gray-300 text-xs md:text-sm line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 text-shadow-sm">
                      {collection.description}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  )
}
