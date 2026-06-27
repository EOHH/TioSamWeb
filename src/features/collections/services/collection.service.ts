import { createClient } from '@/lib/supabase/server';
import { Collection, CollectionStats, CollectionWithCount } from '@/types/collection';

export const getCollections = async (): Promise<CollectionWithCount[]> => {
  try {
    const supabase = await createClient();
    
    // Fetch collections with their associated product counts
    const { data, error } = await supabase
      .from('collections')
      .select('*, products(count)')
      .neq('status', 'UPCOMING')
      .order('name');

    if (error) {
      console.error('Error fetching collections from Supabase:', error.message);
      return [];
    }

    return data as unknown as CollectionWithCount[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching collections:', err);
    return [];
  }
};

export const getUpcomingCollections = async (): Promise<Collection[]> => {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('collections')
      .select('*')
      .eq('status', 'UPCOMING')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching upcoming collections from Supabase:', error.message);
      return [];
    }

    return data as Collection[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching upcoming collections:', err);
    return [];
  }
};

export const getCollectionStats = async (): Promise<CollectionStats> => {
  try {
    const supabase = await createClient();
    
    // 1. Total active collections
    const { count: activeCount, error: activeError } = await supabase
      .from('collections')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'UPCOMING');

    // 2. Total products in DB
    const { count: productsCount, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // 3. Exclusive collections count (mocking this logic based on is_featured for now, assuming featured = exclusive)
    const { count: exclusiveCount, error: exclusiveError } = await supabase
      .from('collections')
      .select('*', { count: 'exact', head: true })
      .eq('is_featured', true)
      .neq('status', 'UPCOMING');

    if (activeError || productsError || exclusiveError) {
      console.error('Error fetching collection stats');
      return { totalActive: 0, totalProducts: 0, totalExclusive: 0, newThisMonth: 0 };
    }

    return {
      totalActive: activeCount || 0,
      totalProducts: productsCount || 0,
      totalExclusive: exclusiveCount || 0,
      newThisMonth: 4, // Hardcoded for now, or could query by created_at if existed
    };
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching stats:', err);
    return { totalActive: 0, totalProducts: 0, totalExclusive: 0, newThisMonth: 0 };
  }
};
