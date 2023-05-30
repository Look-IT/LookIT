import { StyleSheet, TextInput, View } from "react-native";
import { Body, Family } from "../styles/fonts";
import { GRAY, PRIMARY } from "../colors";
import { useState } from "react";

const TagInput = ({value, placeholder, ...props}) => {

  const [ isFocused, setIsFocused ] = useState(false);
  
  return (
    <View 
      style={[
        { flex: 1 },
        isFocused && {borderBottomColor: PRIMARY['700']}
      ]}>

      <View style={stylesInput.container}>
        <TextInput
          {...props}
          style={[stylesInput.textInput, isFocused && stylesInput.focusedInput]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={GRAY['400']}
          selectionColor={PRIMARY['700']}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          />
      </View>
      
    </View>
  );
}

const stylesInput = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 6,
    borderBottomWidth: 1,
    borderBottomColor: GRAY['300'],
  },
  textInput: {
    ...Family.EN_Regular,
    ...Body.Medium,
  },
})

export default TagInput;