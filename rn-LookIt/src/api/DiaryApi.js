import axios from 'axios';

export const diaryListGet = async (url) => {
  return await axios({
    method: 'GET',
    url: url,
    params: { userId: '3' },
  });
};
