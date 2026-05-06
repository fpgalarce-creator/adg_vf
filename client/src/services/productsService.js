import { supabase } from '../lib/supabase.js'

const mapProductToDB = (data) => {
  return {
    name: data.titulo || data.title || data.name || "",
    description: data.descripcion || data.description || "",
    price: Number(data.precio !== undefined ? data.precio : data.price) || 0,
    weight: String(data.gramos ? `${data.gramos}g` : data.peso || data.weight || ""),
    category: data.categoria || data.category || "",
    image: data.imageKey || data.image || "huevos-campo",
    featured: Boolean(data.destacado ?? data.featured ?? false),
    active: Boolean(data.activo ?? data.active ?? true),
  };
};

export const productsService = {
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async getActiveProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  },

  async createProduct(productForm) {
    const dbProduct = mapProductToDB(productForm);

    const { data, error } = await supabase
      .from('products')
      .insert([dbProduct])
      .select()
      .single()
    
    if (error) {
      console.error("INSERT ERROR:", error);
      throw error;
    }
    return data
  },

  async updateProduct(id, productForm) {
    const dbProduct = mapProductToDB(productForm);

    const { data, error } = await supabase
      .from('products')
      .update(dbProduct)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error("UPDATE ERROR:", error);
      throw error;
    }
    return data
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async toggleFeatured(id, featured) {
    const { data, error } = await supabase
      .from('products')
      .update({ featured })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async toggleActive(id, active) {
    const updates = { active }
    if (!active) {
      updates.featured = false // If inactive, it shouldn't be featured
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
