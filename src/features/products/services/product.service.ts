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
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching featured products:', err);
    return [];
  }
};

export const getRareProducts = async (): Promise<Product[]> => {
  try {
    const supabase = await createClient();
    // Fetch products with rare rarities
    const { data, error } = await supabase
      .from('products')
      .select('*, collections(*)')
      .in('rarity', ['Secreta', 'Ultra Rara', 'Super Rara'])
      .order('rarity', { ascending: false }) // Just some ordering
      .limit(4);

    if (error) {
      console.error('Error fetching rare products:', error.message);
      return [];
    }

    return data as Product[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err;
    return [];
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*), collections(*)');

    if (error) {
      console.error('Error fetching all products from Supabase:', error.message);
      return [];
    }

    return data as Product[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching all products:', err);
    return [];
  }
};

export const getProductsByCategorySlug = async (slug: string): Promise<Product[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, categories!inner(*), collections(*)')
      .eq('categories.slug', slug);

    if (error) {
      console.error(`Error fetching products by category ${slug}:`, error.message);
      return [];
    }

    return data as Product[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error(`Unexpected error fetching products by category ${slug}:`, err);
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
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error(`Unexpected error fetching product ${id}:`, err);
    return null;
  }
};
