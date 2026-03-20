import { apiRequest } from "./api";

export const getOrders = async (email) => apiRequest(`/orders?email=${encodeURIComponent(email)}`);

export const createOrder = async (order) =>
  apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
