import axios from 'axios';
import { useUserContext } from '../contexts/UserContext';

export const diaryListGet = async (url, user) => {
  return await axios({
    method: 'GET',
    url: url,
    headers: {
      token: user,
    },
  });
};
