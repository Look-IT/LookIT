import { Pressable, Image } from 'react-native';
import PropTypes from 'prop-types';

const HeaderRightButton = ({ tintColor }) => {
  return (
    <Pressable hitSlop={10} onPress={() => {}}>
      <Image
        source={require('../../assets/Icon_More.png')}
        style={{ width: 24, height: 24 }}
      ></Image>
    </Pressable>
  );
};

HeaderRightButton.propTypes = {
  tintColor: PropTypes.string,
};

export default HeaderRightButton;
