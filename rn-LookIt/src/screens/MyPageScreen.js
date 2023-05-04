//설정 스크린

import { StyleSheet, Text, View } from 'react-native';
import { PRIMARY, WHITE } from '../colors';
import DiaryList from '../components/DiaryList';
import { useState } from 'react';

const MyPageScreen = () => {
  const [diary, setDiary] = useState([
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
  ]);

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
