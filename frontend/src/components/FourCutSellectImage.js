import { View, Image, Pressable, Text, StyleSheet } from 'react-native';
import { BLACK, WHITE } from '../colors';
import { useEffect, useState } from 'react';

const FourCutSellectImage = ({ style, source, onClicked, sellectedImage }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [myIndex, setMyIndex] = useState(0);

  useEffect(() => {
    setMyIndex(() => sellectedImage.findIndex((item) => item.id == source) + 1);
    console.log('i' + sellectedImage.findIndex((item) => item.id == source));
  }, [sellectedImage]);

  return (
    <Pressable
      style={[style, { backgroundColor: BLACK, marginBottom: 16 }]}
      onPress={() => {
        onClicked(source, isPressed, setIsPressed);
      }}
    >
      <Image
        isPressed={isPressed}
        style={[style, isPressed && { opacity: 0.5 }]}
        source={{ uri: source }}
      ></Image>
      {isPressed ? (
        <View style={[{ style }, styles.textContainer]}>
          <Text style={styles.text}>{myIndex}</Text>
        </View>
      ) : (
        <></>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 36,
    color: WHITE,
    fontWeight: 300,
  },
});
export default FourCutSellectImage;
