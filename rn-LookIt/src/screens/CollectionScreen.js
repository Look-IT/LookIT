//컬렉션 스크린

import { Image, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { useState } from 'react';
import FourCutList from '../components/FourCutList';
import { fourCutGet } from '../api/fourCutApi';
import { useEffect } from 'react';
import { Dimensions } from 'react-native';
const CollectionScreen = () => {
  const [isLeftPressed, setIsLeftPressed] = useState(true);
  const fourCutSepreatorWidth = Dimensions.get('window').width * (2 / 100);
  const fourCutListGet = async () => {
    //네컷 사진 리스트 요청하는 함수

    try {
      const response = await fourCutGet(
        'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/collections'
      );

      if (response.data) {
        setFourCut(
          response.data.map((fourCutObj) => {
            return { id: fourCutObj.photo4CutId, uri: fourCutObj.photo4Cut };
          })
        );
        console.log(fourCut);
      } else {
        console.log(response.data);
        throw new Error('사진 조회 실패: 서버로부터 잘못된 응답을 받았습니다.');
      }
    } catch (error) {
      console.log(error.message);
      //console.log(error.response);
      Alert.alert('사진조회 실패', '사진 조회가 실패했습니다.', [
        {
          text: '확인',
          style: 'default',
          onPress: () => {},
        },
      ]);
    }
  };
  const sampleImage = Image.resolveAssetSource(
    require('../../assets/Default_Frame.png')
  ).uri;

  /* const [fourCut, setFourCut] = useState([
    { id: '1', uri: sampleImage },
    { id: '2', uri: sampleImage },
    { id: '3', uri: sampleImage },
    { id: '4', uri: sampleImage },
    { id: '5', uri: sampleImage },
    { id: '6', uri: sampleImage },
  ]);*/
  const [fourCut, setFourCut] = useState([]);
  const [taggedFourCut, settaggedFourCut] = useState([]);

  useEffect(() => {
    fourCutListGet();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Pressable
          onPress={() => setIsLeftPressed(true)}
          style={[
            styles.textContainer,
            isLeftPressed && {
              borderBottomColor: PRIMARY.DEFAULT,
              borderBottomWidth: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              isLeftPressed && {
                color: PRIMARY.DEFAULT,
              },
            ]}
          >
            나의 추억 네컷
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setIsLeftPressed(false)}
          style={[
            styles.textContainer,
            !isLeftPressed && {
              borderBottomColor: PRIMARY.DEFAULT,
              borderBottomWidth: 2,
            },
          ]}
        >
          <Text
            style={[
              styles.textStyle,
              !isLeftPressed && {
                color: PRIMARY.DEFAULT,
              },
            ]}
          >
            공유된 추억 네컷
          </Text>
        </Pressable>
      </View>
      <View style={{ height: fourCutSepreatorWidth }}></View>
      {isLeftPressed ? (
        <FourCutList data={fourCut}></FourCutList>
      ) : (
        <FourCutList data={taggedFourCut}></FourCutList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    backgroundColor: WHITE,
  },
  selectContainer: {
    width: '100%',
    height: 48,
    alignItem: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: GRAY[200],
    borderBottomWidth: 1,
  },
  textContainer: {
    width: 94,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: { fontSize: 14, fontWeight: 500, color: GRAY[500] },
});

export default CollectionScreen;
