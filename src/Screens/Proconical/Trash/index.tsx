import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
// import FormattedList from '../../../CustomComponents/FormattedList';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Row} from 'native-base';
import Heading from '../../../Components/CustomComponents/Heading';
import {DrawerActions} from '@react-navigation/native';

import {DrawerParamList} from '../../../Navigation/Drawer_Navigation/DrawerNavigation';
import Space from '../../../Components/CustomComponents/Space';
import * as firebase from '@react-native-firebase/app';
import {TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import {MaterialIcons, multiThemeColor} from '../../../Utils/AppConstants';
import {getGoalByUser, getTrash} from '../../../Utils/Firebase/Functions';
import FormattedList from '../../../Components/FormattedList';
import Button from '../../../Components/CustomComponents/Button';

const Trash: React.FC = () => {
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);
  const [trash, setTrash] = useState<TopicDetail[]>([]);
  const [goals, setGoals] = useState<TopicDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const route = useRoute<RouteProp<DrawerParamList, 'Trash'>>();
  const user = firebase.default.auth().currentUser;
  const {UserID} = route.params;

  useEffect(() => {
    const unsubscribe = getTrash(UserID, setTrash, setLoading);
    return () => unsubscribe();
  }, [UserID]);

  // useEffect(() => {
  //   // Filter goals to find items where trash is true
  //   const filteredTrashItems = goals.filter(item => item.trash);
  //   setTrashItems(filteredTrashItems);
  // }, [goals]);

  return (
    <View style={{backgroundColor: multiThemeColor().main_background, flex: 1}}>
      <View style={{backgroundColor: multiThemeColor().GRAY, padding: 15}}>
        <Row space={7} alignItems={'center'}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{marginTop: 3}}>
            <MaterialIcons name={'menu'} color={'white'} size={25} />
          </TouchableOpacity>
          <Heading text={'Trash'} weight={700} fontSize={20} color={'white'} />
        </Row>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={multiThemeColor().textcolor} />
          <Space height={5} />
          <Heading text={'Loading...'} color={multiThemeColor().textcolor} />
        </View>
      ) : (
        // Show the list when data is loaded
        <ScrollView style={styles.container}>
          <FormattedList
            TopicList={trash}
            arrayName="removedItems"
            setSelectedCount={setSelectedItemCount}
            setSelectedItems={setSelectedItems}
            resetSelection={resetSelection}
            setResetSelection={setResetSelection}
            // restoreItem={restoreItem}
            LeftSwipShow={true}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Trash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
});
