import { getFeaturedProducts, getAllProducts, getRareProducts } from '@/features/products/services/product.service'
import { getCategories } from '@/features/categories/services/category.service'
import { getCollections } from '@/features/collections/services/collection.service'
import { FeaturedCarousel, FeaturedCarouselSkeleton } from '@/features/products/components/FeaturedCarousel'
import { ProductShowcase, ProductShowcaseSkeleton } from '@/features/products/components/ProductShowcase'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { HeroBanner } from '@/features/home/components/HeroBanner'
import { FeaturedCollections } from '@/features/collections/components/FeaturedCollections'
import { CategoriesSection } from '@/features/home/components/CategoriesSection'
import { RareArticlesSection } from '@/features/home/components/RareArticlesSection'
import { PromoSection } from '@/features/home/components/PromoSection'

async function FeaturedSection() {
  const featuredProducts = await getFeaturedProducts()
  return <FeaturedCarousel products={featuredProducts} />
}

async function ShowcaseSection() {
  const allProducts = await getAllProducts()
  return <ProductShowcase products={allProducts} />
}

async function HomeCategoriesSection() {
  const categories = await getCategories()
  return <CategoriesSection categories={categories} />
}

async function HomeFeaturedCollections() {
  const collections = await getCollections()
  return <FeaturedCollections collections={collections} />
}

async function HomeRareSection() {
  const rareProducts = await getRareProducts()
  return <RareArticlesSection products={rareProducts} />
}

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Top Sections grouped for tighter spacing */}
      <div className="flex flex-col gap-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Featured Collections Section */}
        <Suspense fallback={<div className="h-[400px] w-full max-w-[1920px] mx-auto bg-[#111] animate-pulse rounded-2xl" />}>
          <HomeFeaturedCollections />
        </Suspense>

        {/* Featured Products Section */}
        <section className="max-w-[1920px] mx-auto w-full">
          <Suspense fallback={<FeaturedCarouselSkeleton />}>
            <FeaturedSection />
          </Suspense>
        </section>
        
        {/* Categories Section */}
        <section className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
          <Suspense fallback={<div className="h-[200px] bg-[#111111] animate-pulse rounded-2xl w-full" />}>
            <HomeCategoriesSection />
          </Suspense>
        </section>
        <section className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-8">
          <Suspense fallback={<div className="h-[400px] bg-[#111] animate-pulse rounded-2xl w-full" />}>
            <HomeRareSection />
          </Suspense>
        </section>
        <section className="max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 mt-12">
          <PromoSection />
        </section>
      </div>
    </div>
  )
}
