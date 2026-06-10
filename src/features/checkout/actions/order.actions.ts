"use server";

export interface GenerateOrderResponse {
  success: boolean;
  orderId?: string;
  error?: string;
}

export interface CustomerDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export async function generateCulqiOrder(
  amount: number,
  customer?: CustomerDetails
): Promise<GenerateOrderResponse> {
  try {
    // 1. Convert amount to cents
    const amountInCents = Math.round(amount * 100);
    
    // 2. Generate required data
    const orderNumber = `ORD-${Date.now()}`;
    // Expiration date must be Unix timestamp in seconds (24 hours from now)
    const expirationDate = Math.floor(Date.now() / 1000) + 86400;

    // 3. Request Culqi Order Generation API
    const response = await fetch("https://api.culqi.com/v2/orders", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CULQI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency_code: "PEN",
        description: "Compra en Ediciones Tio Sam",
        order_number: orderNumber,
        client_details: {
          first_name: customer?.first_name || "Cliente",
          last_name: customer?.last_name || "Tio Sam",
          email: customer?.email || "cliente@tiosam.com",
          // NOTA: 900000001 es el número oficial requerido por Culqi para pruebas de Yape/Plin en Sandbox
          phone_number: customer?.phone_number || "900000001"
        },
        expiration_date: expirationDate,
      }),
    });

    const data = await response.json();

    // 4. Handle errors
    if (!response.ok) {
      console.error("Culqi Order API Error Payload:", JSON.stringify(data, null, 2));
      return {
        success: false,
        error: data.user_message || data.merchant_message || "Error al generar la orden en Culqi",
      };
    }

    // 5. Success
    return {
      success: true,
      orderId: data.id, // e.g., 'ord_test_...'
    };
  } catch (error: any) {
    console.error("Server Action Error (generateCulqiOrder):", error);
    return {
      success: false,
      error: error.message || "Error inesperado al intentar generar la orden de pago",
    };
  }
}
