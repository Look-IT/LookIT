import axios from 'axios';

export const signIn = async (url, email, password) => {
  return await axios({
    method: 'POST',
    url: 'https://reqres.in/api/login',
    data: { email: email, password: password },
  });
};
