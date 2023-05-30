import { apiClient } from './apiClient';

export const postMemoriesCreate = async (trackingLocation) => {
  const endPoint = '/memories/create';

  try {
    const response = await apiClient.post(endPoint, {
        path: trackingLocation,
      },
    );

    return response.data;

  } catch (error) {
    throw error;
  }
}

export const postMemoriesHashtag = async (memoryId, tags) => {
  const endPoint = '/memories/info';

  try {
    const response = apiClient.post(endPoint, tags, {
      params: {
        memoryId: memoryId,
      }
    });

    return response.data;

  } catch (error) {
    throw error;
  }
}