import axios from "axios";

export const landmarkInfo = async (url, landmarkId) => {

  return await axios({
    method: 'GET',
    url: url,
    params: { 
      landmarkId: landmarkId,
    },
  });
};