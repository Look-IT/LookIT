import { Modal, View, Text, StyleSheet, Pressable, Image, Platform, Alert } from "react-native";
import { BLACK, GRAY, WHITE } from "../../colors";
import ModalButton from "./ModalButton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

import * as ImagePicker from 'expo-image-picker';
import { useUserContext } from "../../contexts/UserContext";
import { memoriesImagePost } from "../../api/memoriesImage";

const PictureUploadModal = ({clicked, onPressCancel, onPressSuccess, spotLatitude, spotLongitude}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [imageData, setImageData] = useState(null);
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const navigation = useNavigation();

  const { memoryId } = useUserContext();
  
  useEffect(() => {
    setVisibleModal(clicked);
  }, [clicked]);
  
  useEffect(() => {
    console.log(imageData);
    console.log('memoryID ::: ', memoryId);
    console.log('spotLatitude ::: ', spotLatitude);
    console.log('spotLongitude ::: ', spotLongitude);
  }, [imageData]);

  const onPressUpload = async () => {
    if (!imageData) {
      console.log('imageData Empty');
      return;
    }
    try {
      const response = await memoriesImagePost(
        'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/memories/upload',
        memoryId,
        spotLatitude,
        spotLongitude,
        imageData,
      );

      if (response.data) {
        console.log(response.data);
      }

    } catch (error) {
      console.log('ERROR: ', error.message);
    }
    // setVisibleModal(false);
    onPressCancel();
    onPressSuccess();
    // navigation.navigate('MemoriesCreateScreen', {myPosition, movePath, landmarks});
  };

  const onPressPictureUpload = async () => {
    // if (Platform.OS !== 'android') {
    //   return false;
    // }

    // const hasPermission = await check(
    //   PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    // );
    // console.log('STORAGE: ', hasPermission);

    // if (hasPermission === RESULTS.GRANTED) {
    //   return true;
    // }

    // const status = await request(
    //   PERMISSIONS.READ_MEDIA_IMAGES,
    // );
    // console.log("STORAGE STATUS: ", status);

    // if (status === RESULTS.GRANTED) {
    //   return true;
    // }
  
    // if (status === RESULTS.DENIED) {
    //   ToastAndroid.show(
    //     'Storage permission denied by user.',
    //     ToastAndroid.LONG,
    //   );
    // }
  
    // return false;

    const getPermission = async () => {
      if (Platform.OS !== 'android') {
        return false;
      }

      const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('사진첩 권한 필요함')
        return false;
      }
      return true;
    }
    // getPermission();
    

    const pickImage = async () => {
      console.log('이미지 선택');
      let imageData = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All, // 이미지 타입을 지정할 수 있다
          // allowsEditing: true, // 사진을 수정허용 여부을 지정한다.
          // aspect: [4, 4], // 사진의 비율을 정할 수 있다.
          quality: 1, // 현재 용량을 줄이고 높일 수 있다.
      });
      delete imageData.cancelled;
      console.log('이미지 데이터: ', imageData.assets[0].uri);
      setImageData(imageData.assets[0].uri);
    }
    pickImage();
    
  }

  return (
    <Modal
        style={{alignItems: 'center', justifyContent: 'center'}}
        animationType={'fade'}
        transparent={true}
        visible={visibleModal}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.container}>

            <View>
              <Text style={modalStyles.title}>
                {"사진 업로드"}
              </Text>

              <View
                style={{
                  marginTop: 16,
                }}
              >
                <Pressable
                  onPress={onPressPictureUpload}
                >
                  <View
                    style={{
                      width: 272,
                      height: 144,
                      borderStyle: 'dashed',
                      borderColor: GRAY['400'],
                      borderWidth: 1,
                      borderRadius: 8,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {
                      imageData ?
                      <Image
                        source={{ uri: imageData }}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                      :
                      <>
                        <Text
                          style={modalStyles.content}>
                          {'갤러리에서'}
                        </Text>
                        <Text
                          style={modalStyles.content}>
                          {'사진을 1장 선택해 주세요'}
                        </Text>
                        <Image
                          source={'../../../assets/Icon_Camera.png'}
                          style={modalStyles.ButtonIconStyle}
                        />
                      </>
                    }
                    </View>
                  
                </Pressable>
              </View>
            </View>


            <View
              style={modalStyles.modalButtonView}
            >
              <ModalButton
                text={'취소'}
                onPress={onPressCancel}
              />
              <ModalButton
                text={'업로드'}
                onPress={onPressUpload}
              />
            </View>

          </View>
        </View>

      </Modal>
  );
}


const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(60, 60, 60, 0.48)'
  },
  container: {
    backgroundColor: WHITE,
    width: 320,
    
    padding: 24,
    borderRadius: 24,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  title: {
    color: BLACK,
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
  },
  content: {
    color: GRAY['500'],
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  ButtonIconStyle: {
    resizeMode: 'contain',
    width: 18,
    height: 18,
    marginRight: 12,
    marginVertical: 14,
  }
});

export default PictureUploadModal;