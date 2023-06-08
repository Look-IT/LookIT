//설정 스크린

import { StyleSheet, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import DiaryList from '../components/DiaryList';
import React, { useState } from 'react';
import { getMemoriesList } from '../api/DiaryApi';
import { useFocusEffect } from '@react-navigation/native';
import { getMemoriesPhoto } from '../api/memories';
const MyPageScreen = () => {

  const [diary, setDiary] = useState([]);
  
  const getDiaryList = async () => {
    //네컷 사진 리스트 요청하는 함수

    getMemoriesList()
      .then(response => {

        setDiary(
          response.map((diaryObj) => {
            return {
              id: diaryObj.memoryId,
              date: diaryObj.createAt,
              thumbnail: diaryObj.memoryPhoto,
              tag: diaryObj.info,
              friends: diaryObj.friends,
            };
          })
        )
      })
      .catch(error => {
        console.log(error.message);

        Alert.alert('추억일지 조회 실패', '추억일지 조회가 실패했습니다.', [
          {
            text: '확인',
            style: 'default',
            onPress: () => {},
          },
        ]);
      })
  };

  useFocusEffect(
    React.useCallback(() => {
      getDiaryList();

      return () => {
        console.log('Screen unfocused');
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
