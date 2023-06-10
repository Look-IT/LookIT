import { Pressable, Text, StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { PRIMARY } from "../../colors";
import { DANGER } from "../../colors";

const ModalButton = ({text, onPress, inlineStyle}) => {
  return (
    <Pressable
      style={styles.modalButton}
      onPress={onPress}>
      <Text
        style={[
          styles.modalButtonText,
          { color: inlineStyle === 'DANGER' ? DANGER['500'] : PRIMARY['700']}
        ]}>

        {text}
      </Text>
    </Pressable>
  );
};

ModalButton.propTypes = {
  inlineStyle: PropTypes.oneOf(['DANGER', 'PRIMARY']),
}

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