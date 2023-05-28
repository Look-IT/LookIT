import { apiClient } from "./apiClient";

const getLandmarks = async () => {
  try {
    const response = await apiClient.get('/main/landmarks');
    return response.data;

  } catch (error) {
    throw error;
  }
}

export const callLandmarks = async () => {
  try {
    const response = await getLandmarks();
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};