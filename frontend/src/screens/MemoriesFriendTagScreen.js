import { StyleSheet, Text, View } from "react-native"
import { Family, Headline } from "../styles/fonts";
import Button from "../components/buttons/Button";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getFriendList, myFriendListGet } from "../api/friendApi";
import { useUserContext } from "../contexts/UserContext";
import TagFriendList from "../components/TagFriendList";
import { useMemoriesContext } from "../contexts/MemoriesContext";

const MemoriesFriendTagScreen = () => {

  const [friend, setFriend] = useState([]);
  const [taggedFriend, setTaggedFriend] = useState([]);
  const { user } = useUserContext();
  const { friendTags, setFriendTags } = useMemoriesContext();
  const navigation = useNavigation();

  useEffect(() => {
    getFriendList(user, friend, setFriend, myFriendListGet);
  }, []);

  const handleFrinedTagsSubmit = () => {
    const value = taggedFriend.map((item) => item.tagId);
    setFriendTags(value);
  };

  useEffect(() => {
    console.log('TAGS: ', friendTags);
  }, [friendTags]);


  return (
    <View style={styles.viewContainer}>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{'태그할 친구를'}</Text>
        <Text style={[styles.title, {marginTop: 8}]}>{'선택해 주세요'}</Text>
      </View>

      <View>
        <TagFriendList
          data={friend}
          taggedFriend={taggedFriend}
          setTaggedFriend={setTaggedFriend}/>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="다음"
          onPress={() => {
            handleFrinedTagsSubmit();
            navigation.navigate('MemoriesInfoTagScreen')
          }}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 24,
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    marginBottom: 48,
  },  
  title: {
    ...Family.KR_Regular,
    ...Headline.Small,
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
    paddingHorizontal: 10,
  }
})

export default MemoriesFriendTagScreen;