import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { BLACK, WHITE } from "../../colors";
import { useMemoriesContext } from "../../contexts/MemoriesContext";
import ImageSlider from "../ImageSlider";
import { Family, Title } from "../../styles/fonts";

const PictureViewModal = ({visibleModal, setSelectedPictureMarker, selectedPictureMarker}) => {

  const { pictureMarker } = useMemoriesContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
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
                  {`${currentIndex + 1}  /  ${pictureMarker[selectedPictureMarker]?.uri.length}`}
                </Text>
            </Pressable>
          </View>

          {
            pictureMarker[selectedPictureMarker]?.uri &&
            <ImageSlider 
              images={pictureMarker[selectedPictureMarker].uri}
              setCurrentIndex={setCurrentIndex}/>
            
          }

        </View>
    </Modal>
  )
}

const stylesModal = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: BLACK
  },
  headerContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  headerIcon: {
    tintColor: WHITE,
    width: 24,
    height: 24,
    marginRight: 16,
  },
  headerText: {
    ...Family.KR_Medium,
    ...Title.Medium,
    color: WHITE,
  },
});

export default PictureViewModal;