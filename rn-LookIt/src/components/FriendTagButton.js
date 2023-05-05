//리스트 확장, 축소시 위아래로 표시되는 화살표 ui

import { Image, Pressable, StyleSheet } from 'react-native';

const FriendTagButton = ({ tagFriend }) => {
  return (
    <Pressable onPress={() => {}}>
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
