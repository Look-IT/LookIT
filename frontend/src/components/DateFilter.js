import { Pressable, StyleSheet, Text, View } from "react-native"
import { GRAY, PRIMARY, WHITE } from "../colors";
import { Family, Label } from "../styles/fonts";

const DateFilter = ({categories, selectedCategory, setSelectedCategory}) => {

  return (
    <View style={styles.viewContainer}>
      {
        categories?.map((item, index) => {
          return (
            <Pressable key={index} onPress={() => {
              if (item.value === selectedCategory) {
                setSelectedCategory(null);
              } else {
                setSelectedCategory(item.value)
              }
            }}>
              <View style={
                [
                  styles.container,
                  item.value === selectedCategory &&
                    styles.selectedContainer
                ]}>

                <Text style={[
                  styles.text,
                  item.value === selectedCategory &&
                    styles.selectedText
                ]}>
                  {item.name}</Text>
                  
              </View>
            </Pressable>
          );
        })
      }

    </View>
  )
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    columnGap: 8,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: GRAY['50'],
    borderWidth: 1,
    borderColor: GRAY['200'],
  },
  selectedContainer: {
    backgroundColor: PRIMARY['700'],
    borderColor: PRIMARY['900'],
  },
  text: {
    ...Family.KR_Medium,
    ...Label.Medium,
    color: GRAY['700'],
  },
  selectedText: {
    color: WHITE
  }
})

export default DateFilter;