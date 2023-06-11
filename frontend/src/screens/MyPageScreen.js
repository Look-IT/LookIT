//설정 스크린

import { StyleSheet, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import DiaryList from '../components/DiaryList';
import React, { useEffect, useState } from 'react';
import { getMemoriesList } from '../api/DiaryApi';
import { useFocusEffect } from '@react-navigation/native';
import DateFilter from '../components/DateFilter';

const yearData = [
  '2023', '2022',
]

const MyPageScreen = () => {

  const [diary, setDiary] = useState([]);
  const [yearCategory, setYearCategory] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() =>{
    
    const years = diary?.map(item => item.date.split('.')[0]);
    // let uniqueYears = [...new Set(years)];
    let uniqueYears = yearData;

    uniqueYears = uniqueYears.map(item => {
      return ({
        name: item,
        value: item,
      })
    })
    uniqueYears.sort((a, b) => a.value - b.value);

    setYearCategory(uniqueYears);

  }, [diary]);

  useEffect(() => {
    handleFilter(selectedYear);
  }, [selectedYear]);

  const handleFilter = async (selectedYear) => {

      handleGetDiaryList()
        .then(response => {

          let diaryData = response.map((diaryObj) => {
            return {
              id: diaryObj.memoryId,
              date: diaryObj.createAt,
              thumbnail: diaryObj.memoryPhoto,
              tag: diaryObj.info,
              friends: diaryObj.friends,
            };
          })

          if (selectedYear !== null) {
            diaryData = diaryData.filter(item => item.date.split('.')[0] === selectedYear);
            setDiary(diaryData);
          }
          else {
            setDiary(diaryData);
          }

        })
        .catch(error => {
          console.log(error);

            Alert.alert('추억일지 조회 실패', '추억일지 조회가 실패했습니다.', [
              {
                text: '확인',
                style: 'default',
                onPress: () => {},
              },
            ]);
        })

  }

  const handleGetDiaryList = async () => {
    try {
      const response = await getMemoriesList();

      return response;

    } catch (error) {
      throw error;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      handleGetDiaryList()
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
          console.error(error);

          Alert.alert('추억일지 조회 실패', '추억일지 조회가 실패했습니다.', [
            {
              text: '확인',
              style: 'default',
              onPress: () => {},
            },
          ]);
        })

    }, [])
  );

  return (
    <View style={styles.container}>

      {
        yearCategory.length > 0 &&
          <DateFilter
            categories={yearCategory}
            selectedCategory={selectedYear}
            setSelectedCategory={setSelectedYear}/>
      }

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
