import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import { Text, View } from "react-native"
import { getFriendMemoriesList } from "../api/DiaryApi";
import DiaryList from "../components/DiaryList";
import { Family, Label } from "../styles/fonts";
import { GRAY } from "../colors";

const FriendMemoriesListScreen = ({ route }) => {

  const { item } = route.params;
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    
    getFriendMemoriesList(item.id)
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
      .catch(error => console.error(error));

  }, []);

  return (
    diary.length > 0
    ?
      <View style={{ paddingTop: 24 }}>
        <DiaryList
          data={diary}
          style={{ width: '100%' }}/>
      </View>
    :
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{
          ...Family.KR_Medium,
          ...Label.Medium,
          color: GRAY['500']
        }}>
          {`${item.nickName}의 추억일지가 존재하지 않습니다.`}</Text>
      </View>
  )
}

export default FriendMemoriesListScreen;