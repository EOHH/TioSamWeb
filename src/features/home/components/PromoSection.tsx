import Image from 'next/image'
import Link from 'next/link'
import { Truck, ShieldCheck, BadgeCheck, Headphones, ArrowRight } from 'lucide-react'

const features = [
  {
    title: 'ENVÍOS RÁPIDOS',
    subtitle: 'Recibe tus productos en 24-48 horas',
    icon: Truck,
  },
  {
    title: 'PAGOS SEGUROS',
    subtitle: 'Compra con total seguridad con métodos confiables',
    icon: ShieldCheck,
  },
  {
    title: 'PRODUCTOS ORIGINALES',
    subtitle: 'Todos nuestros productos son 100% originales',
    icon: BadgeCheck,
  },
  {
    title: 'ATENCIÓN AL CLIENTE',
    subtitle: 'Estamos para ayudarte en lo que necesites',
    icon: Headphones,
  },
]

export function PromoSection() {
  return (
    <section className="w-full">
      {/* Top Row: Trust Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div key={index} className="flex flex-row items-center px-5 py-6 bg-[#0a0a0a] rounded-2xl border border-white/5">
              <Icon className="text-[#8b5cf6] w-9 h-9 mr-4 shrink-0" strokeWidth={1.5} />
              <div className="flex flex-col">
                <h4 className="text-white font-bold uppercase text-[13px] mb-0.5">{feature.title}</h4>
                <p className="text-gray-400 text-[11px] leading-snug">{feature.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom Row: The CTA Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#240643] border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#240643] via-[#330a5c] to-[#421075] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center h-full min-h-[240px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center p-8 md:p-12 w-full md:w-1/2 lg:w-[55%] z-20">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-none tracking-tight">
              EMPIEZA TU COLECCIÓN HOY
            </h2>
            <p className="text-gray-300 mt-4 mb-8 text-sm md:text-base">
              Miles de cartas, álbumes y sorpresas te esperan.
            </p>
            <div>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 rounded-xl bg-[#8b5cf6] hover:bg-purple-500 transition-colors text-white font-bold text-sm shadow-lg group"
              >
                COMPRAR AHORA
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="absolute right-0 top-0 bottom-0 h-full w-full md:w-[60%] flex items-end justify-end pointer-events-none z-10">
            {/* Gradient mask for smooth blending on the left edge of the image */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#330a5c] to-transparent z-20 hidden md:block" />
            
            <div className="relative w-full h-full opacity-30 md:opacity-100">
              <Image
                src="/images/promo-banner.png"
                alt="Promo Banner"
                fill
                className="object-cover object-right md:object-right-bottom"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
