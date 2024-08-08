import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage as rf} from 'react-native-responsive-fontsize';
import {Dimensions, StyleSheet} from 'react-native';
import {useContext} from 'react';
// import {ThemeContext} from './ThemeContext';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {ThemeContext} from '../Theme/ThemeContext';

export const dimensionized = {SCREEN_WIDTH, SCREEN_HEIGHT};
export const normalized = {hp, wp};
export const normalizedFont = {rf};
export const AppFonts = {
  commonFont: {
    smallest: rf(1.5),
    small: rf(2),
    medium: rf(2.5),
    large: rf(3),
    mediumLarge: rf(4),
    extraLarge: rf(5),
  },
};
export const AppIcons = {
  commonIcons: {
    smallest: 18,
    small: 20,
    medium: 24,
    large: 28,
    extraLarge: 30,
  },
};

export const multiThemeColor = () => {
  const context = useContext(ThemeContext);
  const theme = context?.theme || 'light';

  if (theme === 'light') {
    return {
      BLACK: '#181c1c',
      BLUE1: '#26c4f5',
      BLUE2: '#4976e8',
      BLUE3: '#4ce4fc',
      BLUE4: '#bbe5f5',
      PROS_COLOR: '#80a4fc',
      CONS_COLOR: '#ff4484',
      WHITE: '#ffff',
      TRANSPARENT: 'transparent',
      GRAY: '#282c34',
      main_background: '#FFFFFF',
      textcolor: '#000',
      GrayBox: 'lightgray',
      OnlyWHITE: '#FFF',
      PlaceHolder: '#282c34',
      ButtonBackGround: '#282c34',
    };
  } else {
    return {
      BLACK: '#181c1c',
      BLUE1: '#26c4f5',
      BLUE2: '#4976e8',
      BLUE3: '#4ce4fc',
      BLUE4: '#bbe5f5',
      PROS_COLOR: '#80a4fc',
      CONS_COLOR: '#ff4484',
      WHITE: '#ffff',
      TRANSPARENT: 'transparent',
      main_background: '#2F3E46',
      textcolor: '#fff',
      GRAY: '#000',
      GrayBox: '#181c1c',
      OnlyWHITE: '#FFF',
      PlaceHolder: '#ccc',
      ButtonBackGround: '#ffff',
    };
  }
};

export const commonStyleSheet = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignSelf: {
    alignSelf: 'center',
  },
});

export {
  AntDesign,
  Feather,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
  EvilIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  Entypo,
  Fontisto,
  Ionicons,
  LinearGradient,
  Modal,
};
