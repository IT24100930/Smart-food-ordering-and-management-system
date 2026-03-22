import { apiRequest } from "./api";

export const getFoods = async () => apiRequest("/foods");

export const createFood = async (payload) =>
  apiRequest("/foods", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateFood = async (id, payload) =>
  apiRequest(`/foods/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

export const deleteFood = async (id) =>
  apiRequest(`/foods/${id}`, {
    method: "DELETE",
  });
