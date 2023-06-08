import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { PRIMARY, WHITE, BLACK } from '../colors';

const FourCutFAB = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.position, styles.button, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 16,
  },

  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY[700],
  },
});

export default FourCutFAB;
