import { getFeaturedProducts } from '@/features/products/services/product.service'
import { ProductCard } from '@/features/products/components/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        
        {/* Abstract shapes for anime vibe */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-destructive/10 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-primary/20 text-sm font-medium text-primary mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>New arrivals are here</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Unleash Your Inner Otaku
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover premium anime cards, exclusive figures, and rare sticker albums. The ultimate collection for true fans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-bold shadow-lg shadow-primary/25" asChild>
              <Link href="/cards">
                Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary/50 hover:bg-primary/10" asChild>
              <Link href="/new">View New Releases</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10 border-b border-border/50 pb-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-primary">Featured Items</h2>
            <p className="text-muted-foreground">Handpicked selections for your collection</p>
          </div>
          <Button variant="ghost" className="hidden sm:flex hover:bg-primary/10 hover:text-primary" asChild>
            <Link href="/all">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/all">View All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
