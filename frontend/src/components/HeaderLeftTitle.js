import { useNavigation } from "@react-navigation/core"
import { Text, View, Pressable, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Family, Label, Title } from "../styles/fonts";
import { GRAY } from "../colors";

const HeaderLeftTitle = ({nickName, tagId}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.nickname}>
        {nickName}
      </Text>
      <Text style={styles.tagId}>
        {`#${tagId}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
  },
  nickname: {
    ...Family.KR_Regular,
    ...Title.Medium,
  },
  tagId: {
    ...Family.EN_Medium,
    ...Label.Medium,
    color: GRAY['500'],
  }
})

export default HeaderLeftTitle