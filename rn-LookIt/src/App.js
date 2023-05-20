import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const App = () => {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <StatusBar style="dark" />
        <Navigation />
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default App;
