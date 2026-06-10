export const metadata = {
  title: "Libro de Reclamaciones | Ediciones Tio Sam",
  description: "Libro de reclamaciones virtual conforme a lo establecido en el Código de Protección y Defensa del Consumidor de Perú.",
};

export default function ReclamacionesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-border/50">
        <div className="w-full md:w-auto p-4 bg-background border-2 border-primary rounded-lg text-center font-bold text-primary shadow-sm">
          LIBRO DE <br />RECLAMACIONES
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">Libro de Reclamaciones</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, esta institución cuenta con un Libro de Reclamaciones Virtual a su disposición.
          </p>
        </div>
      </div>

      <div className="bg-card text-card-foreground shadow-sm border border-border/50 rounded-xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-6">Hoja de Reclamación Virtual</h2>
          
          <form className="space-y-8">
            {/* Información del Consumidor */}
            <div>
              <h3 className="text-lg font-medium border-b border-border/40 pb-2 mb-5 text-primary">
                1. Identificación del Consumidor Reclamante
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium">Nombres y Apellidos *</label>
                  <input type="text" id="fullName" className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Ej. Juan Pérez" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="documentId" className="text-sm font-medium">DNI / CE *</label>
                  <input type="text" id="documentId" className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Número de documento" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Correo Electrónico *</label>
                  <input type="email" id="email" className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Teléfono / Celular</label>
                  <input type="tel" id="phone" className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Ej. 987654321" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="address" className="text-sm font-medium">Dirección Física</label>
                  <input type="text" id="address" className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Dirección completa" />
                </div>
              </div>
            </div>

            {/* Detalle del reclamo */}
            <div>
              <h3 className="text-lg font-medium border-b border-border/40 pb-2 mb-5 text-primary">
                2. Detalle de la Reclamación y Pedido del Consumidor
              </h3>
              
              <div className="space-y-5">
                <div className="space-y-3 bg-secondary/20 p-4 rounded-lg">
                  <label className="text-sm font-bold text-foreground">Tipo *</label>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="type" value="reclamo" className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300" defaultChecked />
                      <span className="text-sm">
                        <strong className="font-semibold text-foreground">Reclamo:</strong> Disconformidad relacionada a los productos o servicios ofrecidos.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="type" value="queja" className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <span className="text-sm">
                        <strong className="font-semibold text-foreground">Queja:</strong> Disconformidad no relacionada a los productos o servicios; o, malestar o descontento respecto a la atención al público.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium">Detalle (Descripción de lo ocurrido) *</label>
                  <textarea id="details" rows={5} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="Explique aquí los motivos de su queja o reclamo..." required></textarea>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="pedido" className="text-sm font-medium">Pedido del consumidor</label>
                  <textarea id="pedido" rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50" placeholder="¿Qué es lo que solicita? (Ej. Cambio de producto, devolución de dinero, etc.)"></textarea>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-border/40">
              <button type="button" className="w-full md:w-auto md:min-w-[250px] mx-auto flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-md">
                Enviar Formulario
              </button>
              <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed max-w-2xl mx-auto">
                La formulación del reclamo no impide acudir a otras vías de solución de controversias ni es requisito previo para interponer una denuncia ante el INDECOPI. <br/>
                El proveedor debe dar respuesta al reclamo en un plazo no mayor a quince (15) días hábiles improrrogables.<br/>
                <span className="text-red-500/80">* Campos obligatorios.</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
