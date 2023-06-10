import { Image, Pressable, StyleSheet, View } from "react-native";
import { WHITE } from "../colors";

const MemoriesImageBox = ({style, imageUri, setPressIcon}) => {

  return imageUri?.map((uri, index) => {

    return (
      <View key={index} style={style}>
        <Image
          style={styles.image}
          source={{ uri: uri }}/>

          <Pressable
            onPress={() => setPressIcon(index)}
            style={styles.buttonContainer}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.iconClear}
                  source={require('../../assets/Icon_Clear.png')}/>

              </View>
          </Pressable>

      </View>
    );
  })
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8
  },
  buttonContainer: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 20,
    aspectRatio: 1,
    backgroundColor: 'rgba(91, 91, 91, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  iconClear: {
    width: 14,
    height: 14,
    tintColor: WHITE,
  },
})

export default MemoriesImageBox;