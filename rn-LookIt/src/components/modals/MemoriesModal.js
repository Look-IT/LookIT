import { Modal, View, Text, StyleSheet } from "react-native";
import { BLACK, GRAY, WHITE } from "../../colors";
import ModalButton from "./ModalButton";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../contexts/UserContext";
import { memoriesCreatePost } from "../../api/memories";

const MemoriesModal = ({clicked, myPosition, movePath, landmarks, onPressCancel, onPressSuccess}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation = useNavigation();

  const { setMemoryId } = useUserContext();

  useEffect(() => {
    console.log('movepathModal: ', movePath);
  }, [movePath])

  useEffect(() => {
    console.log('landmarks: ', landmarks);
  }, [landmarks])

  useEffect(() => {
    console.log('myPosition: ', myPosition);
  }, [myPosition])


  useEffect(() => {
    setVisibleModal(clicked);
  }, [clicked]);

  const onPressCreate = async () => {
    try {
        const response = await memoriesCreatePost(
          'https://port-0-lookit-f69b2mlh8tij3t.sel4.cloudtype.app/memories/create',
          4,
          movePath,
        );
        
        if (response.data) {
          console.log(response.data);
          setMemoryId(response.data);
        }

    } catch (error) {
      console.log(error.message);
    }

    setVisibleModal(false);
    navigation.navigate('MemoriesCreateScreen', {myPosition, movePath, landmarks});
  };

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
                {"추억일지 생성"}
              </Text>

              <View
                style={{
                  marginTop: 16,
                }}
              >
                <Text>
                  {"경로 기록을 중단하고"}
                </Text>
                <Text>
                  {"추억일지를 생성하시겠습니까?"}
                </Text>
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
                text={'생성'}
                onPress={() => {
                  onPressCreate();
                  onPressSuccess();
                }}
              />
            </View>

          </View>
        </View>

      </Modal>
    // <Modal
    //   animationType="slide"
    //   visible={visibleModal}
    // >
    //   <View
    //     style={{
    //       flex: 1,
    //       backgroundColor: 'red',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <View>
    //       <Text>
    //         {'TEXT'}
    //       </Text>
    //     </View>

    //   </View>

    // </Modal>
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
    color: GRAY['800'],
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default MemoriesModal;