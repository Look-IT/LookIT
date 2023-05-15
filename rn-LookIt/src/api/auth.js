import axios from 'axios';

export const signIn = async (url, email, password) => {
  return await axios({
    method: 'POST',
    url: url,
    data: { email: email, password: password },
  });
};

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
      tagName: tagName,
      email: email,
      password: password,
      nickName: nickName,
    },
  });
};
