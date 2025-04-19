/**
 * Product API Service
 * 
 * Provides methods for interacting with product data.
 * Currently uses mock data, but can be replaced with real API calls.
 */

import { fetchData, ApiResponse } from "../base";
import { Product } from "../../mock-data";
import { enhanceProductWithQRData, generateMockProduct } from "../../mock-qr-data";

// Product interface (imported from mock-data.ts)
// Re-exported here so consumers don't need to import from mock-data
export type { Product };

// Mock repository of products (in-memory store)
const productRepository = (): Product[] => {
  // Import products from mock-data to maintain compatibility
  const { products } = require("../../mock-data");
  return products;
};

// API Service functions that mimic RESTful endpoints

/**
 * Get all products
 */
export const getAllProducts = async (): Promise<ApiResponse<Product[] | null>> => {
  return fetchData(productRepository());
};

/**
 * Get a single product by ID
 */
export const getProductById = async (id: string): Promise<ApiResponse<Product | null>> => {
  const product = productRepository().find(p => p.id === id) || null;
  return fetchData(product);
};

/**
 * Get products by location
 */
export const getProductsByLocation = async (location: string): Promise<ApiResponse<Product[] | null>> => {
  const products = productRepository().filter(product => product.location === location);
  return fetchData(products);
};

/**
 * Get products by status
 */
export const getProductsByStatus = async (status: string): Promise<ApiResponse<Product[] | null>> => {
  const products = productRepository().filter(product => product.status === status);
  return fetchData(products);
};

/**
 * Create a new product
 */
export const createProduct = async (product: Omit<Product, "id">): Promise<ApiResponse<Product | null>> => {
  const newProduct = {
    ...product,
    id: `prod-${Math.floor(Math.random() * 10000)}`,
    lastUpdated: new Date().toISOString()
  };
  return fetchData(newProduct);
};

/**
 * Update an existing product
 */
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<ApiResponse<Product | null>> => {
  const products = productRepository();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return fetchData(null);
  }
  
  const updatedProduct = {
    ...products[index],
    ...updates,
    lastUpdated: new Date().toISOString()
  };
  
  return fetchData(updatedProduct);
};

/**
 * Delete a product
 */
export const deleteProduct = async (id: string): Promise<ApiResponse<boolean | null>> => {
  const products = productRepository();
  const exists = products.some(p => p.id === id);
  return fetchData(exists);
};

/**
 * Get product with QR data
 */
export const getProductWithQRData = async (id: string): Promise<ApiResponse<Product | null>> => {
  const product = productRepository().find(p => p.id === id);
  
  if (!product) {
    return fetchData(null);
  }
  
  const enhancedProduct = enhanceProductWithQRData(product);
  return fetchData(enhancedProduct);
};

/**
 * Generate a new mock product with QR data
 */
export const generateRandomProduct = async (): Promise<ApiResponse<Product | null>> => {
  return fetchData(generateMockProduct());
};
