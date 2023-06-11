import { Image, Platform, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { BLACK } from "../colors";
import FriendAddInput, { KeyboardTypes, ReturnKeyTypes } from "../components/FriendAddInput";
import { useState } from "react";
import { getSearchMemories } from "../api/DiaryApi";
import DiaryList from "../components/DiaryList";
import { useNavigation } from "@react-navigation/native";

const MemoriesSearchScreen = () => {
  const [infoTag, setInfoTag] = useState('');
  const [searchDiaryList, setSearchDiaryList] = useState([]);
  const navigation = useNavigation();

  return (
    
    <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.leftIcon}
            source={require('../../assets/Icon_Back.png')}/>
        </Pressable>
      </View>

      <FriendAddInput
        title={''}
        placeholder="검색하고자 하는 정보태그를 입력해주세요"
        keyboardType={KeyboardTypes.DEFAULT}
        returnKeyType={ReturnKeyTypes.DONE}
        value={infoTag}
        onChangeText={(inputData) => {
          setInfoTag(inputData.trim())
        }}
        onSubmitEditing={() => {
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
        }}/>

        <DiaryList data={searchDiaryList} style={{width: '100%'}} />

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
    justifyContent: 'center',
  },
  leftIcon: {
    width: 24,
    height: 24,
    tintColor: BLACK,
  }
})

export default MemoriesSearchScreen;