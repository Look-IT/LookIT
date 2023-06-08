import { Image, Pressable, StyleSheet, Text } from "react-native";
import { Family, Label } from "../styles/fonts";
import { GRAY } from "../colors";
import React from "react";

const HashTag = ({tags, handleTagRemove}) => {

  return tags?.map((tag, index) => {

    return (
      <Pressable
        key={index}
        style={({ pressed }) => [
          stylesHasTag.container,
          pressed && { backgroundColor: GRAY['50'] }
        ]}
        onPress={() => handleTagRemove(tag.info)}>

        <Text style={stylesHasTag.title}>
          {tag.info}
        </Text>
        <Image
          style={{width: 16, height: 16, tintColor: GRAY['400']}}
          source={require('../../assets/Icon_Clear.png')}/>
      </Pressable>
    );

  })
}

const stylesHasTag = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: GRAY['200'],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 8,
  },
  title: {
    ...Family.KR_Regular,
    ...Label.Medium,
    color: GRAY['900'],
    marginRight: 4,
  }
})

export default React.memo(HashTag);