import { notFound } from 'next/navigation'
import { getProductById } from '@/features/products/services/product.service'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Zap, Heart } from 'lucide-react'

export default async function CardDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    notFound()
  }

  // Helper function for rarity colors
  const getRarityColor = (rarity: string | null | undefined) => {
    switch (rarity) {
      case 'Secreta': return 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
      case 'Ultra Rara': return 'text-pink-500 border-pink-500/30 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
      case 'Super Rara': return 'text-amber-500 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
      case 'Rara': return 'text-blue-400 border-blue-400/30 bg-blue-400/10 shadow-[0_0_15px_rgba(96,165,250,0.3)]'
      default: return 'text-gray-400 border-gray-500/30 bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link 
          href="/cartas" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium tracking-wide">Volver a Cartas</span>
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Image Area */}
          <div className="relative flex justify-center items-center">
            {/* Massive Glowing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#111] flex items-center justify-center">
                  <span className="text-gray-500">Sin Imagen</span>
                </div>
              )}
              
              {/* Floating Heart */}
              <button className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all shadow-xl">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col justify-center">
            
            {/* Top Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.rarity && (
                <span className={`px-4 py-1.5 rounded-full border text-xs sm:text-sm font-black uppercase tracking-widest ${getRarityColor(product.rarity)}`}>
                  {product.rarity}
                </span>
              )}
              {product.condition && (
                <span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs sm:text-sm font-bold uppercase tracking-widest">
                  {product.condition}
                </span>
              )}
              {product.is_new && (
                <span className="px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 text-xs sm:text-sm font-black uppercase tracking-widest flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-cyan-400" /> NUEVA
                </span>
              )}
            </div>

            {/* Title & Collection */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-md">
              {product.name}
            </h1>
            
            {product.character_name && (
              <p className="text-xl text-purple-400 font-bold mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 fill-purple-400" /> 
                Personaje: {product.character_name}
              </p>
            )}

            {/* Price block */}
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-white/5">
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                S/ {product.price.toFixed(2)}
              </span>
              <span className={`text-sm font-bold pb-2 ${product.stock > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {product.stock > 0 ? `En Stock (${product.stock} disponibles)` : 'Agotado'}
              </span>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Descripción del Producto</h3>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                {product.description || 'No hay descripción disponible para este producto. Sin embargo, todas nuestras cartas son garantizadas 100% originales.'}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-lg py-5 px-8 rounded-2xl shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all transform hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-6 h-6" />
                {product.stock > 0 ? 'AÑADIR AL CARRITO' : 'AGOTADO'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">100% Original</h4>
                  <p className="text-gray-500 text-xs">Garantía Tio Sam</p>
                </div>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex items-center gap-3">
                <Zap className="w-8 h-8 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Envío Rápido</h4>
                  <p className="text-gray-500 text-xs">A todo el país</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
