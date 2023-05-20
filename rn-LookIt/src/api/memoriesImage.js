import axios from "axios";

export const memoriesImagePost = async (url, memoryId, spotLatitude, spotLongitude, file) => {
  
  const fileName = file.split('/').pop();

  console.log('fileName : ', fileName);

  const formData = new FormData();
  formData.append(
    'file',
    {
      uri: file,
      type: 'image/png',
      name: fileName,
    }
  )

  return await axios({
    method: 'POST',
    url: url,
    params: {
      memoryId: memoryId,
      spotLatitude: spotLatitude,
      spotLongitude: spotLongitude,
    },
    responseType: 'json',
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: (data, headers) => {
      return formData;
    },
    data: formData,
  });
};