import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, ToastAndroid} from 'react-native';
import {VStack} from 'native-base';
import Gradiant_Button from '../../../Components/CustomComponents/Gradiant_Button';
import {RouteProp, useIsFocused} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
import * as firebase from '@react-native-firebase/app';
import {multiThemeColor} from '../../../Utils/AppConstants';
import Space from '../../../Components/CustomComponents/Space';
import {createOrUpdateGoal} from '../../../Utils/Firebase/Functions';
import uuid from 'react-native-uuid';

type AddDilemmasNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dilemmas Description'
>;

type AddDilemmasRouteProp = RouteProp<
  RootStackParamList,
  'Dilemmas Description'
>;

export type AddDilemmasScreenProps = {
  navigation: AddDilemmasNavigationProp;
  route: AddDilemmasRouteProp;
};

const Add_Dilemmas: React.FC<AddDilemmasScreenProps> = ({
  route,
  navigation,
}) => {
  const {UserID} = route.params;
  const selectedItem = route?.params?.selectedItem;
  const isFocused = useIsFocused();
  const AddInputRef = useRef<TextInput>(null);

  const [inputValue, setInputValue] = useState<string>(
    selectedItem?.title || '',
  );
  const [textHeight, setTextHeight] = useState(150);

  const handleAddItem = async () => {
    try {
      const user = firebase.default.auth().currentUser;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const newGoal = {
        id: selectedItem?.id || uuid.v4(), // Use existing id if updating, otherwise generate a new one
        title: cleanedInputValue,
        userId: user.uid,
        trash: false,
        DateandTime: new Date(),
        Arguments: {
          Pros: [],
          Cons: [],
        },
      };

      const result = await createOrUpdateGoal(newGoal);

      if (typeof result === 'string') {
        console.log('Goal created or updated with ID:', result);
        ToastAndroid.showWithGravityAndOffset(
          'Topic Added or updated successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.goBack();
      } else {
        throw result;
      }
    } catch (error) {
      console.error('Error creating or updating goal:', error);
      ToastAndroid.show('Error creating or updating goal', ToastAndroid.SHORT);
    }
  };

  const cleanedInputValue = inputValue.trim().replace(/\s+/g, ' ');
  useEffect(() => {
    if (AddInputRef.current) {
      AddInputRef.current.focus();
    }
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <Space height={20} />
      <VStack justifyContent="space-between" style={{flex: 1}}>
        <TextInput
          multiline
          numberOfLines={10}
          ref={AddInputRef}
          style={{
            minHeight: 150,
            maxHeight: 400,
            height: textHeight,
            textAlignVertical: 'top',
            borderWidth: 2,
            borderColor: multiThemeColor().BLUE1,
            width: '90%',
            alignSelf: 'center',
            fontSize: 18,
            borderRadius: 10,
            padding: 10,
            color: multiThemeColor().textcolor,
          }}
          placeholder="Description"
          placeholderTextColor="gray"
          value={inputValue}
          onChangeText={setInputValue}
          onContentSizeChange={event => {
            const newHeight = Math.min(
              400,
              Math.max(150, event.nativeEvent.contentSize.height),
            );
            setTextHeight(newHeight);
          }}
        />
      </VStack>

      <Gradiant_Button
        title="Save"
        onPress={handleAddItem}
        color="white"
        alignSelf="flex-end"
        marginRight={20}
        marginBottom={20}
        width="120%"
        fontSize={13}
      />
    </View>
  );
};

export default Add_Dilemmas;
