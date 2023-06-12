import { forwardRef, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";
import { BLACK, GRAY, PRIMARY } from "../colors";
import { useNavigation } from "@react-navigation/native";
import { Body, Family } from "../styles/fonts";

const MemoriesSearchInput = forwardRef(
  ({ title, placeholder, value, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const navigation = useNavigation();

    return (
      <View style={styles.ViewContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.leftIcon}
            source={require('../../assets/Icon_Back.png')}/>
        </Pressable>

        <View style={{width: '100%' }}>
          <TextInput
            {...props}
            ref={ref}
            style={[
              styles.textInput

            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            selectionColor={PRIMARY['700']}
            value={value}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType="none"
            keyboardAppearance="light"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}/>
        </View>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  ViewContainer: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    backgroundColor: GRAY['50'],
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
    columnGap: 16,
  },
  leftIcon: {
    width: 24,
    height: 24,
    tintColor: BLACK,
  },
  textInput: {
    // ...Family.KR_Regular,
    // ...Body.Medium,
  }
})

export default MemoriesSearchInput;