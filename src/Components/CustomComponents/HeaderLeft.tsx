import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
// import { MaterialIcons, normalized } from "../../utils/AppConstants";
import Space from './Space';
import {View} from 'native-base';
import Heading from './Heading';
import {useRoute} from '@react-navigation/native';
import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
import {MaterialIcons, normalized} from '../../Utils/AppConstants';
// import { useStackNavigator } from "../../utils/HandleNavigation";

interface HeaderLeftProps {
  onPress: () => void;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({onPress}) => {
  const {navigate} = useStackNavigator();

  const route = useRoute(); // Get the current route

  let pageTitle = ''; // Initialize the page title

  // Determine the page title based on the current route
  switch (route.name) {
    case 'Dilemmas':
      pageTitle = 'Dilemmas';
      break;
    case 'Trash':
      pageTitle = 'Trash';
      break;
    // Add cases for other routes as needed
    default:
      pageTitle = 'Unknown';
      break;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{marginTop: 5}}>
        <MaterialIcons name={'dehaze'} size={25} color={'white'} />
      </TouchableOpacity>
      <Space width={normalized.wp('7%')} />
      <TouchableOpacity onPress={() => navigate('Dilemmas', {})}>
        <Heading text={pageTitle} color={'white'} weight={700} fontSize={20} />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalized.hp(2),
    marginLeft: normalized.wp(2),
    alignContent: 'center',
    alignSelf: 'center',
  },
});
