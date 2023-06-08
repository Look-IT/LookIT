//내 프로필 헤더 오른쪽 버튼 (로그아웃 용도)

import {
  Pressable,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { BLACK, DANGER, GRAY } from '../colors';
import { useUserContext } from '../contexts/UserContext';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-toast-message';

const HeaderRightButton = ({ tintColor }) => {
  const { user, setUser } = useUserContext(); // 현재 로그인 정보 받아오는 상태변수
  const refRBSheet = useRef(); // bottom sheet의 ref 상태 변수
  const [visible, setVisible] = useState(false); // 모달 창의 보임 여부를 나타내는 상태 변수

  const onLogout = () => {
    //로그아웃 버튼 클릭시 호출되는 함수
    setUser(null);

    Toast.show({
      type: 'success',
      text1: '성공적으로 로그아웃이 되었습니다.',
      position: 'bottom',
    });

    console.log(user);
  };

  return (
    <>
      <Pressable hitSlop={10} onPress={() => refRBSheet.current.open()}>
        <Image
          source={require('../../assets/Icon_More.png')}
          style={styles.image}
        ></Image>
      </Pressable>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={92}
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
        <TouchableOpacity onPress={onLogout}>
          <View style={styles.bottomSheetList}>
            <Image
              source={require('../../assets/Icon_Logout.png')}
              style={[styles.image, { marginRight: 8 }]}
            ></Image>
            <Text style={styles.text}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </RBSheet>
    </>
  );
};

HeaderRightButton.propTypes = {
  tintColor: PropTypes.string,
};

const styles = StyleSheet.create({
  bottomSheetList: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 16,
    color: DANGER.DEFAULT,
  },
});

export default HeaderRightButton;
