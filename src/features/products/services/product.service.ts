import { Product } from '@/types/product';
import { createClient } from '@/lib/supabase/server';

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true);

    if (error) {
      console.error('Error fetching featured products from Supabase:', error.message);
      return [];
    }

    return data as Product[];
  } catch (err) {
    console.error('Unexpected error fetching featured products:', err);
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Error fetching all products from Supabase:', error.message);
      return [];
    }

    return data as Product[];
  } catch (err) {
    console.error('Unexpected error fetching all products:', err);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching product ${id} from Supabase:`, error.message);
      return null;
    }

    return data as Product;
  } catch (err) {
    console.error(`Unexpected error fetching product ${id}:`, err);
    return null;
  }
};
