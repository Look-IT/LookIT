//네컷사진 리스트

import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import FourCutListItem from './FourCutListItem';
import { Dimensions } from 'react-native';
const FourCutList = ({ data }) => {
  const fourCutwidth = Dimensions.get('window').width * (49 / 100);
  const fourCutheight = fourCutwidth * (4 / 3);

  return (
    <FlatList
      style={{ flexGrow: 1 }}
      windowSize={2}
      data={data}
      horizontal={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <FourCutListItem
          item={item}
          width={fourCutwidth}
          height={fourCutheight}
        />
      )}
    ></FlatList>
  );
};

FourCutList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default FourCutList;
