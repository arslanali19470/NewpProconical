import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Row} from 'native-base';
// import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
import Heading from '../../../Components/CustomComponents/Heading';
import Space from '../../../Components/CustomComponents/Space';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {
  MaterialIcons,
  multiThemeColor,
  ProFeatcherList,
} from '../../../Utils/AppConstants';
import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';
// import { GRAY } from '../../../styles/Colors';
// import {ProFeatcherList} from '../../../utils/CommonManager';

const ProFeatcher: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={{backgroundColor: multiThemeColor().main_background, flex: 1}}>
      <ConnectionStatusToast />
      <View style={{backgroundColor: multiThemeColor().GRAY, padding: 15}}>
        <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
            <MaterialIcons name={'clear'} color={'white'} size={25} />
          </TouchableOpacity>
        </View>
        <Space height={15} />
        <Heading
          text={'PRO FEATCHERS'}
          fontSize={35}
          weight={600}
          color={'white'}
        />
        <Heading
          text={'A cup of coffee = The best app for making decisions '}
          fontSize={13}
          weight={600}
          color={'white'}
        />
        <Space height={15} />
      </View>
      <View>
        <Space height={30} />
        {ProFeatcherList.map((item, ind) => (
          <View key={ind}>
            <Row
              alignItems={'center'}
              alignContent={'center'}
              space={3}
              width={'80%'}
              alignSelf={'center'}>
              <MaterialIcons name="check" size={25} color="red" />
              <Heading text={item.TitleProfeatcher} />
            </Row>
            <Space height={10} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProFeatcher;

const styles = StyleSheet.create({});
