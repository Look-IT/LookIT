//친구 추가 스크린

import { StyleSheet, Text, View } from 'react-native';
import FriendAddInput, {
  ReturnKeyTypes,
  KeyboardTypes,
} from '../components/FriendAddInput';
import { WHITE } from '../colors';
import { useState } from 'react';
import AddFriendList from '../components/AddFriendList';
const FriendAddScreen = () => {
  const [friendTagId, setFriendTagId] = useState('');
  const [AddFriend, setAddFriend] = useState([
    { id: '123', nickName: '임민호' },
    { id: '223', nickName: '임민호' },
    { id: '323', nickName: '임민호' },
  ]); //검색된 친구 추가 정보를 담은 상태 변수

  return (
    <View style={styles.container}>
      <FriendAddInput
        title={''}
        placeholder="찾고자 하는 친구의 아이디를 입력해주세요."
        keyboardType={KeyboardTypes.EMAIL}
        returnKeyType={ReturnKeyTypes.NEXT}
        onChangeText={(friendTagId) => {
          console.log(friendTagId);
          setFriendTagId(friendTagId.trim());
        }}
        onSubmitEditing={() => {}}
        value={friendTagId}
      ></FriendAddInput>
      <View>
        <AddFriendList data={AddFriend}></AddFriendList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 16,
  },
});

export default FriendAddScreen;
