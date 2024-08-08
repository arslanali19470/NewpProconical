import React, {useState, useRef, useEffect} from 'react';
import {ScrollView, BackHandler, ToastAndroid} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Swipeable} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../navigation/MainNavigation/MainNavigation';
import ListItem from './ListItem';
import {TopicDetail} from '../../Utils/TypeExport/TypeExport';
// import {TopicDetail} from '../../utils/TypeExport';

type FormattedListNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;

interface FormattedListProps {
  TopicList: TopicDetail[];
  arrayName: string;
  setSelectedCount: (count: number) => void;
  setSelectedItems: (items: string[]) => void;
  resetSelection: boolean;
  setResetSelection: (reset: boolean) => void;
  LeftSwipShow: boolean;
}

const FormattedList: React.FC<FormattedListProps> = ({
  TopicList,
  setSelectedCount,
  setSelectedItems,
  resetSelection,
  setResetSelection,
  LeftSwipShow,
}) => {
  const navigation = useNavigation<FormattedListNavigationProp>();

  const [currentSwipeable, setCurrentSwipeable] = useState<null | string>(null);
  const swipeableRefs = useRef<{[key: string]: Swipeable | null}>({});
  const [selectedItems, setSelected] = useState<string[]>([]);
  const [isInitialLongPressDone, setIsInitialLongPressDone] = useState(false);
  const backPressCounter = useRef(0);
  const backPressTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (resetSelection) {
      setSelected([]);
      setSelectedCount(0);
      setIsInitialLongPressDone(false);
      setResetSelection(false);
    }
  }, [resetSelection, setResetSelection, setSelectedCount]);

  useFocusEffect(
    React.useCallback(() => {
      setSelected([]);
      setSelectedCount(0);
      setIsInitialLongPressDone(false);
    }, [setSelectedCount]),
  );

  useEffect(() => {
    const backAction = () => {
      if (selectedItems.length > 0) {
        setSelected([]);
        setSelectedItems([]);
        setSelectedCount(0);
        setIsInitialLongPressDone(false);
        ToastAndroid.show('Selection cleared', ToastAndroid.SHORT);
        return true;
      } else {
        if (backPressCounter.current === 0) {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
          backPressCounter.current += 1;
          navigation.goBack();

          backPressTimeout.current = setTimeout(() => {
            backPressCounter.current = 0;
          }, 2000);

          return true;
        } else {
          if (backPressTimeout.current) {
            clearTimeout(backPressTimeout.current);
          }
          BackHandler.exitApp();
          return true;
        }
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      if (backPressTimeout.current) {
        clearTimeout(backPressTimeout.current);
      }
      backHandler.remove();
    };
  }, [selectedItems, setSelectedCount]);

  const handleLongPress = (itemId: string) => {
    if (!isInitialLongPressDone) {
      const newSelectedItems = selectedItems.includes(itemId)
        ? selectedItems.filter(i => i !== itemId)
        : [...selectedItems, itemId];
      setSelected(newSelectedItems);
      setSelectedItems(newSelectedItems);
      setSelectedCount(newSelectedItems.length);
      setIsInitialLongPressDone(true);
    }
  };

  const handlePress = (itemId: string) => {
    if (isInitialLongPressDone) {
      const newSelectedItems = selectedItems.includes(itemId)
        ? selectedItems.filter(i => i !== itemId)
        : [...selectedItems, itemId];
      setSelected(newSelectedItems);
      setSelectedItems(newSelectedItems);
      setSelectedCount(newSelectedItems.length);
    } else {
      const selectedItem = TopicList.find(item => item.id === itemId);
      if (selectedItem) {
        navigation.navigate('ProandCons', {selectedItem});
      }
    }
  };

  const handleSwipeableOpen = (itemId: string) => {
    if (currentSwipeable && currentSwipeable !== itemId) {
      swipeableRefs.current[currentSwipeable]?.close();
    }
    setCurrentSwipeable(itemId);
  };

  return (
    <ScrollView style={{padding: 10}}>
      {TopicList.map(item => (
        <ListItem
          key={item.id}
          item={item}
          handlePress={handlePress}
          handleLongPress={handleLongPress}
          handleSwipeableOpen={handleSwipeableOpen}
          currentSwipeable={currentSwipeable}
          swipeableRefs={swipeableRefs}
          selectedItems={selectedItems}
          LeftSwipShow={LeftSwipShow}
        />
      ))}
    </ScrollView>
  );
};

export default FormattedList;
