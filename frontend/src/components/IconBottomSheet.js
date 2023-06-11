import { useEffect, useRef } from "react"
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import RBSheet from "react-native-raw-bottom-sheet";
import { BLACK, GRAY } from "../colors";
import PropTypes from 'prop-types';
import { Family, Label } from "../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

const IconBottomSheet = ({
  canGoBack,
  rootIconSize = 24,
  rootIconSource = require('../../assets/Icon_More.png'),
  rootColor = BLACK,
  SheetList,
}) => {

  const refRBSheet = useRef();
  const navigation = useNavigation();

  if (!canGoBack) {
    return null;
  }

  return (
    <>
      <Pressable onPress={() => refRBSheet.current.open()}>
        <Image
          style={{
            width: rootIconSize,
            height: rootIconSize,
            tintColor: rootColor,
          }}
          source={rootIconSource}/>
      </Pressable>
      
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
            paddingBottom: 24,
          },
        }}>
        
        <View style={styles.container}>
          {
            SheetList.map((object, index) => {
              return (
                <TouchableOpacity key={index} onPress={async () => {
                  
                  object.handleFunction()
                    .then(response => {
                      if (response) {
                        navigation.pop();
                        Toast.show({
                          type: 'success',
                          text1: '추억일지가 삭제되었습니다.',
                          position: 'bottom',
                        })
                      } else {
                        refRBSheet.current.close();
                        Toast.show({
                          type: 'error',
                          text1: '추억일지 삭제를 실패하였습니다.',
                          position: 'bottom',
                        })
                      }
                    })
                    .catch(error => console.log(error));

                }}>
                  <View style={styles.bottomSheetList}>
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                        tintColor: object.color,
                      }}
                      source={object.icon}/>
                      <Text style={[
                        styles.text,
                        { color: object.color }
                        ]}>
                          {object.text}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </RBSheet>
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
  },
  bottomSheetList: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...Family.KR_Medium,
    ...Label.Large,
    marginLeft: 12,
  }
})

export default IconBottomSheet;