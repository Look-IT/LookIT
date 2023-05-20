import { Pressable, Text, StyleSheet, Image, View } from "react-native";

import { WHITE } from "../colors";

const FloatingButton = ({style, icon, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, style]}
    >
      <Image
        source={icon}
        style={styles.ButtonIconStyle}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: WHITE,
    width: 48,
    height: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  ButtonIconStyle: {
    resizeMode: 'contain',
    height: 24,
  }
})

export default FloatingButton;