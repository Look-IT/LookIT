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

export const getTagFriendList = async (memoryId) => {
  const endPoint = '/memories/taggedFriendList';

  try {
    const response = await apiClient.get(endPoint, {
      params: {
        memoryId: memoryId,
      }
    })

    return response.data;

  } catch (error) {
    throw error;
  }
}