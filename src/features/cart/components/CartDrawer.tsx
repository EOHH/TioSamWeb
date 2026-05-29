'use client'

import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import { useStore } from '@/hooks/useStore'
import { useEffect } from 'react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  // Use the safe hydration hook
  const cartState = useStore(useCartStore, (state) => state)

  // Prevent hydration mismatch by rendering nothing on server/initial mount
  if (cartState === undefined) return null

  const { items, updateQuantity, removeItem, totalPrice } = cartState

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose} 
      />
      
      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-card border-l border-border/50 shadow-2xl shadow-primary/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-primary">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
              <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 p-4 rounded-xl bg-secondary/20 border border-border/30">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary/50 flex-shrink-0">
                    <Image
                      src={item.image || '/placeholder.png'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <p className="font-bold whitespace-nowrap text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-background rounded-md border border-border/50 p-1">
                        <button 
                          className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          className="p-1 hover:text-primary transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-border/50 bg-secondary/10 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-primary">${totalPrice().toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">Taxes and shipping calculated at checkout.</p>
            <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
