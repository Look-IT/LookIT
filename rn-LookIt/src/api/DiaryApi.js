import { apiClient } from "./apiClient";


export const getMemoriesList = async () => {
  const endPoint = '/memories/list';

  try {
    const response = await apiClient.get(endPoint, {});
    return response.data;
  } catch (error) {
    throw error;
  }
}