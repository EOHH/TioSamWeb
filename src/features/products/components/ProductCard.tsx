'use client'

import Image from 'next/image'
import { Product } from '@/types/product'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || '',
    })
  }

  return (
    <Card className="overflow-hidden group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-md hover:shadow-primary/10">
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <Image
          src={product.image_url || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.is_new && <Badge variant="default" className="bg-primary hover:bg-primary">New</Badge>}
          {product.stock < 10 && <Badge variant="destructive">Low Stock</Badge>}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-xs text-primary mb-1 uppercase tracking-wider font-semibold">{product.category_id || 'Item'}</p>
            <h3 className="font-bold leading-tight line-clamp-2" title={product.name}>
              {product.name}
            </h3>
          </div>
          <span className="font-bold text-lg whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full gap-2 font-semibold"
          disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  )
}
