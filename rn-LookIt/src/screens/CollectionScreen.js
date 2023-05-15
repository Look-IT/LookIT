//컬렉션 스크린

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { useState } from 'react';
const CollectionScreen = () => {
  const [isLeftPressed, setIsLeftPressed] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Pressable
          onPress={() => setIsLeftPressed(true)}
          style={[
            styles.textContainer,
            isLeftPressed && {
              borderBottomColor: PRIMARY.DEFAULT,
              borderBottomWidth: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              isLeftPressed && {
                color: PRIMARY.DEFAULT,
              },
            ]}
          >
            나의 추억 네컷
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setIsLeftPressed(false)}
          style={[
            styles.textContainer,
            !isLeftPressed && {
              borderBottomColor: PRIMARY.DEFAULT,
              borderBottomWidth: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              !isLeftPressed && {
                color: PRIMARY.DEFAULT,
              },
            ]}
          >
            공유된 추억 네컷
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: WHITE,
  },
  selectContainer: {
    width: '100%',
    height: 48,
    alignItem: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: GRAY[200],
    borderBottomWidth: 1,
  },
  textContainer: {
    width: 94,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: { fontSize: 14, fontWeight: 500, color: GRAY[500] },
});

export default CollectionScreen;
