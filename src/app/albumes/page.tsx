import { getProductsByCategorySlug } from '@/features/products/services/product.service'
import { getCollections } from '@/features/collections/services/collection.service'
import { AlbumsHeader } from '@/features/albums/components/AlbumsHeader'
import { AlbumsClient } from '@/features/albums/components/AlbumsClient'

export const revalidate = 60 // Revalidate every minute

export default async function AlbumsPage() {
  const [albums, collections] = await Promise.all([
    getProductsByCategorySlug('albums'),
    getCollections()
  ])

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <AlbumsHeader totalAlbums={albums.length} />
        
        <div className="mt-8">
          <AlbumsClient 
            initialProducts={albums} 
            collections={collections}
          />
        </div>
      </div>
    </main>
  )
}
