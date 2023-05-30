//완성된 추억네컷 스크린

import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { WHITE } from '../colors';
import { useEffect, useState } from 'react';
import { BLACK } from '../colors';
import Button, { ButtonTypes } from '../components/buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { fourCutFrameGet } from '../api/fourCutApi';
import Toast from 'react-native-toast-message';
import { useUserContext } from '../contexts/UserContext';
import { getFriendList, myFriendListGet } from '../api/friendApi';
import TagFriendList from '../components/TagFriendList';

const FourCutTagScreen = ({ route }) => {
  const { sellectedImage, frameUri } = route.params;
  const { user } = useUserContext();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // 클릭 시, 서버와 통신하는 동안 중복 요청을 방지하는 상태 변수
  const [friend, setFriend] = useState([]); //친구 목록 데이터
  const [taggedFriend, setTaggedFriend] = useState([]); //태그된 친구 태그 아이디 배열

  useEffect(() => {
    getFriendList(user, friend, setFriend, myFriendListGet);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>태그할 친구를</Text>
        <Text style={styles.textStyle}>선택해 주세요.</Text>
      </View>
      <View>
        <TagFriendList
          data={friend}
          taggedFriend={taggedFriend}
          setTaggedFriend={setTaggedFriend}
        ></TagFriendList>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="다음"
          onPress={() => {
            navigation.navigate('FourPictureEditScreen', {
              sellectedImage,
              frameUri,
              taggedFriend,
            });
          }}
          buttonType={ButtonTypes.PRIMARY}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 16,
  },
  textContainer: {
    height: 64,
    width: '100%',
    marginBottom: 48,
    marginTop: 24,
    alignItems: 'flex-start',
  },

  textStyle: { fontSize: 24, fontWeight: 400 },

  buttonContainer: {
    height: 48,
    width: '100%',
    position: 'absolute',
    bottom: 34,
  },
  basicFrame: {
    width: 600,
    height: 888,
  },

  fourPicture: {
    width: 255,
    height: 303,
    position: 'absolute',
  },
});

export default FourCutTagScreen;
