import { CollectionsHeader } from '@/features/collections/components/CollectionsHeader'
import { CollectionsClient } from '@/features/collections/components/CollectionsClient'
import { UpcomingReleases } from '@/features/collections/components/UpcomingReleases'
import { CollectionsCTA } from '@/features/collections/components/CollectionsCTA'
import { getCollections, getUpcomingCollections, getCollectionStats } from '@/features/collections/services/collection.service'

export const metadata = {
  title: 'Colecciones | Ediciones Tio Sam',
  description: 'Explora todas las franquicias de anime disponibles en Ediciones Tio Sam.',
}

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function CollectionsPage() {
  // Fetch all data in parallel
  const [collections, upcomingCollections, stats] = await Promise.all([
    getCollections(),
    getUpcomingCollections(),
    getCollectionStats()
  ])

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Top Header Area with Real Stats */}
        <CollectionsHeader stats={stats} />

        {/* Main Content Area: Sidebar + Grid handled by Client Wrapper for filtering */}
        <CollectionsClient initialCollections={collections} />

        {/* Upcoming Collections at the bottom with real upcoming data */}
        <UpcomingReleases collections={upcomingCollections} />

        {/* Call to Action Banner right before the footer */}
        <CollectionsCTA />

      </div>
    </div>
  )
}
