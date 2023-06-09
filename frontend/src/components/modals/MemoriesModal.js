import { Modal, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalButton from "./ModalButton";
import { BLACK, WHITE } from "../../colors";
import { useMemoriesContext } from "../../contexts/MemoriesContext";

const MemoriesModal = ({visibleModal, setVisibleModal}) => {

  const { setTrackingLocation } = useMemoriesContext();
  const navigation = useNavigation();

  return (
    <Modal
      style={stylesModal.ModalContainer}
      animationType={'fade'}
      transparent={true}
      visible={visibleModal}>

      <View style={stylesModal.centeredView}>
        <View style={stylesModal.container}>

          <View>
            <Text style={stylesModal.title}>
              {"추억일지 생성"}
            </Text>

            <View
              style={{ marginTop: 16 }}>

              <Text>
                {"경로 기록을 중단하고"}
              </Text>
              <Text>
                {"추억일지를 생성하시겠습니까?"}
              </Text>
            </View>
          </View>

          <View style={stylesModal.modalButtonView}>

            <ModalButton
              text={'취소'}
              onPress={() => {
                setVisibleModal(false);
                setTrackingLocation([]);
              }}/>

            <ModalButton
              text={'생성'}
              onPress={() => {
                setVisibleModal(false);
                navigation.navigate('MemoriesCreateScreen');
              }}/>

          </View>
        </View>
      </View>
    </Modal>
  )
}

const stylesModal = StyleSheet.create({
  ModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
})

export default MemoriesModal;