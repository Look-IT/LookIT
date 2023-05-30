import axios from 'axios';

//네컷사진 post api
export const fourCutPost = async (user, landmarkId, uri) => {
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    type: 'image/jpg',
    name: 'CapturedFourCut.jpg',
  });

  return await axios({
    method: 'POST',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/4cutphoto',
    params: { landmarkId: landmarkId },
    responseType: 'json',
    headers: { 'Content-Type': 'multipart/form-data', token: user },
    transformRequest: (data, headers) => {
      return formData;
    },
    data: formData,
  });
};

export const fourCutGet = async (user) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections',
    headers: {
      token: user,
    },
  });
};

export const fourCutFrameGet = async (landmarkId) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/4cutphoto',
    params: { landmarkId: landmarkId },
  });
};
