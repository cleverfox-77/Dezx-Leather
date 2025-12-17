
import { createClient } from '@supabase/supabase-js';
import { Shoe } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// --- Data Helpers ---

export async function fetchProducts(): Promise<Shoe[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data as Shoe[] || [];
}

export async function uploadProductImage(file: File): Promise<string | null> {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const { data, error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

    if (error) {
        console.error('Error uploading image:', error);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);

    return publicUrl;
}

export async function saveProduct(product: Shoe): Promise<Shoe | null> {
    // Check if exists to determine insert vs update
    // Actually upsert is easier if we have the ID
    const { data, error } = await supabase
        .from('products')
        .upsert(product)
        .select()
        .single();

    if (error) {
        console.error('Error saving product:', error);
        return null;
    }
    return data as Shoe;
}

export async function deleteProduct(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting product:', error);
        return false;
    }
    return true;
}
