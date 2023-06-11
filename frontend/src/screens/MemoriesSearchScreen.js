import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import { BLACK, GRAY } from "../colors";
import { KeyboardTypes, ReturnKeyTypes } from "../components/FriendAddInput";
import { useCallback, useRef, useState } from "react";
import { getSearchMemories } from "../api/DiaryApi";
import DiaryList from "../components/DiaryList";
import { useFocusEffect } from "@react-navigation/native";
import MemoriesSearchInput from "../components/MemoriesSearchInput";
import { Family, Label } from "../styles/fonts";

const MemoriesSearchScreen = () => {
  const [infoTag, setInfoTag] = useState('');
  const [searchDiaryList, setSearchDiaryList] = useState([]);
  const saveInfoTag = useRef();

  useFocusEffect(
    useCallback(() => {
      saveInfoTag.current && handleReload();
    }, [])
  )

  const handleReload = async () => {
      setInfoTag(saveInfoTag.current);
      handleGetDiary(saveInfoTag.current);
      saveInfoTag.current = null;
  }

  const handleGetDiary = (infoTag) => {
    getSearchMemories(infoTag)
      .then(response => {
        setSearchDiaryList(
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
      .catch(error => console.error(error))
  }

  return (
    
    <View style={styles.container}>

      <View style={styles.headerContainer}>

        <MemoriesSearchInput
          title={''}
          placeholder="정보태그를 입력해주세요"
          keyboardType={KeyboardTypes.DEFAULT}
          returnKeyType={ReturnKeyTypes.DONE}
          value={infoTag}
          onChangeText={(inputData) => {
            setInfoTag(inputData.trim());
          }}
          onSubmitEditing={() => {
            saveInfoTag.current = infoTag;
            handleGetDiary(infoTag);
          }}/>
      </View>

        {
          searchDiaryList.length > 0 && 
            <DiaryList data={searchDiaryList} style={{width: '100%'}} />
        }

        {
          searchDiaryList.length === 0 && saveInfoTag.current &&
            <View style={styles.isEmptyContainer}>
              <Text style={{
                ...Family.KR_Medium,
                ...Label.Medium,
                color: GRAY['500']
              }}>
                {'검색한 정보태그를 가지는 추억일지가 없습니다.'}</Text>
            </View>
        }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  headerContainer: {
    height: 56,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',

  },
  leftIcon: {
    width: 24,
    height: 24,
    tintColor: BLACK,
  },
  isEmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MemoriesSearchScreen;