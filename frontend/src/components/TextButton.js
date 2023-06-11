//중복확인 버튼

import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { GRAY, PRIMARY } from '../colors';
import PropTypes from 'prop-types';

const TextButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: PRIMARY.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
  },
  title: {
    color: GRAY.DEFAULT,
    fontSize: 14,
    fontWeight: '400',

    marginBottom: 4,
  },
});

export default TextButton;
