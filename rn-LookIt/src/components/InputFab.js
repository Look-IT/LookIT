import {
  useWindowDimensions,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

const InputFab = ({ onInsert }) => {
  const [text, setText] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const inputRef = useRef();
  const windowWidth = useWindowDimensions().width;

  const open = () => {
    inputRef.current.focus();
    setIsOpened(true);
  };

  const close = () => {
    if (isOpened) {
      inputRef.current.blur();
      setText('');
      setIsOpened(false);
    }
  };

  const onPressButton = () => {
    isOpened ? close() : open();
  };

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };
  return (
    <>
      <View
        style={[
          styles.position,
          styles.shape,

          { justifyContent: 'center' },
          isOpened && { width: windowWidth - 20 },
          styles.shadow,
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={close}
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onSubmitEditing={onPressInsert}
        ></TextInput>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.position,
          styles.shape,
          styles.button,
          pressed && { backgroundColor: PRIMARY.DARK },
          styles.shadow,
        ]}
        onPress={onPressButton}
      >
        <MaterialCommunityIcons
          name="plus"
          size={24}
          color={WHITE}
        ></MaterialCommunityIcons>
      </Pressable>
    </>
  );
};

InputFab.propTypes = {
  onInsert: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  shape: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: 70,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
  },
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: { elevation: 6 },
    }),
  },
});

export default InputFab;
