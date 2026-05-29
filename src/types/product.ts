export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'cards' | 'figures' | 'albums';
  image: string;
  stock: number;
  isNew?: boolean;
  featured?: boolean;
}
