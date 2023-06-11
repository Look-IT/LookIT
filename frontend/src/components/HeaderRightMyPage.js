import { Image, Pressable, StyleSheet, View } from "react-native";
import HeaderRightButton from "./HeaderRightButton"
import { BLACK } from "../colors";
import { useNavigation } from "@react-navigation/native";

const HeaderRightMyPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('MemoriesSearchScreen')}>
        <Image
          style={styles.icon}
          source={require('../../assets/Icon_Search.png')}/>
      </Pressable>

      <HeaderRightButton/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: BLACK,
  },
})

export default HeaderRightMyPage;