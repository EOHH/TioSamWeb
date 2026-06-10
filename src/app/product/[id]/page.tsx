import { getProductById } from '@/features/products/services/product.service'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { AddToCartButton } from '@/features/products/components/AddToCartButton'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return {
      title: 'Product Not Found | Ediciones Tio Sam'
    }
  }

  return {
    title: `${product.name} | Ediciones Tio Sam`,
    description: product.description || `Buy ${product.name} at Ediciones Tio Sam.`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Image Gallery */}
        <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-secondary/20 border border-border/50 shadow-2xl shadow-primary/5">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.is_new && <Badge className="bg-primary px-3 py-1 text-sm shadow-lg">New Arrival</Badge>}
            {product.stock > 0 && product.stock < 10 && (
              <Badge variant="destructive" className="px-3 py-1 text-sm shadow-lg">Only {product.stock} left!</Badge>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {product.category_id || 'Uncategorized'}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-foreground">
              S/ {product.price.toFixed(2)}
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description || 'No description available for this premium collectible.'}
            </p>
          </div>

          <div className="pt-6 border-t border-border/50 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-sm font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
                  Out of Stock
                </span>
              )}
            </div>

            <AddToCartButton product={product} />
          </div>

          {/* Authentic Guarantee Banner */}
          <div className="mt-12 p-6 rounded-xl bg-secondary/30 border border-border/50 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h4 className="font-bold text-foreground">100% Authentic Guarantee</h4>
              <p className="text-sm text-muted-foreground mt-1">All our collectibles are verified and shipped securely.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
