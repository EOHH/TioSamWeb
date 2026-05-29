import { Product } from '@/types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Dragon Ball Super: Fusion World Starter Deck',
    description: 'Begin your journey with the ultimate starter deck featuring Goku and Vegeta.',
    price: 15.99,
    category: 'cards',
    image: 'https://images.unsplash.com/photo-1613589410313-05f426ddc36d?q=80&w=600&auto=format&fit=crop', // placeholder anime cards
    stock: 50,
    isNew: true,
    featured: true,
  },
  {
    id: '2',
    name: 'One Piece TCG: Romance Dawn Booster Box',
    description: 'The highly anticipated first booster box for the One Piece Card Game.',
    price: 120.00,
    category: 'cards',
    image: 'https://images.unsplash.com/photo-1613589410313-05f426ddc36d?q=80&w=600&auto=format&fit=crop',
    stock: 15,
    featured: true,
  },
  {
    id: '3',
    name: 'Panini Naruto Shippuden Sticker Album',
    description: 'Official sticker album featuring all your favorite ninjas.',
    price: 9.99,
    category: 'albums',
    image: 'https://images.unsplash.com/photo-1578632292335-df3fbc4fd0aa?q=80&w=600&auto=format&fit=crop',
    stock: 100,
    featured: true,
  },
  {
    id: '4',
    name: 'S.H.Figuarts Jujutsu Kaisen Gojo Satoru',
    description: 'Highly detailed action figure of the strongest jujutsu sorcerer.',
    price: 65.00,
    category: 'figures',
    image: 'https://images.unsplash.com/photo-1605638520338-769d2d0901e9?q=80&w=600&auto=format&fit=crop',
    stock: 5,
    isNew: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Demon Slayer: Kimetsu no Yaiba Premium Card Collection',
    description: 'Exclusive metallic cards from the Mugen Train arc.',
    price: 25.50,
    category: 'cards',
    image: 'https://images.unsplash.com/photo-1613589410313-05f426ddc36d?q=80&w=600&auto=format&fit=crop',
    stock: 30,
  },
  {
    id: '6',
    name: 'Attack on Titan Levi Ackerman Statue',
    description: '1/8 scale premium statue of humanity\'s strongest soldier.',
    price: 180.00,
    category: 'figures',
    image: 'https://images.unsplash.com/photo-1605638520338-769d2d0901e9?q=80&w=600&auto=format&fit=crop',
    stock: 2,
    featured: true,
  }
];

export const getFeaturedProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts.filter(p => p.featured));
    }, 800);
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts);
    }, 800);
  });
};
