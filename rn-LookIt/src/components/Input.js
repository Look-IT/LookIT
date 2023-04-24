//텍스트 입력 창

import { StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, BLACK } from '../colors';
import { forwardRef, useState } from 'react';

export const IconNames = {
  EMAIL: 'email',
  PASSWORD: 'lock',
};
export const KeyboardTypes = {
  DEFAULT: 'default',
  EMAIL: 'email-address',
};

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

const Input = forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ title, placeholder, value, iconName, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false); // 인풋 창 클릭 시 , 집중 효과를 주기 위한 상태 변수

    Input.displayName = 'Input';
    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            value && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]}
        >
          {title}
        </Text>

        <View>
          <TextInput
            {...props}
            ref={ref}
            style={[styles.input, isFocused && styles.focusedInput]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            value={value}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType="none"
            keyboardAppearance="light"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></TextInput>
        </View>
      </View>
    );
  }
);

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  title: {
    marginBottom: 4,
    color: BLACK,
  },

  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  input: {
    borderBottomWidth: 1,

    paddingHorizontal: 10,
    height: 40,
    borderColor: GRAY.DEFAULT,
    //paddingLeft: 30,
  },
  hasValueTitle: {
    color: BLACK,
    borderColor: BLACK,
  },
  focusedInput: {
    borderWidth: 1,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export default Input;
