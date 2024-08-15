import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons, multiThemeColor} from '../../Utils/AppConstants';
import {ThemeContext} from '../../Utils/Theme/ThemeContext';
import {Row} from 'native-base';
import Heading from '../../Components/CustomComponents/Heading';
import Space from '../../Components/CustomComponents/Space';
import ConnectionStatusToast from '../../Components/CustomComponents/ConnectionStatusToast';
// import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
// import Heading from '../../../components/Headings/Heading';
// import {Row} from 'native-base';
// import Space from '../../../components/spacer/Space';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import {ThemeContext} from '../../../utils/ThemeContext';
// import {GRAY} from '../../../styles/Colors';

const Settings: React.FC = () => {
  const navigation = useNavigation();
  const colors = multiThemeColor();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const {theme, toggleTheme} = themeContext;

  const handleChangeMode = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    toggleTheme(newTheme);
  };

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <ConnectionStatusToast />
      <View style={{backgroundColor: multiThemeColor().GRAY, padding: 15}}>
        <Row space={7} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{marginTop: 3}}>
            <MaterialIcons name={'clear'} color={'white'} size={25} />
          </TouchableOpacity>
          <Heading
            text={'Settings'}
            weight={700}
            fontSize={20}
            color={'white'}
          />
        </Row>
      </View>
      <View>
        <Space height={10} />
        {/* <View style={{backgroundColor: 'lightgray', padding: 10}}> */}
        <View style={{backgroundColor: multiThemeColor().GrayBox, padding: 10}}>
          <Heading
            text={'PRO FEATCHER'}
            color={multiThemeColor().main_background}
            fontSize={25}
            style={{
              position: 'absolute',
              transform: [{rotate: '345deg'}],
              top: 30,
              left: 100,
            }}
          />
          <Heading text={'Style'} fontSize={15} />
          <Space height={10} />
          <View style={styles.underline} />
          <Space height={10} />
          <Row justifyContent={'space-between'}>
            <Heading text={'Color Theme'} />
            <TouchableOpacity onPress={handleChangeMode}>
              <Heading
                text={theme == 'light' ? 'Change to Dark' : 'Change to Light'}
              />
            </TouchableOpacity>
          </Row>
          <Space height={10} />
        </View>
        <View style={{padding: 10}}>
          <Space height={10} />
          <Heading text={'Support'} fontSize={15} />
          <Space height={10} />
          <Space height={10} />
          <Heading text={'Contact us'} />
          <Space height={10} />
          <Space height={10} />
          <Heading text={'Rate the App'} />
          <Space height={10} />
          <Space height={30} />
          <Heading text={'App Version 1.5.2'} fontSize={12} />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  underline: {
    width: '100%',
    height: 0.1,
  },
});
