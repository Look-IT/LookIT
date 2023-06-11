import { useEffect, useRef, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BLACK, WHITE, GRAY, DANGER } from "../../colors";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import ImageSlider from "../ImageSlider";
import { Family, Title } from "../../styles/fonts";
import RBSheet from "react-native-raw-bottom-sheet";
import { deleteMemoriesPicture } from "../../api/deleteMemories";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import toastConfig from "../../styles/toastConfig";

const PictureViewModal = ({visibleModal, setSelectedPictureMarker, selectedPictureMarker}) => {

  const { pictureMarker } = useMemoriesContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setIamges] = useState([]);
  const refRBSheet = useRef();

  useEffect(() => {
    setIamges(prev => []);
    pictureMarker[selectedPictureMarker]?.uri.map((uri, index) => {
      const data = {
        id: index,
        uri: uri,
      }
      setIamges(prev => [...prev, data]);
    })
  }, [selectedPictureMarker]);

  useEffect(() => {
    currentIndex > images.length - 1 &&
      setCurrentIndex(prev => images.length - 1);

    if (selectedPictureMarker !== null && images.length === 0) {

      setSelectedPictureMarker(null);

      Toast.show({
        type: 'error',
        text1: '마커가 삭제되었습니다.',
        position: 'bottom',
      });
    }

  }, [images]);

  const handleDeletePicture = () => {

    deleteMemoriesPicture(images[currentIndex].uri)
      .then(response => {

        Toast.show({
          type: 'success',
          text1: '사진이 삭제되었습니다.',
          position: 'bottom',
        })
        refRBSheet.current.close();

        setIamges(images.filter(obj => obj.id !== currentIndex));

        setIamges(obj => obj.map((image, index) => {
          return {...image, id: index}
        }))

      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: '삭제할 수 없는 사진입니다.',
          position: 'bottom',
        })
        refRBSheet.current.close();
      });
  }

  return (
    <>
      <Modal
        style={{justifyContent: 'center', alignItems: 'center'}}
        animationType={'fade'}
        visible={visibleModal}
        transparent={true}>

          <View style={stylesModal.viewContainer}>

            <View style={stylesModal.headerContainer}>
              <Pressable
                style={{ flexDirection: 'row' }}
                onPress={() => setSelectedPictureMarker(null)}>
                  <Image
                    style={stylesModal.headerIcon}
                    source={require('../../../assets/Icon_Clear.png')}/>
                  <Text style={stylesModal.headerText}>
                    {`${currentIndex + 1}  /  ${images.length}`}
                  </Text>
              </Pressable>

              <Pressable onPress={() => refRBSheet.current.open()}>
                <Image
                  style={stylesModal.headerIcon}
                  source={require('../../../assets/Icon_More.png')}/>
              </Pressable>
            </View>

            {
              pictureMarker[selectedPictureMarker]?.uri &&
              <ImageSlider
                images={images}
                setCurrentIndex={setCurrentIndex}/>
              
            }

          </View>

          <Toast config={toastConfig}/>
      </Modal>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        customStyles={{
          wrapper: {
            backgroundColor: '#00000045',
          },
          draggableIcon: {
            backgroundColor: GRAY['300'],
          },
          container: {
            width: '100%',
            height: 'auto',
            paddingHorizontal: 20,
            borderTopStartRadius: 28,
            borderTopEndRadius: 28,
            paddingBottom: 16,
          },
        }}>

        <TouchableOpacity onPress={handleDeletePicture}>
          <View style={styles.bottomSheetList}>
            <Image
              source={require('../../../assets/Icon_Delete.png')}
              style={[styles.image, { marginRight: 8 }]}
            ></Image>
            <Text style={styles.text}>삭제</Text>
          </View>
        </TouchableOpacity>

      </RBSheet>
    </>
  )
}

const stylesModal = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: BLACK,
  },
  headerContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcon: {
    tintColor: WHITE,
    width: 24,
    height: 24,
    
  },
  headerText: {
    ...Family.KR_Medium,
    ...Title.Medium,
    color: WHITE,
    marginLeft: 16,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  bottomSheetList: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
    tintColor: DANGER['400'],
  },
  text: {
    fontSize: 16,
    color: DANGER.DEFAULT,
  },
});

export default PictureViewModal;