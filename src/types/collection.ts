export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  banner_url: string | null;
  is_featured: boolean | null;
  genre: string | null;
  status: 'ACTIVE' | 'UPCOMING' | string;
  created_at: string;
}

export interface CollectionWithCount extends Collection {
  products: { count: number }[];
}

export interface CollectionStats {
  totalActive: number;
  totalProducts: number;
  totalExclusive: number;
  newThisMonth: number;
}
