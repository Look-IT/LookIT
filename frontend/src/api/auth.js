import axios from 'axios';
import { apiClient } from './apiClient';
import { Alert } from 'react-native';

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
    });

    return response.data;
  } catch (error) {
    throw error;
  }
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
      tagId: tagName,
      email: email,
      password: password,
      nickName: nickName,
    },
  });
};

export const idConfirm = async (tagId) => {
  return await axios({
    method: 'GET',
    url: 'http://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/join/exists',
    params: { tagId: tagId },
  });
};

export const emailConfirmPost = async (email) => {
  return await axios({
    method: 'POST',
    url: 'http://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/emailConfirm',
    params: { email: email },
  });
};
export const emailJoinConfirmPost = async (email) => {
  return await axios({
    method: 'POST',
    url: 'http://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/emailConfirmJoin',
    params: { email: email },
  });
};

export const newPasswordPost = async (email, password) => {
  return await axios({
    method: 'POST',
    url: 'http://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/member/findPassword',
    data: { email: email, password: password },
  });
};

export const idUniqueCheck = async (
  tagId,
  setIdConfirm,
  setIsLoading,
  isLoading
) => {
  if (!isLoading) {
    try {
      setIsLoading(true);
      const response = await idConfirm(tagId);

      if (response.data) {
        console.log('아이디 중복 체크 : ' + response.data);
        setIdConfirm(true);
        Alert.alert('아이디 중복 체크', '사용 가능한 아이디입니다.', [
          {
            text: '확인',
            style: 'default',
            onPress: () => {},
          },
        ]);
      } else {
        setIdConfirm(false);
        Alert.alert(
          '아이디 중복 체크',
          '이미 가입된 아이디입니다. \n다른 아이디를 입력해주세요.',
          [
            {
              text: '확인',
              style: 'default',
              onPress: () => {},
            },
          ]
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);

      Alert.alert('중복 체크 실패', '중복 체크가 실패했습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  }
};
