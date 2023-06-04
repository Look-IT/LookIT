import { Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Body, Family, Headline } from "../styles/fonts";
import TagInput from "../components/TagInput";
import { useCallback, useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import { PRIMARY, WHITE } from "../colors";
import HashTag from "../components/HashTag";
import { useMemoriesContext } from "../contexts/MemoriesContext";
import { useNavigation } from "@react-navigation/native";
import { postMemoriesCreate, postMemoriesHashtag } from "../api/memories";
import { postMemoriesImage } from "../api/memoriesImage";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const MemoriesInfoTagScreen = () => {

  const [ input, setInput ] = useState('');
  const { 
    tags, 
    setTags,
    memoryId,
    setMemoryId,
    trackingLocation,
    setTrackingLocation,
    pictureMarker,
    setPictureMarker,
  } = useMemoriesContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (memoryId !== null) {
      console.log('SAVE START : ', memoryId);

      const promises = pictureMarker.flatMap(marker => {
        marker.uri.map(uri => postMemoriesImage(memoryId, marker, uri));
      });
      Promise.all(promises)
        .then(response => console.log('IMAGE UPLOAD SUCCESS'))
        .catch(error => console.error('IMAGE: ', error));

      postMemoriesHashtag(memoryId, tags)
        .then(response => {
          console.log(response);

          setMemoryId(null);
          setTrackingLocation([]);
          setPictureMarker([]);
          setTags([]);
          navigation.popToTop();

          Toast.show({
            type: 'success',
            text1: '추억일지가 생성되었습니다.',
            position: 'bottom',
          })
        })
        .catch(error => console.error(error));
    }
  }, [memoryId]);

  const handleTagSubmit = () => {
    if (input !== '') {
      const data = {
        info: input,
      };

      setTags([...tags, data]);
      setInput('');
    }
  }

  const handleTagRemove = useCallback((removeTag) => {
    setTags(tags => tags.filter(tag => tag.info !== removeTag));
  }, []);

  const handleMemoriesCreate = () => {
    postMemoriesCreate(trackingLocation)
      .then(response => setMemoryId(response))
      .catch(error => console.error('create: ', error));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <TagInput
            value={input}
            placeholder='해시태그를 입력해 주세요.'
            onChangeText={(input) => setInput(input.trim())}
            onSubmitEditing={handleTagSubmit}
            blurOnSubmit={false}
            autoCorrect={false}/>

          <Pressable
            style={({ pressed }) => [
              styles.addButtonContainer,
              pressed && { backgroundColor: PRIMARY['300']}
            ]}
            onPress={handleTagSubmit}>
            <Text style={styles.addButtonText}>
              {'추가'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.tagContainer}>
          <HashTag tags={tags} handleTagRemove={handleTagRemove}/>
        </View>

        <View style={styles.nextButtonContainer}>
          <Button
            title="추억일지 생성"
            onPress={handleMemoriesCreate}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 24,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  addButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY['500'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  addButtonText: {
    ...Family.KR_Regular,
    ...Body.Medium,
    color: WHITE,
  },
  tagContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  title: {
    ...Family.KR_Medium,
    ...Headline.Small,
  },
  nextButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 24,
  }
})


export default MemoriesInfoTagScreen;