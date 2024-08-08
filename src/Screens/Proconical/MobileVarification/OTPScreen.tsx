import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TextInput, ToastAndroid, Alert} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import Heading from '../../../Components/Headings/Heading';
import Space from '../../../Components/CustomComponents/Space';
import LottieView from 'lottie-react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
// import {multiThemeColor} from '../../../utils/AppConstants';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation'; // Adjust the import path accordingly
import Button from '../../../Components/CustomComponents/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import Heading from '../../../Components/CustomComponents/Heading';
import {multiThemeColor} from '../../../Utils/AppConstants';

type OTPScreenRouteProp = RouteProp<RootStackParamList, 'OTPScreen'>;

const OTPScreen: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const route = useRoute<OTPScreenRouteProp>();
  const {confirm} = route.params as {
    confirm: FirebaseAuthTypes.ConfirmationResult;
  };
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'OTPScreen'>>();

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const showToast = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const handleChange = (text: string, index: number) => {
    const cleanText = text.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanText;
    setOtp(newOtp);

    if (cleanText !== '' && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === otp.length - 1 && newOtp.every(digit => digit !== '')) {
      confirmCode(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const confirmCode = async (code: string) => {
    if (code.length !== 6) {
      showToast('Kindly fill the OTP correctly.');
      return;
    }
    try {
      await confirm.confirm(code);
      const UserId = auth().currentUser?.uid;
      navigation.navigate('DrawerNavigation', {UserID: UserId});
      Alert.alert('All is well');
    } catch (error) {
      console.error('Invalid code.', error);
      showToast('Invalid code.');
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
          text="Enter Your Verification Code"
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
            source={require('../../../Assets/LottieAnimation/OTPAnimation.json')}
            autoPlay
            loop
            style={styles.lottieStyle}
          />
        </View>
      </View>
      <Space height={200} />

      <View style={styles.container}>
        <Space height={50} />
        <View style={{flexDirection: 'row', gap: 10}}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={{
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 100,
                width: 40,
                height: 40,
                color: multiThemeColor().textcolor,
                fontSize: 20,
                paddingTop: 10,
                textAlign: 'center',
              }}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={text => handleChange(text, index)}
              onKeyPress={e => handleKeyPress(e, index)}
            />
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirm Code"
            onPress={() => confirmCode(otp.join(''))}
            backgroundColor={multiThemeColor().ButtonBackGround}
            TextColor={multiThemeColor().main_background}
          />
        </View>
      </View>
      <Space height={50} />
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
  },
  lottieStyle: {
    height: 300,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default OTPScreen;
