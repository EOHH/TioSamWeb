export const metadata = {
  title: "Políticas de Devolución | Ediciones Tio Sam",
  description: "Conoce nuestras políticas de cambios y devoluciones.",
};

export default function DevolucionesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-primary">Políticas de Devolución</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">Última actualización: {new Date().toLocaleDateString('es-PE')}</p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Condiciones Generales</h2>
          <p className="text-muted-foreground leading-relaxed">
            En Ediciones Tio Sam, nuestra prioridad es que estés completamente satisfecho con tu compra. Si por alguna razón no estás contento con tu producto, aceptamos devoluciones dentro de los 7 días naturales siguientes a la recepción del pedido, siempre y cuando el producto se encuentre en sus condiciones originales, sin abrir y con el empaque intacto (sellos de fábrica).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Proceso de Devolución</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Para iniciar un proceso de devolución, por favor sigue los siguientes pasos:</p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Contacta con nuestro equipo de atención al cliente enviando un correo a contacto@tiosam.com o escribiéndonos a nuestro número de contacto.</li>
            <li>Proporciona tu número de pedido, tu comprobante de pago (boleta o factura) y el motivo detallado de la devolución.</li>
            <li>En un plazo de 24 a 48 horas hábiles, evaluaremos tu caso y te enviaremos las instrucciones para enviar el producto de regreso.</li>
            <li>Una vez recibido en nuestro almacén y verificado su estado, procesaremos tu reembolso o cambio según corresponda.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Productos no elegibles para devolución</h2>
          <p className="text-muted-foreground leading-relaxed">
            Por la naturaleza de los productos que ofrecemos, no podemos aceptar devoluciones en: artículos abiertos (especialmente sobres, cajas de cartas selladas o figuras en blíster abierto), álbumes ya usados, artículos en oferta o liquidación final, o cualquier producto que haya sufrido daños por manipulación inadecuada por parte del cliente.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Reembolsos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Los reembolsos aprobados se emitirán al método de pago original en un plazo de 5 a 15 días hábiles, dependiendo de las políticas de la entidad financiera. Es importante tener en cuenta que los gastos de envío originales y las comisiones de pasarela de pagos no son reembolsables a menos que el error haya sido por parte de nuestra tienda (envío de producto incorrecto o defectuoso de fábrica).
          </p>
        </section>
      </div>
    </div>
  );
}
