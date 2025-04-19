/**
 * Shipment API Service
 * 
 * Provides methods for interacting with shipment data.
 * Currently uses mock data, but can be replaced with real API calls.
 */

import { fetchData, ApiResponse } from "../base";
import { Shipment } from "../../mock-data";

// Re-export the Shipment type
export type { Shipment };

// Mock repository of shipments (in-memory store)
const shipmentRepository = (): Shipment[] => {
  // Import shipments from mock-data to maintain compatibility
  const { shipments } = require("../../mock-data");
  return shipments;
};

/**
 * Get all shipments
 */
export const getAllShipments = async (): Promise<ApiResponse<Shipment[] | null>> => {
  return fetchData(shipmentRepository());
};

/**
 * Get a single shipment by ID
 */
export const getShipmentById = async (id: string): Promise<ApiResponse<Shipment | null>> => {
  const shipment = shipmentRepository().find(s => s.id === id) || null;
  return fetchData(shipment);
};

/**
 * Get shipments by status
 */
export const getShipmentsByStatus = async (status: string): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(shipment => shipment.status === status);
  return fetchData(shipments);
};

/**
 * Get shipments by origin
 */
export const getShipmentsByOrigin = async (origin: string): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(shipment => shipment.origin === origin);
  return fetchData(shipments);
};

/**
 * Get shipments by destination
 */
export const getShipmentsByDestination = async (destination: string): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(shipment => shipment.destination === destination);
  return fetchData(shipments);
};

/**
 * Create a new shipment
 */
export const createShipment = async (shipment: Omit<Shipment, "id">): Promise<ApiResponse<Shipment | null>> => {
  const newShipment = {
    ...shipment,
    id: `ship-${Math.floor(Math.random() * 10000)}`,
  };
  return fetchData(newShipment);
};

/**
 * Update an existing shipment
 */
export const updateShipment = async (id: string, updates: Partial<Shipment>): Promise<ApiResponse<Shipment | null>> => {
  const shipments = shipmentRepository();
  const index = shipments.findIndex(s => s.id === id);
  
  if (index === -1) {
    return fetchData(null);
  }
  
  const updatedShipment = {
    ...shipments[index],
    ...updates,
  };
  
  return fetchData(updatedShipment);
};

/**
 * Delete a shipment
 */
export const deleteShipment = async (id: string): Promise<ApiResponse<boolean | null>> => {
  const shipments = shipmentRepository();
  const exists = shipments.some(s => s.id === id);
  return fetchData(exists);
};

/**
 * Get pending shipments
 */
export const getPendingShipments = async (): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(s => s.status === "Pending");
  return fetchData(shipments);
};

/**
 * Get in-transit shipments
 */
export const getInTransitShipments = async (): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(s => s.status === "In Transit");
  return fetchData(shipments);
};

/**
 * Get delivered shipments
 */
export const getDeliveredShipments = async (): Promise<ApiResponse<Shipment[] | null>> => {
  const shipments = shipmentRepository().filter(s => s.status === "Delivered");
  return fetchData(shipments);
};
