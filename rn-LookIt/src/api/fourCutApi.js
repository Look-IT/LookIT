import axios from 'axios';

//네컷사진 post api
export const fourCutPost = async (url, uri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    type: 'image/jpg',
    name: 'CapturedFourCut.jpg',
  });

  return await axios({
    method: 'POST',
    url: url,
    params: { landmarkId: '1', userId: '3' },
    responseType: 'json',
    headers: { 'Content-Type': 'multipart/form-data' },
    transformRequest: (data, headers) => {
      return formData;
    },
    data: formData,
  });
};

export const fourCutGet = async (url) => {
  return await axios({
    method: 'GET',
    url: url,
    params: { userId: '3' },
  });
};
