import { FlatList, StyleSheet, View } from 'react-native';
import { GRAY } from '../colors';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const Separator = () => {
  return <View style={styles.separator}></View>;
};
const List = ({ data, setIsBottom, onDelete }) => {
  return (
    <FlatList
      style={{ flex: 1 }}
      windowSize={1}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ListItem item={item} onDelete={onDelete} />}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
      onScroll={({
        nativeEvent: { contentOffset, layoutMeasurement, contentSize },
      }) => {
        const distance =
          contentSize.height - (contentOffset.y + layoutMeasurement.height);
        setIsBottom(!(distance > 20 || contentOffset.y === 0));
      }}
    ></FlatList>
  );
};

List.propTpyes = {
  data: PropTypes.array.isRequired,
  setIsBottom: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;
