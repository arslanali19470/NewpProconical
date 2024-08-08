import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigation from './src/Navigation/MainNavigation/MainNavigation';
import {ThemeProvider} from './src/Utils/Theme/ThemeContext';
// import {ThemeProvider} from './src/Utils/ThemeProvider/ThemeContext';

const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <NavigationContainer>
          <NativeBaseProvider>
            <MainNavigation />
          </NativeBaseProvider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
