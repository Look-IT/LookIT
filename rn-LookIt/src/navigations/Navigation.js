//네비게이션
//로그인 여부에 따라, 화면에 구현할 stack을 설정한다.
//로그인 전엔 AuthStack, 후엔 MainStack
import { useUserContext } from '../contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
