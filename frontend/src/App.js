import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation.js';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import Toast from 'react-native-toast-message';
import { MemoriesProvider } from './contexts/MemoriesContext';
import toastConfig from './styles/toastConfig';

const App = () => {
  return (
    <ActionSheetProvider>
      <UserProvider>
        <MemoriesProvider>
          <StatusBar style="dark" />
          <Navigation />
          <Toast config={toastConfig}></Toast>
        </MemoriesProvider>
      </UserProvider>
    </ActionSheetProvider>
  );
};

export default App;
