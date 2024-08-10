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
import {fetchProsRealtime} from '../../../Utils/Firebase/Functions';

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
}) => {
  const navigation = useNavigation<ArgumentNavigationProp>();
  const [loading, setLoading] = useState<boolean>(true);
  const [pros, setPros] = useState<ProsConsType[]>([]);

  useEffect(() => {
    const unsubscribe = fetchProsRealtime(selectedItem.id, setPros, setLoading);
    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, [selectedItem.id]);

  const handleProsDetails = (item: ProsConsType) => {
    navigation.navigate('Argument', {
      selectedItem: item,
      mode: 'update',
    });
  };

  useEffect(() => {
    setProsList(pros);
    setEmptyCheck(pros.length === 0);
  }, [pros, setEmptyCheck, setProsList]);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" color={multiThemeColor().CONS_COLOR} />
      ) : (
        pros.map((item, ind) => (
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

export default ProsList;
