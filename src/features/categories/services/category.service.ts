import { createClient } from '@/lib/supabase/server';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories from Supabase:', error.message);
      return [];
    }

    return data as Category[];
  } catch (err: any) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') {
      throw err;
    }
    console.error('Unexpected error fetching categories:', err);
    return [];
  }
};
