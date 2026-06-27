import { CardsHeader } from '@/features/cards/components/CardsHeader'
import { CardsClient } from '@/features/cards/components/CardsClient'
import { getProductsByCategorySlug } from '@/features/products/services/product.service'
import { getCollections } from '@/features/collections/services/collection.service'

export const metadata = {
  title: 'Cartas - Ediciones Tio Sam',
  description: 'Encuentra las cartas más épicas de tus animes favoritos. Originales y con envío seguro.',
}

export const revalidate = 0 // Disable cache to see database changes instantly

export default async function CardsPage() {
  
  // Fetch products and collections in parallel for maximum speed
  const [products, collections] = await Promise.all([
    getProductsByCategorySlug('cards'),
    getCollections()
  ])

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-8">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Header with Galactic background */}
        <CardsHeader totalCards={products.length} />

        {/* Main Content Area: TopNav, Sidebar + Grid handled by Client Wrapper */}
        <CardsClient initialProducts={products} collections={collections} />

      </div>
    </div>
  )
}
