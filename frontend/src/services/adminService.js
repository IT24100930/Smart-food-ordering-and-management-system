import { apiRequest } from "./api";
import { getFoods } from "./foodService";

export const getDashboardSummary = async () => apiRequest("/admin/dashboard-summary");
export const getAdminFoods = async () => getFoods();
export const getAdminOrders = async () => apiRequest("/admin/orders");
export const getAdminUsers = async () => apiRequest("/admin/users");
