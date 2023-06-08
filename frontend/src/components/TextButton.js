//중복확인 버튼

import { Pressable, StyleSheet, Text } from 'react-native';
import { GRAY } from '../colors';
import PropTypes from 'prop-types';

const TextButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
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
    borderColor: GRAY.DEFAULT,
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
