import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Heading from '../../../Components/CustomComponents/Heading';
import {Row} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';

import {ProsConsType, TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import {multiThemeColor} from '../../../Utils/AppConstants';

interface ConsListProps {
  selectedItem: TopicDetail;
  setEmptyCheck1: (empty: boolean) => void;
  setConsList: (list: ProsConsType[]) => void;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ConsList: React.FC<ConsListProps> = ({selectedItem}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  // useEffect(() => {
  //   console.log(selectedItem);
  //   console.log(cons);
  // }, []);

  const handleConsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };
  const cons = selectedItem?.Arguments?.Cons || [];
  return (
    <>
      <View>
        {cons.map((item, ind) => (
          <TouchableOpacity onPress={() => handleConsDetails(item)} key={ind}>
            <Row
              justifyItems="center"
              alignItems="center"
              space={2}
              style={styles.row}>
              <View
                style={[
                  styles.circle,
                  {backgroundColor: multiThemeColor().PROS_COLOR},
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
  // container: {
  //   flex: 1,
  //   padding: 10,
  //   backgroundColor: 'white',
  // },
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

export default ConsList;
