//헤더 왼쪽 뒤로가기 버튼

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const HeaderLeftButton = ({ canGoBack, tintColor }) => {
  const navigation = useNavigation();
  if (!canGoBack) {
    return null;
  }

  return (
    <Pressable onPress={navigation.goBack} hitSlop={10}>
      <MaterialCommunityIcons
        name="chevron-left"
        size={30}
        color={tintColor}
      ></MaterialCommunityIcons>
    </Pressable>
  );
};

HeaderLeftButton.PropTypes = {
  canGoBack: PropTypes.bool,
  tintColor: PropTypes.string,
};

export default HeaderLeftButton;
