import axios from "axios";
import { apiClient } from "./apiClient";

export const landmarkInfo = async (url, landmarkId) => {

  return await axios({
    method: 'GET',
    url: url,
    params: { 
      landmarkId: landmarkId,
    },
  });
};

export const getLandmarkInfo = async (landmarkId) => {
  
  const endPoint = '/main';

  try {
    const response = await apiClient.get(endPoint, {
      params: {
        landmarkId: landmarkId,
      }
    })
    return response.data;
  } catch (error) {
    throw error;
  }
}