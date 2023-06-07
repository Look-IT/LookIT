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

export const postMemoriesFriendTag = async (memoryId, frinedTags) => {
  const endPoint = '/memories/friendTag';

  try {
    const response = apiClient.post(endPoint, frinedTags, {
      params: {
        memoryId: memoryId,
      }
    });

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

export const getMemoriesPhoto = async (memoryId) => {
  const endPoint = '/memories/photo';

  try {
    const response = apiClient.get(endPoint, {
      params: {
        memoryId: memoryId,
      }
    })

    return response;
  } catch (error) {
    throw error;
  }
}

export const getMemoriesPath = async (memoryId) => {
  const endPoint = '/memories/linePath';

  try {
    const response = apiClient.get(endPoint, {
      params: {
        memoryId: memoryId,
      }
    })

    return response;
  } catch (error) {
    throw error;
  }
}