//홈 스크린. 지도가 들어갈 곳.

import { StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
});

export default HomeScreen;
