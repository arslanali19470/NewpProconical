import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import DrawerNavigation from '../Drawer_Navigation/DrawerNavigation';

import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {ProsConsType, TopicDetail} from '../../Utils/TypeExport/TypeExport';
import {multiThemeColor} from '../../Utils/AppConstants';
import SplashScreen from '../../Screens/Splash';
import Add_Dilemmas from '../../Screens/Proconical/AddDilemmas';
import SearchHome from '../../Screens/Proconical/Search_Home';
import ProandCons from '../../Screens/Proconical/ProandCons';
import AddArgument from '../../Screens/Proconical/AddArgument';
import WelcomeScreen from '../../Screens/Proconical/WelcomeScreen/WelcomeScreen';
import SignUpMember from '../../Screens/Proconical/SignUpMember/SignUpMember';
import LoginMember from '../../Screens/Proconical/LoginMember/LoginMember';
import PhoneNumberScreen from '../../Screens/Proconical/MobileVarification/PhoneNumberScreen';
import OTPScreen from '../../Screens/Proconical/MobileVarification/OTPScreen';

export type RootStackParamList = {
  SplashScreen: undefined;
  DrawerNavigation: {UserID: string | undefined};

  SearchHome: {UserID: string | undefined};
  ProandCons: {selectedItem: TopicDetail | undefined};
  'Dilemmas Description': {
    selectedItem?: TopicDetail | ProsConsType;
    UserID?: string;
  };
  Argument: {
    selectedItem: TopicDetail | ProsConsType;
    mode: 'add' | 'update';
  };
  SignUpMember: undefined;
  LogInMember: undefined;
  WelcomeScreen: undefined;
  PhoneNumberScreen: undefined;
  OTPScreen: {confirm: FirebaseAuthTypes.ConfirmationResult};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigation: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const color = multiThemeColor();

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkTheme ? color.BLACK : color.WHITE}
      />
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="SignUpMember" component={SignUpMember} />
        <Stack.Screen name="LogInMember" component={LoginMember} />
        <Stack.Screen name="PhoneNumberScreen" component={PhoneNumberScreen} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />

        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
        <Stack.Screen
          name="Dilemmas Description"
          component={Add_Dilemmas}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="SearchHome"
          component={SearchHome}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="ProandCons"
          component={ProandCons}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
        <Stack.Screen
          name="Argument"
          component={AddArgument}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: multiThemeColor().GRAY},
            headerTintColor: color.OnlyWHITE,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainNavigation;
