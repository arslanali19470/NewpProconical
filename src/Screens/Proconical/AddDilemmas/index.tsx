import React, {useEffect, useRef, useState} from 'react';
import {View, TextInput, ToastAndroid, TouchableOpacity} from 'react-native';
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
import Button from '../../../Components/CustomComponents/Button';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native';
import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';

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
  const [loading, setLoading] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>(
    selectedItem?.title || '',
  );
  const [textHeight, setTextHeight] = useState(150);
  const handleAddItem = async () => {
    setLoading(true); // Start loading
    try {
      const user = firebase.default.auth().currentUser;

      if (!user) {
        throw new Error('User not authenticated');
      }

      const cleanedInputValue = inputValue.trim().replace(/\s+/g, ' ');

      if (!cleanedInputValue) {
        ToastAndroid.show('Title cannot be empty', ToastAndroid.SHORT);
        setLoading(false); // Stop loading if input is empty
        return;
      }

      const newGoal = {
        id: selectedItem?.id || uuid.v4(),
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
          'Topic added or updated successfully!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        setLoading(false); // Stop loading before navigating
        navigation.goBack();
      } else {
        throw result;
      }
    } catch (error) {
      console.error('Error creating or updating goal:', error);
      ToastAndroid.show('Error creating or updating goal', ToastAndroid.SHORT);
      setLoading(false); // Stop loading if an error occurs
    }
  };

  // ===========================================
  const cleanedInputValue = inputValue.trim().replace(/\s+/g, ' ');
  useEffect(() => {
    if (AddInputRef.current) {
      AddInputRef.current.focus();
    }
  }, []);

  return (
    <>
      <View
        style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
        <ConnectionStatusToast />
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

        <Button
          title="Save"
          onPress={handleAddItem}
          backgroundColor="#26c4f5"
          style={{marginBottom: '10%', marginRight: 20}}
          width={100}
          alignSelf="flex-end"
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default Add_Dilemmas;
