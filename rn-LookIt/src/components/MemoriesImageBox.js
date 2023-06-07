import { Image, StyleSheet, View } from "react-native";

const MemoriesImageBox = ({imageUri}) => {

  return imageUri?.map((uri, index) => {

    return (
      <View key={index} style={[styles.imageBox]}>
        <Image
          style={styles.image}
          source={{ uri: uri }}/>
      </View>
    );
  })
}

const styles = StyleSheet.create({
  imageBox: {
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8
  }
})

export default MemoriesImageBox;