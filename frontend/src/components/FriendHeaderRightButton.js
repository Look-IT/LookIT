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
import { useNavigation } from '@react-navigation/native';

const FriendHeaderRightButton = ({ tintColor }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      hitSlop={8}
      onPress={() => {
        navigation.navigate('FriendAddScreen');
      }}
    >
      <Image
        source={require('../../assets/Icon_Add.png')}
        style={styles.image}
      ></Image>
    </Pressable>
  );
};

FriendHeaderRightButton.propTypes = {
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

export default FriendHeaderRightButton;
