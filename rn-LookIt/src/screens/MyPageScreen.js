//설정 스크린

import { StyleSheet, Text, View } from 'react-native';
import { WHITE } from '../colors';
const MyPageScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
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

export default MyPageScreen;
