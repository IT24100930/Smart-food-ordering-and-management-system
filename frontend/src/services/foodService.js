import { apiRequest } from "./api";

export const getFoods = async () => apiRequest("/foods");

export const createFood = async (payload) =>
  apiRequest("/foods", {
    method: "POST",
    body: JSON.stringify(payload),
  });
