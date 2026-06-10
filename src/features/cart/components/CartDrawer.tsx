'use client'

import { X, Plus, Minus, Trash2, ShoppingCart, CheckCircle2, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/useCartStore'
import { useStore } from '@/hooks/useStore'
import { useEffect, useState } from 'react'
import { CulqiCheckoutButton } from '@/features/checkout/components/CulqiCheckoutButton'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [isSuccess, setIsSuccess] = useState(false)

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

  const handleClose = () => {
    onClose()
    // Reset success state after drawer closing animation finishes
    setTimeout(() => setIsSuccess(false), 300)
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={handleClose} 
      />
      
      {/* Drawer Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-50 h-[100dvh] w-[85vw] sm:w-[400px] bg-card border-l border-border/50 shadow-2xl shadow-primary/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50">
          <h2 className="text-xl font-bold tracking-tight text-primary">Tu Carrito</h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>

        {isSuccess ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="h-24 w-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center relative shadow-lg shadow-green-500/10 mb-4">
              <CheckCircle2 className="h-12 w-12" />
              <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-primary animate-pulse" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-black text-foreground tracking-tight">¡Pago Exitoso!</h2>
              <p className="text-muted-foreground text-lg px-2">
                Tu orden ha sido procesada. En breve recibirás un correo con los detalles de tu compra.
              </p>
            </div>
            <div className="w-full mt-8 p-6">
              <Button 
                onClick={handleClose}
                className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform"
              >
                Seguir Comprando
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Tu carrito está vacío.</p>
              <Button variant="outline" onClick={onClose}>Seguir Comprando</Button>
            </div>
          ) : (
            <ul className="space-y-4 sm:space-y-6 overflow-x-hidden">
              {items.map((item, index) => (
                <li 
                  key={item.id} 
                  className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-secondary/20 border border-border/30 transition-all duration-500 ease-out ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${isOpen ? index * 50 : 0}ms` }}
                >
                  <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden bg-secondary/50 flex-shrink-0">
                    <Image
                      src={item.image_url || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex justify-between gap-2 items-start">
                      <h3 className="font-semibold text-sm line-clamp-2 break-words leading-tight" title={item.name}>{item.name}</h3>
                      <p className="font-bold whitespace-nowrap text-primary flex-shrink-0">S/ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 sm:gap-2 bg-background rounded-md border border-border/50 p-1">
                        <button 
                          className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-semibold w-4 sm:w-6 text-center">{item.quantity}</span>
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
              <div className="mt-auto shrink-0 p-4 sm:p-6 border-t border-border/50 bg-secondary/10 space-y-4">
                <div className="flex items-center justify-between font-medium">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-lg font-bold text-primary">S/ {totalPrice().toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">Impuestos y envío calculados al finalizar la compra.</p>
                <CulqiCheckoutButton amount={totalPrice()} onSuccess={() => setIsSuccess(true)} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
