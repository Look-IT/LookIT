import axios from 'axios';
import { apiClient } from './apiClient';

// export const signIn = async (email, password) => {
//   return await axios({
//     method: 'POST',
//     url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/login',
//     data: { email: email, password: password },
//   });
// };

export const signIn = async (email, password) => {
  const endpoint = '/member/login';

  try {
    const response = await apiClient.post(endpoint, {
        email: email,
        password: password,
      },
    )

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const tagNameCheck = async (url, tagName) => {
  return await axios({
    method: 'POST',
    url: url,
    data: { tagName: tagName },
  });
};

export const signUp = async (url, tagName, email, password, nickName) => {
  return await axios({
    method: 'POST',
    url: url,
    data: {
      tagId: tagName,
      email: email,
      password: password,
      nickName: nickName,
    },
  });
};
