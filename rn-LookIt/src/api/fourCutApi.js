import axios from 'axios';

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
    data: { email: email, password: password },
  });
};
