// 추억일지 경로 추적 시작 및 종료 플로팅 버튼 컴포넌트

import { Pressable, Text, StyleSheet, Image } from "react-native"

import { PRIMARY, DANGER, WHITE } from "../colors";

const MemoriesFloatingButton = ({icon, text, activation, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, {
        backgroundColor: activation ? DANGER[400] : PRIMARY[700]
      }]}
    >
      <Image
        source={icon}
        style={styles.ButtonIconStyle}
      />
      <Text
        style={styles.text}>
        {text}
      </Text>
    </Pressable>
  )
};

MemoriesFloatingButton.defaultProps = {
  activation: false,
}

const styles = StyleSheet.create({
  buttonContainer: {
    // height: 44,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderRadius: 22,
    position: 'absolute',
    bottom: 24,
  },
  text: {
    color: WHITE,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16
  },
  ButtonIconStyle: {
    resizeMode: 'contain',
    width: 18,
    height: 18,
    marginRight: 12,
    marginVertical: 14,
  }
})

export default MemoriesFloatingButton;