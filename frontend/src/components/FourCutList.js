//네컷사진 리스트

import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import FourCutListItem from './FourCutListItem';
import { Dimensions } from 'react-native';
const FourCutList = ({ data, setReset, isLeft }) => {
  const fourCutwidth = Dimensions.get('window').width * (49 / 100);
  const fourCutSepreatorWidth = Dimensions.get('window').width * (2 / 100);
  const fourCutSepreatorHeight = fourCutSepreatorWidth;
  const fourCutheight = fourCutwidth * (4 / 3);

  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={2}
      data={data}
      horizontal={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <View
          style={index % 2 == 0 ? { marginRight: fourCutSepreatorWidth } : {}}
        >
          <FourCutListItem
            item={item}
            width={fourCutwidth}
            height={fourCutheight}
            setReset={setReset}
            isLeft={isLeft}
          />
        </View>
      )}
      ItemSeparatorComponent={
        <View style={{ height: fourCutSepreatorHeight }}></View>
      }
    ></FlatList>
  );
};

FourCutList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FourCutList;
