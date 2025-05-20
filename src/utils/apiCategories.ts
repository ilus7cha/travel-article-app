import axios from "axios";

const BASE_URL = "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export const fetchCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get(`${BASE_URL}/categories/${id}`);
  const data = response.data.data;
  return {
    id: data.id,
    name: data.attributes.name,
    description: data.attributes.description,
  };
};
