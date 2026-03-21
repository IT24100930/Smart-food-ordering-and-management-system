import { apiRequest } from "./api";

export const getCategories = async () => {
  const categories = await apiRequest("/categories");
  return categories.map((category) => category.name);
};
