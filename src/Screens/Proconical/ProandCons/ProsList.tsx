import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Row} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../Utils/AppConstants';
import firestore from '@react-native-firebase/firestore';
import {ProsConsType, TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import Heading from '../../../Components/CustomComponents/Heading';

interface ProsListProps {
  selectedItem: TopicDetail;
  setEmptyCheck: (empty: boolean) => void;
  setProsList: (list: ProsConsType[]) => void;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ProsList: React.FC<ProsListProps> = ({
  selectedItem,
  setEmptyCheck,
  setProsList,
  // setMainLoading,
}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const [internalProsList, setInternalProsList] = useState<ProsConsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleProsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };
  const pros = selectedItem?.Arguments?.Pros || [];

  return (
    <>
      <View>
        {pros.map((item, ind) => (
          <TouchableOpacity onPress={() => handleProsDetails(item)} key={ind}>
            <Row
              justifyItems="center"
              alignItems="center"
              space={2}
              style={styles.row}>
              <View
                style={[
                  styles.circle,
                  {backgroundColor: multiThemeColor().CONS_COLOR},
                ]}>
                <Heading text={item.importance} color="white" fontSize={15} />
              </View>
              <Heading text={item.description} fontSize={14} />
            </Row>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '65%',
    // padding: 5,
    // borderRadius: 5,
    // backgroundColor: 'red',
  },
  row: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 7,
    margin: 5,
    borderRadius: 5,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProsList;
