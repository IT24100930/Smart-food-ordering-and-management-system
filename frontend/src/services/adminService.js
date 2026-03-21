import { apiRequest } from "./api";
import { getFoods } from "./foodService";

const getAdminHeaders = () => {
  const user = JSON.parse(localStorage.getItem("smart-food-user") || "null");
  return {
    "X-User-Role": user?.role || "",
  };
};

export const getDashboardSummary = async () =>
  apiRequest("/admin/dashboard-summary", {
    headers: getAdminHeaders(),
  });

export const getAdminFoods = async () => getFoods();

export const getAdminOrders = async (filters = {}) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "All") params.set("status", filters.status);
  if (filters.date) params.set("date", filters.date);
  if (filters.scope) params.set("scope", filters.scope);

  const query = params.toString();
  return apiRequest(`/admin/orders${query ? `?${query}` : ""}`, {
    headers: getAdminHeaders(),
  });
};

export const getAdminUsers = async () =>
  apiRequest("/admin/users", {
    headers: getAdminHeaders(),
  });

export const createAdminOrder = async (payload) =>
  apiRequest("/orders/admin", {
    method: "POST",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });

export const updateAdminOrder = async (orderCode, payload) =>
  apiRequest(`/orders/${orderCode}`, {
    method: "PUT",
    headers: getAdminHeaders(),
    body: JSON.stringify(payload),
  });

export const updateAdminOrderStatus = async (orderCode, status) =>
  apiRequest(`/orders/${orderCode}/status`, {
    method: "PUT",
    headers: getAdminHeaders(),
    body: JSON.stringify({ status }),
  });

export const deleteAdminOrder = async (orderCode) =>
  apiRequest(`/orders/${orderCode}`, {
    method: "DELETE",
    headers: getAdminHeaders(),
  });
