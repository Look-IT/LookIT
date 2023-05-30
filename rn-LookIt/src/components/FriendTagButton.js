//리스트 확장, 축소시 위아래로 표시되는 화살표 ui

import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
import { useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BLACK, GRAY, WHITE } from '../colors';

const FriendTagButton = ({ tagFriend, style }) => {
  const refRBSheet = useRef(); // bottom sheet의 ref 상태 변수

  // console.log(tagFriend);

  return (
    <>
      <Pressable
        style={style}
        onPress={() => {
          refRBSheet.current.open();
        }}
      >
        <Image
          source={require('../../assets/Icon_Person.png')}
          style={styles.image}
        ></Image>
      </Pressable>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={232}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: '#00000045',
          },
          draggableIcon: {
            backgroundColor: GRAY[300],
          },
          container: {
            width: '100%',
            paddingHorizontal: 20,
            borderTopStartRadius: 28,
            borderTopEndRadius: 28,
          },
        }}
      >
        <View style={styles.bottomSheetList}>
          <View>
            <ScrollView contentContainerStyle={styles.scrollViewStyle}>
              <Text style={styles.text}>태그된 친구목록</Text>
              {tagFriend?.map((item, index) => {
                return (
                  <View style={{ width: '100%' }} key={index}>
                    <View style={styles.textContainer}>
                      <Text style={styles.nickNameFont}>{item.nickName}</Text>
                      <Text style={styles.idFont}>#{item.tagId}</Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </RBSheet>
    </>
  );
};

const styles = StyleSheet.create({
  bottomSheetList: {
    width: '100%',
    height: 196,

    alignItems: 'center',
  },
  scrollViewStyle: {
    width: '100%',
    height: 196,

    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 24,
    width: 24,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  nickNameFont: {
    fontSize: 14,
    fontWeight: 500,
    color: BLACK,
    paddingRight: 8,
  },
  idFont: {
    fontSize: 10,
    fontWeight: 500,
    color: GRAY[400],
  },
});
export default FriendTagButton;
