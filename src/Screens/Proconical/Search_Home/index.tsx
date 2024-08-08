import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Row} from 'native-base';
// import {
//   Ionicons,
//   MaterialIcons,
//   multiThemeColor,
// } from '../../../utils/AppConstants';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import FormattedList from '../../../CustomComponents/FormattedList';
import firestore from '@react-native-firebase/firestore';
// import {TopicDetail} from '../../../utils/TypeExport';
import {DrawerParamList} from '../../../Navigation/Drawer_Navigation/DrawerNavigation';
// import Space from '../../../components/spacer/Space';
import Space from '../../../Components/CustomComponents/Space';
import Heading from '../../../Components/CustomComponents/Heading';
import {TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import {MaterialIcons, multiThemeColor} from '../../../Utils/AppConstants';

const SearchHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<TopicDetail[]>([]);
  const [topics, setTopics] = useState<TopicDetail[]>([]);
  const [selectedItemCount, setSelectedItemCount] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [resetSelection, setResetSelection] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);

  // Create a ref for the TextInput
  const searchInputRef = useRef<TextInput>(null);

  const route = useRoute<RouteProp<DrawerParamList, 'SearchHome'>>();
  const {UserID} = route.params;

  useEffect(() => {
    const fetchTopics = async () => {
      const doc = await firestore()
        .collection('TopicDetails')
        .doc('topics')
        .get();

      if (doc.exists) {
        const data = doc.data();
        const filteredTopics = (data?.topics || []).filter(
          (topic: TopicDetail) => topic.userId === UserID,
        );
        setTopics(filteredTopics);
      } else {
        console.log('No such document!');
      }
      setLoading(false);
    };

    fetchTopics();
  }, [UserID]);

  useEffect(() => {
    const searchItems = async () => {
      setSearching(true);
      if (searchQuery === '') {
        setFilteredItems([]);
      } else {
        setFilteredItems(
          topics.filter(item =>
            item.topicName.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );
      }
      setSearching(false);
    };

    searchItems();
  }, [searchQuery, topics]);

  // Focus the TextInput when the component mounts
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Row
        style={{backgroundColor: multiThemeColor().GRAY, padding: 10}}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-backspace" color="white" size={25} />
        </TouchableOpacity>
        <TextInput
          ref={searchInputRef}
          style={styles.textInput}
          placeholder="Search ..."
          placeholderTextColor={'gray'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </Row>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>
          <ActivityIndicator size="large" color={multiThemeColor().textcolor} />
          <Space height={5} />
          <Heading text={'Loading...'} color={multiThemeColor().textcolor} />
        </View>
      ) : (
        <ScrollView style={{flex: 1}}>
          {searching ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color={multiThemeColor().textcolor}
              />
              <Space height={5} />
              <Heading
                text={'Searching...'}
                color={multiThemeColor().textcolor}
              />
            </View>
          ) : filteredItems.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Space height={30} />
              <Heading
                text="No items found"
                style={{color: multiThemeColor().textcolor}}
              />
            </View>
          ) : (
            // (
            //   <FormattedList
            //     TopicList={filteredItems}
            //     arrayName="filteredItems"
            //     setSelectedCount={setSelectedItemCount}
            //     setSelectedItems={setSelectedItems}
            //     resetSelection={resetSelection}
            //     setResetSelection={setResetSelection}
            //     LeftSwipShow={true}
            //   />
            // )

            <>
              <Text style={{color: 'red'}}>Show the list here </Text>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '90%',
    fontSize: 18,
    color: 'white',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SearchHome;
