import { Pressable, Text, StyleSheet } from "react-native";
import { PRIMARY } from "../../colors";

const ModalButton = ({text, onPress}) => {
  return (
    <Pressable
      style={styles.modalButton}
      onPress={onPress}>
      <Text
        style={styles.modalButtonText}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  modalButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 8,
  },
  modalButtonText: {
    color: PRIMARY['700'],
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 16,
  },
})

export default ModalButton;