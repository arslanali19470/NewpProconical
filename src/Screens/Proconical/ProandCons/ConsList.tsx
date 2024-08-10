import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Row} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/MainNavigation/MainNavigation';
import {multiThemeColor} from '../../../Utils/AppConstants';
import {ProsConsType, TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import Heading from '../../../Components/CustomComponents/Heading';
import {fetchConsRealtime} from '../../../Utils/Firebase/Functions';

interface ConsListProps {
  selectedItem: TopicDetail;
  setEmptyCheck1: (empty: boolean) => void;
  setConsList: (list: ProsConsType[]) => void;
}

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;

const ConsList: React.FC<ConsListProps> = ({
  selectedItem,
  setEmptyCheck1,
  setConsList,
}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [cons, setCons] = useState<ProsConsType[]>([]);

  useEffect(() => {
    const unsubscribe = fetchConsRealtime(selectedItem.id, setCons, setLoading);
    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [selectedItem.id]);

  const handleConsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  useEffect(() => {
    setConsList(cons);
    setEmptyCheck1(cons.length === 0);
  }, [cons, setEmptyCheck1, setConsList]);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color={multiThemeColor().PROS_COLOR} />
      ) : (
        cons.map((item, ind) => (
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
                <Heading
                  text={item.importance.toString()}
                  color="white"
                  fontSize={15}
                />
              </View>
              <Heading text={item.description} fontSize={14} />
            </Row>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
