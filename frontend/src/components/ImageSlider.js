import { useEffect, useRef } from "react";
import { Dimensions, FlatList, Image, Text, View } from "react-native"

const ImageSlider = ({  images, setCurrentIndex }) => {

  const { width } = Dimensions.get('window');

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  });

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{width: width}}
          resizeMode="contain"
          />
      )}
      horizontal
      pagingEnabled
      keyExtractor={(item, index) => index.toString()}
      onViewableItemsChanged={onViewableItemsChanged.current}/>
  )
}

export default ImageSlider;