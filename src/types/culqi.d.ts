export {};

declare global {
  interface Window {
    Culqi: {
      publicKey: string;
      settings: (settings: {
        title: string;
        currency: string;
        description: string;
        amount: number;
        order?: string;
        [key: string]: any;
      }) => void;
      options: (options: {
        lang?: string;
        modal?: boolean;
        installments?: boolean;
        customButton?: string;
        paymentMethods?: {
          tarjeta?: boolean;
          yape?: boolean;
          billetera?: boolean;
          bancaMovil?: boolean;
          agente?: boolean;
          cuotealo?: boolean;
        };
        style?: {
          logo?: string;
          maincolor?: string;
          buttontext?: string;
          maintext?: string;
          desctext?: string;
          [key: string]: any;
        };
        [key: string]: any;
      }) => void;
      open: () => void;
      close: () => void;
      token?: {
        id: string;
        email: string;
        [key: string]: any;
      };
      order?: {
        id: string;
        [key: string]: any;
      };
      error?: {
        merchant_message: string;
        user_message: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    culqi: () => void;
  }
}
