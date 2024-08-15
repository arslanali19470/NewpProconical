import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
  ToastAndroid,
} from 'react-native';
import Space from '../../../Components/CustomComponents/Space';
import * as firebase from '@react-native-firebase/app';

import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../../Navigation/Drawer_Navigation/DrawerNavigation';
import {DrawerActions, RouteProp} from '@react-navigation/native';
import {Row} from 'native-base';
import Heading from '../../../Components/CustomComponents/Heading';
// import NetInfo from '@react-native-community/netinfo';
// import {useNetInfoInstance} from '@react-native-community/netinfo';
// import {getGoalByUserRealtime} from '../../../Utils/Firebase/Functions';

import {TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import {
  LinearGradient,
  MaterialIcons,
  multiThemeColor,
} from '../../../Utils/AppConstants';
import Button from '../../../Components/CustomComponents/Button';
import FormattedList from '../../../Components/FormattedList';
import {
  getGoalByUser,
  updateTrashStatus,
} from '../../../Utils/Firebase/Functions';
import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';

type DrawerScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  'Dilemmas'
>;
type DrawerScreenRouteProp = RouteProp<DrawerParamList, 'Dilemmas'>;

export type DrawerScreenProps = {
  navigation: DrawerScreenNavigationProp;
  route: DrawerScreenRouteProp;
};

const Home_Dilemmas: React.FC<DrawerScreenProps> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fulloading, setfullLoading] = useState<boolean>(false);
  const [goals, setGoals] = useState<TopicDetail[]>([]);
  const [resetSelection, setResetSelection] = useState(false);
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  // const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const {UserID} = route.params;

  const deleteSelectedItems = async () => {
    try {
      for (const itemId of selectedItems) {
        await updateTrashStatus(itemId, true);
      }

      setSelectedItems([]);
      setSelectedItemCount(0);
      setResetSelection(true);
    } catch (error) {
      console.error('Error deleting selected items: ', error);
      Alert.alert('Error', 'Failed to delete selected items');
    }
  };

  useEffect(() => {
    const unsubscribe = getGoalByUser(UserID, setGoals, setLoading);
    return () => unsubscribe();
  }, [UserID]);

  // useEffect(() => {
  //   const unsubscribeNetInfo = NetInfo.addEventListener(state => {
  //     if (state.isConnected !== isConnected) {
  //       setIsConnected(state.isConnected);

  //       if (!state.isConnected) {
  //         ToastAndroid.showWithGravityAndOffset(
  //           'Kindly Check Your Internet Connection',
  //           ToastAndroid.LONG,
  //           ToastAndroid.BOTTOM,
  //           0,
  //           100,
  //         );
  //       } else if (state.isConnected) {
  //         ToastAndroid.showWithGravityAndOffset(
  //           'You are Connected',
  //           ToastAndroid.LONG,
  //           ToastAndroid.BOTTOM,
  //           0,
  //           100,
  //         );
  //       }
  //     }
  //   });

  //   return () => unsubscribeNetInfo();
  // }, [isConnected]);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <ConnectionStatusToast />
      {/* <Text style={{color: 'white'}}>{UserID}</Text> */}
      {selectedItemCount > 0 ? (
        <View
          style={{
            backgroundColor: multiThemeColor().GRAY,
            padding: 15,
          }}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Row space={7} alignItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={{marginTop: 3}}>
                <MaterialIcons
                  name={'keyboard-backspace'}
                  color={'white'}
                  size={25}
                />
              </TouchableOpacity>
              <Heading
                text={`Selected ${selectedItemCount}`}
                weight={700}
                fontSize={20}
                color={'white'}
              />
            </Row>
            <TouchableOpacity
              onPress={deleteSelectedItems}
              style={{marginTop: 3}}>
              <MaterialIcons name={'delete'} color={'white'} size={25} />
            </TouchableOpacity>
          </Row>
        </View>
      ) : (
        <View
          style={{
            backgroundColor: multiThemeColor().GRAY,
            padding: 15,
          }}>
          <Row alignItems={'center'} justifyContent={'space-between'}>
            <Row space={7} alignItems={'center'}>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                style={{marginTop: 3}}>
                <MaterialIcons name={'menu'} color={'white'} size={25} />
              </TouchableOpacity>
              <Heading
                text={'Dilemmas'}
                weight={700}
                fontSize={20}
                color={'white'}
              />
            </Row>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SearchHome', {UserID: UserID})
              }
              style={{marginTop: 3}}>
              <MaterialIcons name={'search'} color={'white'} size={25} />
            </TouchableOpacity>
          </Row>
        </View>
      )}
      <Space height={10} />

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={multiThemeColor().textcolor} />
          <Space height={5} />
          <Heading text={'Loading...'} color={multiThemeColor().textcolor} />
        </View>
      ) : (
        // Show the list when data is loaded
        <ScrollView style={{flex: 1}}>
          <FormattedList
            TopicList={goals}
            arrayName="GoalsArray"
            setSelectedCount={setSelectedItemCount}
            setSelectedItems={setSelectedItems}
            resetSelection={resetSelection}
            setResetSelection={setResetSelection}
            // restoreItem={restoreItem}
            LeftSwipShow={false}
            setfullLoading={setfullLoading}
          />
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.CircularButton}
        onPress={() => {
          navigation.navigate('Dilemmas Description', {UserID: UserID});
        }}>
        <MaterialIcons name={'mode-edit'} color="white" size={32} />
      </TouchableOpacity>

      {fulloading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

export default Home_Dilemmas;

const styles = StyleSheet.create({
  CircularButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26c4f5',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
