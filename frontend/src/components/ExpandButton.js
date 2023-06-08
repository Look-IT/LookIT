//리스트 확장, 축소시 위아래로 표시되는 화살표 ui

import { Image, StyleSheet } from 'react-native';

const ExpandButton = ({ isExpand }) => {
  return (
    <>
      {isExpand ? (
        <Image
          style={styles.image}
          source={require('../../assets/Icon_Drop-down.png')}
        ></Image>
      ) : (
        <Image
          style={styles.image}
          source={require('../../assets/Icon_Drop-up.png')}
        ></Image>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
  },
});

export default ExpandButton;
