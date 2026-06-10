export const metadata = {
  title: "Términos y Condiciones | Ediciones Tio Sam",
  description: "Términos y condiciones de uso de la plataforma Ediciones Tio Sam.",
};

export default function TerminosPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Términos y Condiciones</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString('es-PE')}</p>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introducción</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bienvenido a Ediciones Tio Sam. Al acceder y utilizar este sitio web, aceptas cumplir con los siguientes términos y condiciones de uso, que junto con nuestra política de privacidad rigen la relación de Ediciones Tio Sam contigo en relación con este sitio web. Si no estás de acuerdo con alguna parte de estos términos y condiciones, no utilices nuestro sitio web.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Uso del Sitio Web</h2>
          <p className="text-muted-foreground leading-relaxed">
            El contenido de las páginas de este sitio web es para tu información general y uso exclusivo. Está sujeto a cambios sin previo aviso. Ni nosotros ni ningún tercero garantizamos la exactitud, puntualidad, rendimiento, integridad o idoneidad de la información y los materiales encontrados u ofrecidos en este sitio web para cualquier propósito particular.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Compras y Pagos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Al realizar una compra, te comprometes a proporcionar información actual, completa y precisa para todas las compras realizadas en nuestra tienda. Nos reservamos el derecho de rechazar cualquier pedido que realices con nosotros. Para tu seguridad, los pagos son procesados a través de pasarelas de pago seguras y autorizadas.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Propiedad Intelectual</h2>
          <p className="text-muted-foreground leading-relaxed">
            Todo el material incluido en este sitio web es propiedad nuestra o tiene licencia para nosotros. Este material incluye, pero no se limita a, el diseño, la apariencia y los gráficos. Queda prohibida la reproducción salvo de acuerdo con el aviso de derechos de autor, que forma parte de estos términos y condiciones.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Ley Aplicable</h2>
          <p className="text-muted-foreground leading-relaxed">
            Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República del Perú. Cualquier disputa que surja en relación con estos términos y condiciones estará sujeta a la jurisdicción exclusiva de los tribunales competentes de Perú.
          </p>
        </section>
      </div>
    </div>
  );
}
