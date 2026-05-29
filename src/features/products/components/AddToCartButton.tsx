'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import { Product } from '@/types/product'
import { useState } from 'react'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || '',
    })
    
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button 
      size="lg" 
      className={`w-full md:w-auto h-12 px-8 font-bold text-base shadow-lg transition-all ${
        isAdded ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'shadow-primary/20'
      }`}
      onClick={handleAddToCart}
      disabled={product.stock === 0}
    >
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock === 0 ? 'Out of Stock' : (isAdded ? 'Added to Cart!' : 'Add to Cart')}
    </Button>
  )
}
