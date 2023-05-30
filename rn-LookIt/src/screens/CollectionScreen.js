//컬렉션 스크린

import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { useState } from 'react';
import FourCutList from '../components/FourCutList';
import { fourCutGet, taggedFourCutGet } from '../api/fourCutApi';
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useUserContext } from '../contexts/UserContext';
import { getMyInfo } from '../api/friendApi';

const CollectionScreen = () => {
  const { user } = useUserContext();
  const [isLeftPressed, setIsLeftPressed] = useState(true);
  const fourCutSepreatorWidth = Dimensions.get('window').width * (2 / 100);
  const [myAccount, setMyAccount] = useState({}); //내 계정 정보를 담은 상태 변수
  const fourCutListGet = async () => {
    //네컷 사진 리스트 요청하는 함수

    try {
      const response = await fourCutGet(user);

      if (response.data) {
        setFourCut(
          response.data.map((fourCutObj) => {
            return { id: fourCutObj.photo4CutId, uri: fourCutObj.photo4Cut };
          })
        );
        console.log(fourCut);
      } else {
        console.log(response.data);
        throw new Error('사진 조회 실패: 서버로부터 잘못된 응답을 받았습니다.');
      }
    } catch (error) {
      console.log(error.message);
      //console.log(error.response);
      Alert.alert('사진조회 실패', '사진 조회가 실패했습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  };

  const taggedFourCutListGet = async (myTagId) => {
    //네컷 사진 리스트 요청하는 함수

    try {
      const response = await taggedFourCutGet(myTagId);

      if (response.data) {
        setTaggedFourCut(
          response.data.map((fourCutObj) => {
            return { id: fourCutObj.photo4CutId, uri: fourCutObj.photo4Cut };
          })
        );
        console.log(fourCut);
      } else {
        console.log(response.data);
        throw new Error(
          '태그사진 조회 실패: 서버로부터 잘못된 응답을 받았습니다.'
        );
      }
    } catch (error) {
      console.log(error.message);
      //console.log(error.response);
      Alert.alert('태그사진조회 실패', '사진 조회가 실패했습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  };
  const sampleImage = Image.resolveAssetSource(
    require('../../assets/Default_Frame.png')
  ).uri;

  const [fourCut, setFourCut] = useState([]);
  const [taggedFourCut, setTaggedFourCut] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fourCutListGet();
      taggedFourCutListGet(myAccount.tagId);
      getMyInfo(user, myAccount, setMyAccount);
      console.log(myAccount.tagId);
      return () => {
        console.log('Screen unfocused');
      };
    }, [isLeftPressed])
  );
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
      <View style={{ height: fourCutSepreatorWidth }}></View>
      {isLeftPressed ? (
        <FourCutList data={fourCut}></FourCutList>
      ) : (
        <FourCutList data={taggedFourCut}></FourCutList>
      )}
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
