import { useUserContext } from '../contexts/UserContext';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';

const Navigation = () => {
  const { user } = useUserContext();

  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
