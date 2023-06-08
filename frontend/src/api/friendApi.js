import axios from 'axios';
import { Alert } from 'react-native';

export const myInfoGet = async (user) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/my',
    headers: {
      token: user,
    },
  });
};

export const myFriendListGet = async (user) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/list',
    headers: {
      token: user,
    },
  });
};

export const mySendFriendListGet = async (user) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/request',
    headers: {
      token: user,
    },
  });
};

export const myReceiveFriendListGet = async (user) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/accept',
    headers: {
      token: user,
    },
  });
};

export const RequestFriend = async (user, tagId) => {
  return await axios({
    method: 'POST',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/request',
    headers: {
      token: user,
    },
    params: {
      tagId: tagId,
    },
  });
};

export const AcceptFriend = async (user, tagId) => {
  return await axios({
    method: 'POST',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/accept',
    headers: {
      token: user,
    },
    params: {
      tagId: tagId,
    },
  });
};

export const denyFriend = async (user, tagId) => {
  return await axios({
    method: 'DELETE',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/reject',
    headers: {
      token: user,
    },
    params: {
      tagId: tagId,
    },
  });
};

export const cancelFriend = async (user, tagId) => {
  console.log(user);
  console.log(tagId);
  return await axios({
    method: 'DELETE',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends/request',
    headers: {
      token: user,
    },
    params: {
      tagId: tagId,
    },
  });
};

export const friendSearch = async (user, tagId) => {
  return await axios({
    method: 'GET',
    url: 'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/friends',
    params: {
      tagId: tagId,
    },
    headers: {
      token: user,
    },
  });
};

export const getFriendList = async (user, data, setData, getFunc) => {
  //각종 친구 리스트 요청하는 함수

  try {
    const response = await getFunc(user);

    if (response.data) {
      setData(
        response.data.map((Obj) => {
          return {
            id: Obj.tagId,
            nickName: Obj.nickName,
          };
        })
      );
      // console.log(data);
    } else {
      console.log(response.data);
      throw new Error('리스트 조회 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('리스트 조회 실패', '리스트 조회가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const getMyInfo = async (user, myAccount, setMyAccount) => {
  //내 정보 요청하는 함수

  try {
    const response = await myInfoGet(user);

    if (response.data) {
      setMyAccount(response.data);
      console.log(myAccount);
      console.log(response.data.tagId);
    } else {
      console.log(response.data);
      throw new Error(
        '내 정보 조회 실패: 서버로부터 잘못된 응답을 받았습니다.'
      );
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('내 정보 조회 실패', '리스트 조회가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const acceptFriendRequest = async (user, tagId) => {
  //친구 수락하는 함수

  try {
    const response = await AcceptFriend(user, tagId);

    if (response.data) {
      console.log(response.data);
    } else {
      console.log(response.data);
      throw new Error('친구 수락 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('친구 수락 실패', '친구 수락이 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const denyFriendRequest = async (user, tagId) => {
  //받은 친구 거절하는 함수

  try {
    const response = await denyFriend(user, tagId);

    if (response.data) {
      console.log(response.data);
    } else {
      console.log(response.data);
      throw new Error('친구 거절 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('친구 거절 실패', '친구 거절이 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const cancelFriendRequest = async (user, tagId) => {
  //보낸 친구 요청 취소하는 함수

  try {
    const response = await cancelFriend(user, tagId);

    if (response.data) {
      console.log(response.data);
    } else {
      console.log(response.data);
      throw new Error(
        '친구 요청 취소 실패: 서버로부터 잘못된 응답을 받았습니다.'
      );
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('친구 요청 취소 실패', '친구 요청 취소가 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const searchFriendList = async (user, tagId, data, setData) => {
  //친구 검색하는 함수

  try {
    const response = await friendSearch(user, tagId);

    if (response.data) {
      setData(response.data);
      console.log(data);
    } else {
      console.log(response.data);
      throw new Error('친구 검색 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('친구 검색 실패', '친구 검색이 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};

export const sendFriendRequest = async (user, tagId) => {
  //친구 요청하는 함수

  try {
    const response = await RequestFriend(user, tagId);

    if (response.data) {
      console.log(response.data);
    } else {
      console.log(response.data);
      throw new Error('친구 요청 실패: 서버로부터 잘못된 응답을 받았습니다.');
    }
  } catch (error) {
    console.log(error.message);

    Alert.alert('친구 요청 실패', '친구 요청이 실패했습니다.', [
      {
        text: '확인',
        style: 'default',
        onPress: () => {},
      },
    ]);
  }
};
