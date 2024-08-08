import React, {useState, useRef} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Heading from '../../../Components/CustomComponents/Heading';
import Space from '../../../Components/CustomComponents/Space';
import LottieView from 'lottie-react-native';
import Button from '../../../Components/CustomComponents/Button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {multiThemeColor} from '../../../utils/AppConstants';
import PhoneInput from 'react-native-phone-number-input';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation'; // Update the import path accordingly
import {multiThemeColor} from '../../../Utils/AppConstants';

const PhoneNumberScreen: React.FC = () => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    if (!phoneNumber) {
      showToast('Kindly fill the phone number correctly.');
      return;
    }
    try {
      const confirmation: FirebaseAuthTypes.ConfirmationResult =
        await auth().signInWithPhoneNumber(phoneNumber);
      console.log('Code sent to:', phoneNumber);
      navigation.navigate('OTPScreen', {confirm: confirmation});
    } catch (error) {
      console.error('Error signing in with phone number:', error);
      showToast('Error signing in with phone number.');
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <View style={{flex: 1}}>
        <Space height={20} />
        <Heading
          text="Enter Your Phone Number Below"
          style={{
            color: multiThemeColor().textcolor,
            marginTop: 20,
            fontSize: 20,
          }}
          textAlign="center"
        />
        <Space height={100} />
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../../Assets/LottieAnimation/PhoneAnimation.json')}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
      </View>
      <Space height={200} />

      <View style={styles.container}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          containerStyle={styles.phoneInputContainer}
          defaultCode="US"
          layout="first"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
        <Space height={10} />
        <View style={styles.buttonContainer}>
          <Button
            title="Send Code"
            onPress={() => signInWithPhoneNumber(formattedValue)}
            // onPress={() => navigation.navigate('OTPScreen')}
            backgroundColor={multiThemeColor().ButtonBackGround}
            TextColor={multiThemeColor().main_background}
          />
        </View>
      </View>

      <Space height={20} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  lottieStyle: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  phoneInputContainer: {
    width: '95%',
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    color: 'black',
    padding: 0,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default PhoneNumberScreen;
