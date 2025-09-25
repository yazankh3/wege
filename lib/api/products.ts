import type { Product } from "@/lib/store/slices/productsSlice";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products");
    return response.data;
  },

  getById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products?category=${category}`);
    return response.data;
  },
};

export const cartApi = {
  getCart: async () => {
    const response = await api.get("/cart");
    return response.data;
  },

  addToCart: async (item: any) => {
    const response = await api.post("/cart", item);
    return response.data;
  },

  updateCartItem: async (id: number, item: any) => {
    const response = await api.put(`/cart/${id}`, item);
    return response.data;
  },

  removeFromCart: async (id: number) => {
    const response = await api.delete(`/cart/${id}`);
    return response.data;
  },
};

export const favouritesApi = {
  getFavourites: async () => {
    const response = await api.get("/favourites");
    return response.data;
  },

  addToFavourites: async (item: any) => {
    const response = await api.post("/favourites", item);
    return response.data;
  },

  removeFromFavourites: async (id: number) => {
    const response = await api.delete(`/favourites/${id}`);
    return response.data;
  },
};
