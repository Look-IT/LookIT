import axios from 'axios';
import { Alert } from 'react-native';

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

export const taggedFourCutGet = async (myTagId) => {
  const url =
    'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/' +
    myTagId;
  console.log('url=' + url);
  return await axios({
    method: 'GET',
    url: url,
  });
};

export const fourCutFrameGet = async (landmarkId) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/4cutphoto',
    params: { landmarkId: landmarkId },
  });
};

export const fourCutTagPost = async (photo4CutId, tagArray) => {
  return await axios({
    method: 'POST',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/tag',
    params: { photo4CutId: photo4CutId },
    data: tagArray,
  });
};

export const fourCutTagGet = async (photo4CutId) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/taggedFriendList',
    params: { photo4CutId: photo4CutId },
  });
};

export const fourCutDel = async (photo4CutId) => {
  return await axios({
    method: 'DELETE',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections/4CutPhotoDelete',
    params: { photo4CutId: photo4CutId },
  });
};

export const setFourCutTag = async (photo4CutId, tagArray) => {
  //4컷 태그 설정

  try {
    const response = await fourCutTagPost(photo4CutId, tagArray);

    if (response.data) {
    } else {
      console.log(response.data);
      throw new Error('태그 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('태그 실패', '태그가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const getFourCutTag = async (photo4CutId, setTag) => {
  //4컷 태그 조회

  try {
    const response = await fourCutTagGet(photo4CutId);

    if (response.data) {
      setTag(response.data);
    } else {
      console.log(response.data);
      throw new Error('태그 조회 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('태그 조회 실패', '태그 조회가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const deleteFourCut = async (photo4CutId, setReset) => {
  //4컷 사진 삭제

  try {
    console.log(photo4CutId);
    const response = await fourCutDel(photo4CutId);

    if (response.data) {
      console.log('네컷 사진 삭제 완료');
      setReset(true);
    } else {
      console.log(response.data);
      throw new Error(
        '네컷 사진 삭제 실패: 서버로부터 잘못된 응답을 받았습니다.'
      );
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('네컷 사진 삭제 실패', '네컷 사진 삭제가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};
