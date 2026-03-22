import { apiRequest } from "./api";

export const getCategories = async () => apiRequest("/categories");

export const createCategory = async (payload) =>
  apiRequest("/categories", {
    method: "POST",
    body: JSON.stringify(payload),
  });
