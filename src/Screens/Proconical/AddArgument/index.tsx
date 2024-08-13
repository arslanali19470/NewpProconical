// AddArgument.tsx

import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Space from '../../../Components/CustomComponents/Space';
import CircularBorder from '../../../Components/CustomComponents/CircularBorder';
import Heading from '../../../Components/CustomComponents/Heading';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import GradientButton from '../../../Components/CustomComponents/Gradiant_Button';
import {useNavigation} from '@react-navigation/native';
import uuid from 'react-native-uuid';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
import {ProsConsType} from '../../../Utils/TypeExport/TypeExport';
import {multiThemeColor} from '../../../Utils/AppConstants';
import {
  addProsConsItem,
  updateProsConsItem,
} from '../../../Utils/Firebase/Functions';
import Button from '../../../Components/CustomComponents/Button';
// import {addProsConsItem} from './firestoreOperations'; // Adjust the import path as needed

type ArgumentNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Argument'
>;
type ArgumentRouteProp = RouteProp<RootStackParamList, 'Argument'>;

export type ArgumentScreenProps = {
  navigation: ArgumentNavigationProp;
  route: ArgumentRouteProp;
};

const AddArgument: React.FC<ArgumentScreenProps> = ({route}) => {
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<ArgumentNavigationProp>();

  const selectedItem: ProsConsType | undefined = route?.params?.selectedItem;
  const {mode} = route.params;
  const isUpdateMode = mode === 'update';

  useEffect(() => {
    if (selectedItem) {
      setTextInput(selectedItem.description || '');
      setSliderValue(selectedItem.importance || 0);
      setSelectedId(
        selectedItem.type === 'Pros'
          ? '1'
          : selectedItem.type === 'Cons'
          ? '2'
          : '',
      );
    }
    console.log(selectedItem);
  }, [selectedItem]);

  const handleSliderChange = (value: number) => {
    const roundedValue = Math.round(value);
    setSliderValue(roundedValue);
  };

  const handleTextInputChange = (text: string) => {
    setTextInput(text);
  };

  const handleRadioButtonChange = (id: string) => {
    setSelectedId(id);
  };

  // const addProsConsList = async () => {
  //   if (!textInput.trim() || !selectedId) {
  //     Alert.alert('Error', 'Please fill all required fields');
  //     return;
  //   }

  //   const newItem: ProsConsType = {
  //     id: selectedItem?.id || '',
  //     description: textInput.trim(),
  //     importance: sliderValue,
  //     subid: uuid.v4().toString(),
  //     type: selectedId === '1' ? 'Pros' : 'Cons',
  //   };

  //   await addProsConsItem(selectedItem, selectedId, newItem, navigation);
  // };

  // const updateProsConsList = async () => {
  //   if (!textInput.trim() || !selectedId) {
  //     Alert.alert('Error', 'Please fill all required fields');
  //     return;
  //   }

  //   const updatedItem: ProsConsType = {
  //     ...selectedItem,
  //     description: textInput.trim(),
  //     importance: sliderValue,
  //     subid: selectedItem?.subid || '',
  //   };

  //   await updateProsConsItem(selectedItem, selectedId, updatedItem, navigation);
  // };

  const addProsConsList = async () => {
    if (!textInput.trim() || !selectedId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true); // Start loading

    const newItem: ProsConsType = {
      id: selectedItem?.id || '',
      description: textInput.trim(),
      importance: sliderValue,
      subid: uuid.v4().toString(),
      type: selectedId === '1' ? 'Pros' : 'Cons',
    };

    try {
      await addProsConsItem(selectedItem, selectedId, newItem, navigation);
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };

  const updateProsConsList = async () => {
    if (!textInput.trim() || !selectedId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true); // Start loading

    const updatedItem: ProsConsType = {
      ...selectedItem,
      description: textInput.trim(),
      importance: sliderValue,
      subid: selectedItem?.subid || '',
    };

    try {
      await updateProsConsItem(
        selectedItem,
        selectedId,
        updatedItem,
        navigation,
      );
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };

  const BoderColor = multiThemeColor().textcolor;

  const radioButtons = useMemo<RadioButtonProps[]>(
    () => [
      {
        id: '1',
        label: 'Pros',
        value: 'Pros',
        borderColor: BoderColor,
        color: BoderColor,
      },
      {
        id: '2',
        label: 'Cons',
        value: 'Cons',
        borderColor: BoderColor,
        color: BoderColor,
      },
    ],
    [BoderColor],
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        backgroundColor: multiThemeColor().main_background,
      }}>
      <View>
        <Space height={30} />
        {/* <Text style={{color: 'white'}}>{selectedItem?.id}</Text> */}
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={[
            styles.textInput,
            {
              borderColor: multiThemeColor().BLUE1,
              color: multiThemeColor().textcolor,
            },
          ]}
          placeholder="Description"
          placeholderTextColor={'gray'}
          value={textInput}
          onChangeText={handleTextInputChange}
        />
        <Space height={30} />
        <CircularBorder
          b_color={multiThemeColor().BLUE1}
          style={{alignSelf: 'center'}}>
          <Heading text={String(sliderValue)} />
        </CircularBorder>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={multiThemeColor().BLUE2}
          maximumTrackTintColor={multiThemeColor().BLUE1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <Heading text={'Importance'} textAlign={'center'} />
        <Space height={20} />
        <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={handleRadioButtonChange}
            selectedId={selectedId}
            labelStyle={{color: multiThemeColor().textcolor}}
          />
        </View>
      </View>
      {isUpdateMode ? (
        // <GradientButton
        //   title={'Update'}
        //   color={'white'}
        //   alignSelf="flex-end"
        //   marginRight={20}
        //   marginBottom={20}
        //   width={'120%'}
        //   fontSize={13}
        //   onPress={updateProsConsList}
        // />
        <Button
          title="Update"
          onPress={updateProsConsList}
          backgroundColor="#26c4f5"
          style={{marginBottom: '10%', marginRight: 20}}
          width={100}
          alignSelf="flex-end"
        />
      ) : (
        // <GradientButton
        //   title={'SAVE'}
        //   color={'white'}
        //   alignSelf="flex-end"
        //   marginRight={20}
        //   marginBottom={20}
        //   width={'120%'}
        //   fontSize={13}
        //   onPress={addProsConsList}
        // />
        <Button
          title="SAVE"
          onPress={addProsConsList}
          backgroundColor="#26c4f5"
          style={{marginBottom: '10%', marginRight: 20}}
          width={100}
          alignSelf="flex-end"
        />
      )}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    width: 300,
    height: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInput: {
    height: 80,
    textAlignVertical: 'top',
    borderWidth: 2,
    width: '90%',
    alignSelf: 'center',
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
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

export default AddArgument;
