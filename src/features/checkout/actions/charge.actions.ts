"use server";

export interface ProcessChargeResponse {
  success: boolean;
  charge?: any;
  error?: string;
}

export async function processCulqiCharge(
  tokenId: string,
  amount: number,
  email: string
): Promise<ProcessChargeResponse> {
  try {
    // Convert the amount to cents as required by Culqi
    const amountInCents = Math.round(amount * 100);

    const response = await fetch("https://api.culqi.com/v2/charges", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.CULQI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency_code: "PEN",
        email: email,
        source_id: tokenId,
      }),
    });

    const data = await response.json();

    // Check if the HTTP request returned an error status
    if (!response.ok) {
      console.error("Culqi API Error:", data);
      return {
        success: false,
        error: data.user_message || data.merchant_message || "Error al procesar el pago con Culqi",
      };
    }

    // Success
    return {
      success: true,
      charge: data,
    };
  } catch (error: any) {
    console.error("Server Action Error (processCulqiCharge):", error);
    return {
      success: false,
      error: error.message || "Error inesperado al intentar procesar el pago",
    };
  }
}
