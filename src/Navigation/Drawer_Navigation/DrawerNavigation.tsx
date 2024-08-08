import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
  // DrawerActions,
} from '@react-navigation/drawer';
import {
  useNavigation,
  RouteProp,
  DrawerActions,
} from '@react-navigation/native';
import {RootStackParamList} from '../MainNavigation/MainNavigation';
import CustomDrawerContent from '../../Components/CustomComponents/CustomDrawerContent';
import {MaterialIcons, multiThemeColor} from '../../Utils/AppConstants';
import HeaderLeft from '../../Components/CustomComponents/HeaderLeft';
import Home_Dilemmas from '../../Screens/Proconical/Home';
import {
  BarIcon,
  CartIcon,
  LogoutMemberIcon,
  SettingsIcon,
  TrashIcon,
} from '../../Utils/Icons/Icons';
import Trash from '../../Screens/Proconical/Trash';
import Settings from '../../Screens/Settings/Index';
import ProFeatcher from '../../Screens/Proconical/ProFeatcher';
import LogOutMember from '../../Screens/Proconical/LogOutMember/LogOutMember';
// import Home_Dilemmas from '../../screens/ClientApp/Home_Dilemmas';
// // import Trash from '../../screens/ClientApp/Trash';
// import CustomDrawerContent from '../../components/CustomDrawerContent/CustomDrawerContent';
// import HeaderLeft from '../../components/HeaderLeft/HeaderLeft';
// import Settings from '../../screens/ClientApp/Settings/Index';
// import ProFeatcher from '../../screens/ClientApp/ProFeatcher';
// import {
//   BarIcon,
//   TrashIcon,
//   SettingsIcon,
//   CartIcon,
//   LogoutMemberIcon,
// } from '../../utils/Icons';
// import {MaterialIcons, multiThemeColor} from '../../utils/AppConstants';
// import {RootStackParamList} from '../MainNavigation/MainNavigation';
// import LogOutMember from '../../Auth/LogOutMember';
// import Trash from '../../screens/ClientApp/Trash';

type DrawerScreenNavigationProp = DrawerNavigationProp<
  RootStackParamList,
  'DrawerNavigation'
>;
type DrawerScreenRouteProp = RouteProp<RootStackParamList, 'DrawerNavigation'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

export type DrawerParamList = {
  Dilemmas: {UserID: string};
  Trash: {UserID: string};
  Settings: undefined;
  'Pro Features': undefined;
  SearchHome: {UserID: string};
  'Dilemmas Description': {UserID?: string};
  LogOut: {UserID: string};
};

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigation: React.FC<DrawerScreenProps> = ({route}) => {
  const {UserID} = route.params;
  // const UserID = '123';
  const [NewGoals, setNewGoals] = React.useState<[]>();
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: multiThemeColor().BLUE2,
        drawerStyle: {
          backgroundColor: multiThemeColor().main_background,
        },
        drawerLabelStyle: {
          color: multiThemeColor().textcolor,
        },
        drawerActiveTintColor: 'white',
        drawerPosition: 'left',
        headerStyle: {
          backgroundColor: multiThemeColor().GRAY,
        },
        drawerType: 'back',
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <HeaderLeft
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{marginRight: 20}}
            onPress={() =>
              navigation.navigate('SearchHome', {UserID: UserID || ''})
            }>
            <MaterialIcons name="search" size={25} color="white" />
          </TouchableOpacity>
        ),
      }}
      initialRouteName="Dilemmas">
      <Drawer.Screen
        name="Dilemmas"
        component={Home_Dilemmas}
        options={{
          drawerIcon: () => <BarIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
        initialParams={{UserID}}
      />

      <Drawer.Screen
        name="Trash"
        component={Trash}
        options={{
          drawerIcon: () => <TrashIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
        initialParams={{UserID}}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => (
            <SettingsIcon color={multiThemeColor().textcolor} />
          ),
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Pro Features"
        component={ProFeatcher}
        options={{
          drawerIcon: () => <CartIcon color={multiThemeColor().textcolor} />,
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="LogOut"
        component={LogOutMember}
        options={{
          drawerIcon: () => (
            <LogoutMemberIcon color={multiThemeColor().textcolor} />
          ),
          headerShown: false,
        }}
        initialParams={{UserID}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
