//찍은 8장중 4장 고르는 스크린

import { Image, StyleSheet, Text, View, Alert } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../colors';
import { useEffect, useState, useRef } from 'react';
import { BLACK } from '../colors';
import Button, { ButtonTypes } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import FourCutSellectImage from '../components/FourCutSellectImage';
import Toast from 'react-native-toast-message';

const FourCutSellectScreen = ({ route }) => {
  const navigation = useNavigation();
  const { image } = route.params;

  const [sellectedImage, setSellectedImage] = useState([]); //선택된 이미지를 저장하는 배열

  const [isLoading, setIsLoading] = useState(false); //로그인 클릭 시, 서버와 통신하는 동안 중복 요청을 방지하는 상태 변수
  const [width, setWidth] = useState(false);

  const [count, setCount] = useState(0); //선택된 이미지 갯수

  //이미지 하나 클릭할 때마다 호출되는 함수
  const onClicked = (uri, isPressed, setIsPressed) => {
    const id = uri;
    const data = uri;
    console.log(count);

    if (count < 4 || (count >= 4 && isPressed)) {
      if (!isPressed) {
        setCount((prev) => prev + 1);
        setSellectedImage((prev) => [...prev, { id, data }]);
      } else {
        setCount((prev) => prev - 1);

        setSellectedImage((prev) => {
          return prev.filter((obj) => obj.id != id);
        });
      }
      setIsPressed(!isPressed);
    }
  };

  //선택 완료 버튼시 호출되는 함수
  const onSubmit = () => {};

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
    console.log(width);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>추억으로 남길</Text>
        <Text style={styles.textStyle}>4장을 선택해 주세요.</Text>
      </View>
      <View style={styles.pictureContainer} onLayout={onLayout}>
        <Image
          style={{
            width: (width * 3) / 10,
            height: (width * 4) / 10,
          }}
          source={require('../../assets/Info_Frame.png')}
        ></Image>
        {image.map((obj) => {
          //console.log(obj.data.uri);

          return (
            <FourCutSellectImage
              key={obj.data.uri}
              style={{
                width: (width * 3) / 10,
                height: (width * 4) / 10,
              }}
              source={obj.data.uri}
              onClicked={onClicked}
              sellectedImage={sellectedImage}
            ></FourCutSellectImage>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="완료"
          onPress={() => {
            if (count == 4) {
              navigation.navigate('FourPictureEditScreen', { sellectedImage });
              console.log(sellectedImage);
            } else {
              Toast.show({
                type: 'success',
                text1: '사진 네장을 모두 선택해주세요.',
                position: 'top',
              });
            }
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
    marginBottom: 24,
    marginTop: 24,
    alignItems: 'flex-start',
  },

  pictureContainer: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    //backgroundColor: GRAY.DEFAULT,
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
});

export default FourCutSellectScreen;
