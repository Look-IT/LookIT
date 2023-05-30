//설정 스크린

import { StyleSheet, Text, View, Alert } from 'react-native';
import { PRIMARY, WHITE } from '../colors';
import DiaryList from '../components/DiaryList';
import React, { useState } from 'react';
import { diaryListGet } from '../api/DiaryApi';
import { useUserContext } from '../contexts/UserContext';
import { useFocusEffect } from '@react-navigation/native';
const MyPageScreen = () => {
  const { user } = useUserContext();
  const [diary, setDiary] = useState([
    /*
    {
      id: '133',
      date: '2023.04.27',
      thumbnail: '../../assets/main.png',
      tag: ['tag1', 'tag2'],
    },
    {
      id: '135',
      date: '2023.04.28',
      thumbnail: '../../assets/main.png',
      tag: ['tag1', 'tag2'],
    },
    {
      id: '137',
      date: '2023.04.29',
      thumbnail: '../../assets/main.png',
      tag: ['tag1', 'tag2'],
    },
    {
      id: '139',
      date: '2023.04.30',
      thumbnail: '../../assets/main.png',
      tag: ['tag1', 'tag2'],
    },
  */
  ]);

  const getDiaryList = async () => {
    //네컷 사진 리스트 요청하는 함수

    try {
      const response = await diaryListGet(
        'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/memories/list',
        user
      );

      if (response.data) {
        setDiary(
          response.data.map((diaryObj) => {
            return {
              id: diaryObj.memoryId,
              date: diaryObj.createAt,
              thumbnail: diaryObj.memoryPhoto,
              tag: diaryObj.info,
              friends: diaryObj.friends,
            };
          })
        );
        console.log(diary);
      } else {
        console.log(response.data);
        throw new Error(
          '추억일지 조회 실패: 서버로부터 잘못된 응답을 받았습니다.'
        );
      }
    } catch (error) {
      console.log(error.message);

      Alert.alert('추억일지 조회 실패', '추억일지 조회가 실패했습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getDiaryList();

      return () => {
        console.log('Screen unfocused');
      };
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      getDiaryList();

      return () => {
        console.log('Screen was unfocused');
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <DiaryList data={diary} style={{ width: '100%' }}></DiaryList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    justifyContent: 'center',
  },
});

export default MyPageScreen;
