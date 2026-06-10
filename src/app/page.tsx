import { getFeaturedProducts, getAllProducts } from '@/features/products/services/product.service'
import { FeaturedCarousel, FeaturedCarouselSkeleton } from '@/features/products/components/FeaturedCarousel'
import { ProductShowcase, ProductShowcaseSkeleton } from '@/features/products/components/ProductShowcase'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HeroBanner } from '@/features/home/components/HeroBanner'
import { FeaturedCollections } from '@/features/collections/components/FeaturedCollections'

async function FeaturedSection() {
  const featuredProducts = await getFeaturedProducts()
  return <FeaturedCarousel products={featuredProducts} />
}

async function ShowcaseSection() {
  const allProducts = await getAllProducts()
  return <ProductShowcase products={allProducts} />
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Top Sections grouped for tighter spacing */}
      <div className="flex flex-col gap-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Featured Collections Section */}
        <FeaturedCollections />

        {/* Featured Products Section */}
        <section className="max-w-[100rem] mx-auto w-full">
          <Suspense fallback={<FeaturedCarouselSkeleton />}>
            <FeaturedSection />
          </Suspense>
        </section>
      </div>
    </div>
  )
}
