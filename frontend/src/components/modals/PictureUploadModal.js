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

  const [containerWidth, setContainerWidth] = useState(0);
  const [pressIcon, setPressIcon] = useState(null);

  useEffect(() => {
    setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [pictureMarker]);

  useEffect(() => {
    selectedPictureMarker === null
      ? setImageUri([])
      : setImageUri(pictureMarker[selectedPictureMarker]?.uri);
  }, [selectedPictureMarker]);

  useEffect(() => {
    pressIcon !== null && deleteImageUri(pressIcon);
  }, [pressIcon]);

  const onPressPictureUpload = async () => {
    await requestPermissions();

    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsMultipleSelection: true,
    });
    delete response.cancelled;
    const imageData = response.assets?.map(data => data.uri);

    if (imageData) {
      const updateData = pictureMarker.map((item, index) => {
        if (index === selectedPictureMarker) {
          return {...item, uri: [...item.uri, ...imageData]}
        }
        return item;
      });
      setPictureMarker(updateData);
    }
  }

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth((width - 8 * 3) / 4);
  }

  const deleteImageUri = async (index) => {
    await setPictureMarker(current => {
      const array = [...current];
      array[selectedPictureMarker] = {
        ...array[selectedPictureMarker],
        uri: [
          ...array[selectedPictureMarker].uri.slice(0, index),
          ...array[selectedPictureMarker].uri.slice(index + 1),
        ],
      };
      return array;
    })
    setPressIcon(null);
  }

  const deletePictureMarker = async () => {
    await setPictureMarker(current => current.filter((_, idx) => idx !== selectedPictureMarker));
    setSelectedPictureMarker(null);
  }

  const checkPictureMarkerImage = async () => {
    await setPictureMarker(current => current.filter(item => item.uri && item.uri.length > 0));
    setSelectedPictureMarker(null);
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
              <View style={[stylesModal.uploadContainer, stylesModal.imageContainer]} onLayout={onLayout}>
                <Pressable onPress={onPressPictureUpload}>
                  
                  <View style={[
                    stylesModal.imageBox, stylesModal.border, {
                      width: containerWidth, 
                      justifyContent: 'center',
                      alignItems: 'center' }
                    ]}>
                    <Image
                      style={stylesModal.iconPicture}
                      source={require('../../../assets/Icon_Camera.png')}/>
                  </View>
                </Pressable>

                <MemoriesImageBox
                  style={[stylesModal.imageBox, {width: containerWidth}]}
                  imageUri={imageUri}
                  setPressIcon={setPressIcon}/>

              </View>
            
            </>
            :
            <Pressable onPress={onPressPictureUpload}>
              <View 
                style={[
                    stylesModal.uploadContainer, stylesModal.border,
                  ]} onLayout={onLayout}>

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
              inlineStyle="DANGER"
              text={'삭제'}
              onPress={deletePictureMarker}/>

            <ModalButton
              text={'확인'}
              onPress={checkPictureMarkerImage}/>
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
    backgroundColor: 'rgba(60, 60, 60, 0.48)',
    paddingHorizontal: 16,
  },
  container: {
    backgroundColor: WHITE,
    width: '100%',
    padding: 24,
    borderRadius: 24,
  },
  title: {
    ...Family.KR_Regular,
    ...Title.Large,
  },
  uploadContainer: {
    width: '100%',
    height: 144,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
    rowGap: 16,
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
    aspectRatio: 1,
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
    justifyContent: 'space-between',
    marginTop: 24,
  }
});

export default PictureUploadModal;