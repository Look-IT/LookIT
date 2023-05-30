import { View, Modal, Pressable, StyleSheet, Text, Image } from "react-native"
import { GRAY, WHITE } from "../../colors";
import { Family, Label, Title } from "../../styles/fonts";
import ModalButton from "./ModalButton";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import { checkMultiplePermissions } from "../../functions/Permissions";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";

const PictureUploadModal = ({visibleModal, setSelectedPictureMarker, selectedPictureMarker}) => {
  const { pictureMarker, setPictureMarker } = useMemoriesContext();
  const [ imageUri, setImageUri ] = useState(null);

  useEffect(() => {
    setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [pictureMarker]);

  useEffect(() => {
    selectedPictureMarker === null
      ? setImageUri(null)
      : setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [selectedPictureMarker]);

  useEffect(() =>{
    console.log('URI : ', imageUri);
  }, [imageUri]);

  const onPressPictureUpload = async () => {
    checkMultiplePermissions();

    console.log('이미지 선택 중');
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    delete response.canceled;
    console.log('이미지 데이터: ', response.assets[0].uri);

    const updateData = pictureMarker.map(item => {
      if (item.id === selectedPictureMarker) {
        return {...item, uri: response.assets[0].uri}
      }
      return item;
    });
    setPictureMarker(updateData);
  }

  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center'}}
      animationType={'fade'}
      visible={visibleModal}
      transparent={true}>

      <View style={stylesModal.centeredView}>

        <View style={stylesModal.container}>

          <Text style={stylesModal.title}>
            {"사진 업로드"}
          </Text>

          <Pressable onPress={onPressPictureUpload}>
            <View style={stylesModal.uploadContainer}>
              {
                selectedPictureMarker !== null && imageUri
                ?
                  <Image
                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                    source={{ uri: imageUri }}/>
                :
                  <>
                    <Text style={stylesModal.content}>
                      {'갤러리에서'}
                      {'\n'}
                      {'사진을 1장 선택해 주세요'}
                    </Text>
                    <Image
                      style={stylesModal.iconPicture}
                      source={require('../../../assets/Icon_Camera.png')}/>
                  </>
              }
            </View>
          </Pressable>

          <View style={stylesModal.buttonContainer}>
            <ModalButton
              text={'취소'}
              onPress={() => {
                imageUri && setPictureMarker(prevData => prevData.slice(0, -1));
                setSelectedPictureMarker(null);
              }}/>

            <ModalButton
              text={'업로드'}
              onPress={() => setSelectedPictureMarker(null)}/>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const stylesModal = StyleSheet.create({
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
  title: {
    ...Family.KR_Regular,
    ...Title.Large,
  },
  uploadContainer: {
    width: 272,
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderColor: GRAY['400'],
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
  },
  content: {
    ...Family.KR_Medium,
    ...Label.Medium,
    color: GRAY['500'],
    textAlign: 'center'
  },
  iconPicture: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  }
});

export default PictureUploadModal;