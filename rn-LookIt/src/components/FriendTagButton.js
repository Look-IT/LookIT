//리스트 확장, 축소시 위아래로 표시되는 화살표 ui

import { Image, Pressable, StyleSheet } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { BLACK } from '../colors';

const ActionSheetOptions = {
  title: '태그된 친구목록',
  options: ['로그아웃'],

  cancelButtonIndex: -1,
  containerStyle: {
    paddingTop: 30,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
  },
  titleTextStyle: {
    color: BLACK,
    textAlign: 'center',
    fontSize: 16,
  },

  textStyle: {},
};

const FriendTagButton = ({ tagFriend }) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressActionSheet = (idx) => {
    console.log(idx);
  };
  return (
    <Pressable
      onPress={() => {
        showActionSheetWithOptions(ActionSheetOptions, onPressActionSheet);
      }}
    >
      <Image
        source={require('../../assets/Icon_Person.png')}
        style={styles.image}
      ></Image>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
  },
});
export default FriendTagButton;
