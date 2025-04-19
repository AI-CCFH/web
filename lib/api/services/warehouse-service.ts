/**
 * Warehouse API Service
 * 
 * Provides methods for interacting with warehouse data.
 * Currently uses mock data, but can be replaced with real API calls.
 */

import { fetchData, ApiResponse } from "../base";
import { Warehouse } from "../../mock-data";

// Re-export the Warehouse type
export type { Warehouse };

// Mock repository of warehouses (in-memory store)
const warehouseRepository = (): Warehouse[] => {
  // Import warehouses from mock-data to maintain compatibility
  const { warehouses } = require("../../mock-data");
  return warehouses;
};

/**
 * Get all warehouses
 */
export const getAllWarehouses = async (): Promise<ApiResponse<Warehouse[] | null>> => {
  return fetchData(warehouseRepository());
};

/**
 * Get a single warehouse by ID
 */
export const getWarehouseById = async (id: string): Promise<ApiResponse<Warehouse | null>> => {
  const warehouse = warehouseRepository().find(w => w.id === id) || null;
  return fetchData(warehouse);
};

/**
 * Get warehouses by location
 */
export const getWarehousesByLocation = async (location: string): Promise<ApiResponse<Warehouse[] | null>> => {
  const warehouses = warehouseRepository().filter(warehouse => 
    warehouse.location.toLowerCase().includes(location.toLowerCase())
  );
  return fetchData(warehouses);
};

/**
 * Get warehouses with high utilization (>80%)
 */
export const getHighUtilizationWarehouses = async (): Promise<ApiResponse<Warehouse[] | null>> => {
  const warehouses = warehouseRepository().filter(warehouse => warehouse.utilization > 80);
  return fetchData(warehouses);
};

/**
 * Create a new warehouse
 */
export const createWarehouse = async (warehouse: Omit<Warehouse, "id">): Promise<ApiResponse<Warehouse | null>> => {
  const newWarehouse = {
    ...warehouse,
    id: `wh-${Math.floor(Math.random() * 10000)}`,
  };
  return fetchData(newWarehouse);
};

/**
 * Update an existing warehouse
 */
export const updateWarehouse = async (id: string, updates: Partial<Warehouse>): Promise<ApiResponse<Warehouse | null>> => {
  const warehouses = warehouseRepository();
  const index = warehouses.findIndex(w => w.id === id);
  
  if (index === -1) {
    return fetchData(null);
  }
  
  const updatedWarehouse = {
    ...warehouses[index],
    ...updates,
  };
  
  return fetchData(updatedWarehouse);
};

/**
 * Delete a warehouse
 */
export const deleteWarehouse = async (id: string): Promise<ApiResponse<boolean | null>> => {
  const warehouses = warehouseRepository();
  const exists = warehouses.some(w => w.id === id);
  return fetchData(exists);
};
