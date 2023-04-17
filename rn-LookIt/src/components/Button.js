//버튼 컴포넌트

import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { TRANSPARENT, GRAY, PRIMARY, WHITE, DANGER } from '../colors';

export const ButtonTypes = {
  PRIMARY: 'PRIMARY',
  TRANSPARENT: 'TRANSPARENT',
  DANGER: 'DANGER',
};

const Button = ({ title, onPress, disabled, isLoading, buttonType }) => {
  const colors = { PRIMARY, DANGER, TRANSPARENT };
  const transparent = buttonType === ButtonTypes.TRANSPARENT;

  console.log(transparent);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors[buttonType].DEFAULT },
        pressed && { backgroundColor: colors[buttonType].DARK },
        disabled && { backgroundColor: colors[buttonType].LIGHT, opacity: 0.6 },
      ]}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={GRAY.DEFAULT}
        ></ActivityIndicator>
      ) : (
        <Text
          style={[
            styles.title,
            transparent && {
              color: GRAY,
              opacity: 0.7,
              fontSize: 13,
              fontWeight: '700',
            },
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  buttonType: ButtonTypes.PRIMARY,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default Button;
