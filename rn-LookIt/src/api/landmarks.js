import axios from 'axios';

export const landmarksGet = async (url) => {
  
  return await axios({
    method: 'GET',
    url: url,
  })
}