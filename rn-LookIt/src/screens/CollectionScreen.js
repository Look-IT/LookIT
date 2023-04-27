//컬렉션 스크린

import { StyleSheet, Text, View } from 'react-native';

const CollectionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Collection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CollectionScreen;
