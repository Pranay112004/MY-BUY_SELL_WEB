import { create } from 'zustand';

// Get the base URL for API calls
const API_BASE_URL = import.meta.env.PROD ? '' : '';

const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      
      if (data.success) {
        set((state) => ({ products: [...state.products, data.data] }));
      }
      
      return data;
    } catch (error) {
      return { success: false, message: "Error creating product" };
    }
  },
  
  fetchProducts: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      
      if (data.success) {
        set({ products: data.data });
      }
      
      return data;
    } catch (error) {
      return { success: false, message: "Error fetching products" };
    }
  },
  
  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if (data.success) {
        set((state) => ({ 
          products: state.products.filter((product) => product._id !== pid) 
        }));
      }
      
      return data;
    } catch (error) {
      return { success: false, message: "Error deleting product" };
    }
  },
  
  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      
      if (data.success) {
        set((state) => ({
          products: state.products.map((product) =>
            product._id === pid ? data.data : product
          ),
        }));
      }
      
      return data;
    } catch (error) {
      return { success: false, message: "Error updating product" };
    }
  },
}));

export default useProductStore;
