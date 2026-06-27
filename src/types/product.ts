import { Category } from './category';
import { Collection } from './collection';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  collection_id?: string | null;
  image_url: string | null;
  stock: number;
  is_new: boolean;
  featured: boolean;
  character_name?: string | null;
  rarity?: string | null;
  condition?: string | null;
  created_at: string;
  categories?: Category;
  collections?: Collection;
}
