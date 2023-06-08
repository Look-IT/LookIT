import { View, Modal, Pressable, StyleSheet, Text, Image } from "react-native"
import { GRAY, WHITE } from "../../colors";
import { Family, Label, Title } from "../../styles/fonts";
import ModalButton from "./ModalButton";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import { requestPermissions } from "../../functions/Permissions";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from "react";
import MemoriesImageBox from "../../components/MemoriesImageBox";

const PictureUploadModal = ({visibleModal, setSelectedPictureMarker, selectedPictureMarker}) => {
  const { pictureMarker, setPictureMarker } = useMemoriesContext();
  const [ imageUri, setImageUri ] = useState([]);

  useEffect(() => {
    setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [pictureMarker]);

  useEffect(() => {
    selectedPictureMarker === null
      ? setImageUri([])
      : setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [selectedPictureMarker]);

  useEffect(() =>{
    console.log('URI : ', imageUri);
  }, [imageUri]);

  const onPressPictureUpload = async () => {
    await requestPermissions();

    console.log('이미지 선택 중');
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });
    delete response.cancelled;
    const imageData = response.assets.map(data => data.uri);
    console.log('이미지 데이터: ', imageData);

    const updateData = pictureMarker.map(item => {
      if (item.id === selectedPictureMarker) {
        return {...item, uri: imageData}
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

          {
            setPictureMarker !== null && imageUri?.length > 0
            ?
            <>
              <Pressable onPress={onPressPictureUpload}>
                <View style={[stylesModal.uploadContainer, stylesModal.imageContainer]}>
                  
                  <View style={[stylesModal.imageBox, stylesModal.border]}>
                    <Image
                      style={stylesModal.iconPicture}
                      source={require('../../../assets/Icon_Camera.png')}/>
                  </View>

                  <MemoriesImageBox imageUri={imageUri} />

                </View>
            
              </Pressable>
            </>
            :
            <Pressable onPress={onPressPictureUpload}>
              <View style={[stylesModal.uploadContainer, stylesModal.border]}>
                <Text style={stylesModal.content}>
                  {'갤러리에서'}
                  {'\n'}
                  {'업로드할 사진을 선택해 주세요'}
                </Text>
                <Image
                  style={stylesModal.iconPicture}
                  source={require('../../../assets/Icon_Camera.png')}/>
              </View>
            </Pressable>
          }

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
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
    rowGap: 8,
    justifyContent: 'flex-start',
    height: 'auto'
  },
  border: {
    borderStyle: 'dashed',
    borderColor: GRAY['400'],
    borderWidth: 1,
    borderRadius: 8,
  },
  imageBox: {
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    ...Family.KR_Medium,
    ...Label.Medium,
    color: GRAY['500'],
    textAlign: 'center',
    marginBottom: 8,
  },
  iconPicture: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  }
});

export default PictureUploadModal;