import { useEffect } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { GRAY } from "../../colors";
import { useMemoriesContext } from "../../contexts/MemoriesContext";

const PictureViewModal = ({visibleModal, setSelectedPictureMarker, selectedPictureMarker}) => {

  const { pictureMarker } = useMemoriesContext();
  

  return (
    <Modal
      style={{justifyContent: 'center', alignItems: 'center'}}
      animationType={'fade'}
      visible={visibleModal}
      transparent={true}>

      <Pressable style={stylesModal.viewContainer}
        onPress={() => {
          console.log('clicked');
          setSelectedPictureMarker(null);
        }}>

        <View style={stylesModal.imageContainer}>
          {
            pictureMarker[selectedPictureMarker]?.uri &&
            <Image
            style={stylesModal.image}
            source={{ uri: pictureMarker[selectedPictureMarker].uri }}
          />
          }
        </View>

      </Pressable>

    </Modal>
  )
}

const stylesModal = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#3c3c3c48',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 256,
    backgroundColor: GRAY['300'],
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PictureViewModal;