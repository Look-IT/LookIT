import axios from "axios";

import { useMemoriesContext } from "../contexts/MemoriesContext"
import { apiClient } from "./apiClient";

export const postMemoriesImage = async (memoryId, pictureMarker) => {
  const endPoint = '/memories/upload';

  const formData = new FormData();
  formData.append(
    'file',
    {
      uri: pictureMarker.uri,
      name: 'image',
      type: 'image/png',
    }
  )

  try {
    const response = await apiClient.post(endPoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      params: {
        memoryId: memoryId,
        spotLatitude: pictureMarker.latitude,
        spotLongitude: pictureMarker.longitude,
      },
      responseType: 'json',
    });

    return response.data;

  } catch (error) {
    throw error;
  }
}