import { apiClient } from "./apiClient";

export const deleteMemoriesPicture = async (memoryPhoto) => {
  const endPoint = '/memories/photo?memoryPhoto=';

  try {
    const response = await apiClient.delete(endPoint + memoryPhoto);

    return response.data;

  } catch (error) {
    throw error;
  }
}