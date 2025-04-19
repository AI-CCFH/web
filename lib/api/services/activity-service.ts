/**
 * Activity API Service
 * 
 * Provides methods for interacting with activity log data.
 * Currently uses mock data, but can be replaced with real API calls.
 */

import { fetchData, ApiResponse } from "../base";
import { Activity } from "../../mock-data";

// Re-export the Activity type
export type { Activity };

// Mock repository of activities (in-memory store)
const activityRepository = (): Activity[] => {
  // Import activities from mock-data to maintain compatibility
  const { activities } = require("../../mock-data");
  return activities;
};

/**
 * Get all activities
 */
export const getAllActivities = async (): Promise<ApiResponse<Activity[] | null>> => {
  return fetchData(activityRepository());
};

/**
 * Get recent activities
 * @param limit - Number of activities to return
 */
export const getRecentActivities = async (limit: number = 5): Promise<ApiResponse<Activity[] | null>> => {
  const activities = [...activityRepository()]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
    
  return fetchData(activities);
};

/**
 * Get activities by user
 */
export const getActivitiesByUser = async (user: string): Promise<ApiResponse<Activity[] | null>> => {
  const activities = activityRepository().filter(activity => activity.user === user);
  return fetchData(activities);
};

/**
 * Get activities by action type
 */
export const getActivitiesByAction = async (action: string): Promise<ApiResponse<Activity[] | null>> => {
  const activities = activityRepository().filter(activity => 
    activity.action.toLowerCase().includes(action.toLowerCase())
  );
  return fetchData(activities);
};

/**
 * Get activities related to a specific item
 */
export const getActivitiesByRelatedId = async (relatedId: string): Promise<ApiResponse<Activity[] | null>> => {
  const activities = activityRepository().filter(activity => activity.relatedId === relatedId);
  return fetchData(activities);
};

/**
 * Create a new activity log entry
 */
export const createActivity = async (activity: Omit<Activity, "id" | "timestamp">): Promise<ApiResponse<Activity | null>> => {
  const newActivity = {
    ...activity,
    id: `act-${Math.floor(Math.random() * 10000)}`,
    timestamp: new Date().toISOString(),
  };
  
  return fetchData(newActivity);
};
