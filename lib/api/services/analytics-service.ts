/**
 * Analytics API Service
 * 
 * Provides methods for fetching analytics and chart data.
 * Currently uses mock data, but can be replaced with real API calls.
 */

import { fetchData, ApiResponse } from "../base";

// Import mock chart data
import * as mockChartData from "../../mock-chart-data";

// Analytics data types
export interface ShipmentOverview {
  name: string;
  delivered: number;
  inTransit: number;
  pending: number;
}

export interface ProductPerformance {
  name: string;
  sales: number;
  inventory: number;
  target: number;
}

export interface WarehouseCapacity {
  name: string;
  capacity: number;
  used: number;
  available: number;
}

export interface RouteInfo {
  id: string;
  origin: { lat: number; lng: number; name: string };
  destination: { lat: number; lng: number; name: string };
  status: string;
  progress: number;
  eta: string;
}

export interface DeliverySchedule {
  time: string;
  count: number;
  onTime: number;
  delayed: number;
}

export interface ShipmentAnalytics {
  date: string;
  count: number;
  onTime: number;
  delayed: number;
}

export interface InventoryAnalytics {
  date: string;
  total: number;
  in: number;
  out: number;
}

export interface RegionalDistribution {
  name: string;
  value: number;
}

export interface TransportationMethod {
  name: string;
  value: number;
}

export interface MonthlyReport {
  name: string;
  shipments: number;
  revenue: number;
  expenses: number;
}

/**
 * Get shipment overview data
 */
export const getShipmentOverview = async (): Promise<ApiResponse<ShipmentOverview[] | null>> => {
  return fetchData(mockChartData.shipmentOverviewData);
};

/**
 * Get product performance data
 */
export const getProductPerformance = async (): Promise<ApiResponse<ProductPerformance[] | null>> => {
  return fetchData(mockChartData.productPerformanceData);
};

/**
 * Get warehouse capacity data
 */
export const getWarehouseCapacity = async (): Promise<ApiResponse<WarehouseCapacity[] | null>> => {
  return fetchData(mockChartData.warehouseCapacityData);
};

/**
 * Get active routes data
 */
export const getActiveRoutes = async (): Promise<ApiResponse<RouteInfo[] | null>> => {
  return fetchData(mockChartData.activeRoutesData);
};

/**
 * Get delivery schedule data
 */
export const getDeliverySchedule = async (): Promise<ApiResponse<DeliverySchedule[] | null>> => {
  return fetchData(mockChartData.deliveryScheduleData);
};

/**
 * Get shipment analytics for the last 30 days
 */
export const getShipmentAnalytics = async (): Promise<ApiResponse<ShipmentAnalytics[] | null>> => {
  return fetchData(mockChartData.analyticsShipmentData);
};

/**
 * Get inventory analytics for the last 30 days
 */
export const getInventoryAnalytics = async (): Promise<ApiResponse<InventoryAnalytics[] | null>> => {
  return fetchData(mockChartData.inventoryAnalyticsData);
};

/**
 * Get regional distribution data
 */
export const getRegionalDistribution = async (): Promise<ApiResponse<RegionalDistribution[] | null>> => {
  return fetchData(mockChartData.regionalDistributionData);
};

/**
 * Get transportation methods data
 */
export const getTransportationMethods = async (): Promise<ApiResponse<TransportationMethod[] | null>> => {
  return fetchData(mockChartData.transportationMethodsData);
};

/**
 * Get monthly reports data
 */
export const getMonthlyReports = async (): Promise<ApiResponse<MonthlyReport[] | null>> => {
  return fetchData(mockChartData.monthlyReportsData);
};

/**
 * Get dates helper function
 */
export const getDateRanges = async (): Promise<ApiResponse<{
  last7Days: string[];
  last30Days: string[];
  monthNames: string[];
} | null>> => {
  return fetchData({
    last7Days: mockChartData.last7Days,
    last30Days: mockChartData.last30Days,
    monthNames: mockChartData.monthNames
  });
};
