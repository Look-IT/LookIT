//헤더 왼쪽 뒤로가기 버튼

import { Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { BLACK } from '../colors';

// eslint-disable-next-line react/prop-types
const HeaderLeftButton = ({ canGoBack, tintColor }) => {
  const navigation = useNavigation();
  if (!canGoBack) {
    return null;
  }

  return (
    <Pressable onPress={navigation.goBack} hitSlop={8}>
      <Image
        style={{
          width: 24,
          height: 24,
          tintColor: BLACK,
        }}
        source={require('../../assets/Icon_Back.png')}/>
    </Pressable>
  );
};

HeaderLeftButton.propTypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
