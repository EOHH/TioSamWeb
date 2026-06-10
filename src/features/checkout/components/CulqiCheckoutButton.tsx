'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { processCulqiCharge } from '@/features/checkout/actions/charge.actions'
import { generateCulqiOrder } from '@/features/checkout/actions/order.actions'
import { useCartStore } from '@/store/useCartStore'
import toast from 'react-hot-toast'

interface CulqiCheckoutButtonProps {
  amount: number;
  onSuccess?: () => void;
}

export function CulqiCheckoutButton({ amount, onSuccess }: CulqiCheckoutButtonProps) {
  const clearCart = useCartStore(state => state.clearCart);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // We use refs to guarantee that the global window.culqi callback 
  // always has access to the latest values without re-binding closures.
  const amountRef = useRef(amount);
  const clearCartRef = useRef(clearCart);
  const setIsProcessingRef = useRef(setIsProcessing);
  const onSuccessRef = useRef(onSuccess);

  useEffect(() => {
    amountRef.current = amount;
    clearCartRef.current = clearCart;
    setIsProcessingRef.current = setIsProcessing;
    onSuccessRef.current = onSuccess;
  }, [amount, clearCart, onSuccess]);

  useEffect(() => {
    // Define the global callback that Culqi uses to return tokens/errors
    window.culqi = async function () {
      if (window.Culqi.token) {
        const token = window.Culqi.token;
        console.log('Token Generado:', token.id);
        
        setIsProcessingRef.current(true);
        
        try {
          const response = await processCulqiCharge(
            token.id, 
            amountRef.current, 
            token.email
          );
          
          if (response.success) {
            clearCartRef.current();
            if (window.Culqi.close) window.Culqi.close();
            if (onSuccessRef.current) onSuccessRef.current();
          } else {
            toast.error("El pago fue rechazado: " + response.error);
          }
        } catch (error) {
          toast.error("Hubo un error al procesar el pago");
        } finally {
          setIsProcessingRef.current(false);
        }

      } else if (window.Culqi.error) {
        const errorMessage = window.Culqi.error.user_message || window.Culqi.error.merchant_message || "Error al procesar la tarjeta";
        console.error('Error de Culqi:', errorMessage);
        toast.error(errorMessage);
      }
    };
  }, []);

  const handlePayment = async () => {
    if (typeof window !== 'undefined' && window.Culqi) {
      setIsProcessing(true);
      const toastId = toast.loading('Generando orden de pago segura...');
      
      const orderResult = await generateCulqiOrder(amount);
      
      if (!orderResult.success || !orderResult.orderId) {
        toast.error('Error al generar la orden', { id: toastId });
        setIsProcessing(false);
        return;
      }
      
      toast.success('Orden generada', { id: toastId });

      // 1. Set Public Key
      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY || '';

      // 2. Convert amount to cents
      const amountInCents = Math.round(amount * 100);

      // 3. Configure settings
      window.Culqi.settings({
        title: "Ediciones Tio Sam",
        currency: "PEN",
        description: "Compra en Ediciones Tio Sam",
        amount: amountInCents,
        order: orderResult.orderId,
      });

      // 4. Configure options to match the dark theme colors
      window.Culqi.options({
        lang: "es",
        modal: true,
        paymentMethods: {
          tarjeta: true,
          yape: true,
          billetera: true,
          bancaMovil: true,
          agente: true,
          cuotealo: false
        },
        style: {
          maincolor: "#e11d48", // matches primary color
          buttontext: "#ffffff",
          maintext: "#ffffff",
          desctext: "#a1a1aa"
        }
      });

      // 5. Open checkout modal
      window.Culqi.open();
      
      // Re-enable button so user can retry if they close the modal manually
      setIsProcessing(false);
    } else {
      console.error('Culqi no está inicializado.');
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
      disabled={amount <= 0 || isProcessing}
    >
      {isProcessing ? "Procesando pago..." : "Proceder al Pago"}
    </Button>
  );
}
