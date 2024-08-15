import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {multiThemeColor} from '../utils/AppConstants';
import Button from '../../../Components/CustomComponents/Button';
import Space from '../../../Components/CustomComponents/Space';
import LottieView from 'lottie-react-native';
import Heading from '../../../Components/CustomComponents/Heading';
// import {SignUpMemberFunction} from '../FireBase/AuthFunction';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
import SubHeading from '../../../Components/CustomComponents/SubHeading';
import {SignUpMemberFunction} from '../../../Utils/Auth/AuthFunction';
import {multiThemeColor} from '../../../Utils/AppConstants';
import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';

const SignUpMember: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
      ToastAndroid.show(
        'Kindly fill in all details correctly',
        ToastAndroid.SHORT,
      );
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      ToastAndroid.show(
        'This is not a valid email address',
        ToastAndroid.SHORT,
      );
      return;
    }

    SignUpMemberFunction({
      fullName: trimmedFullName,
      email: trimmedEmail,
      password: trimmedPassword,
      setEmail,
      setPassword,
      setFullName,
      navigation,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: multiThemeColor().main_background,
      }}>
      <View style={{flex: 1}}>
        <ConnectionStatusToast />
        <Space height={10} />
        <Heading text="Registration" style={{fontSize: 40, marginTop: 40}} />
        <Space height={30} />
        <View
          style={{
            flex: 1,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../../Assets/LottieAnimation/SignUpnew.json')}
            autoPlay
            loop
            style={{height: 200, width: 300}}
          />
        </View>
      </View>
      <View>
        <TextInput
          placeholder="Your Name *"
          value={fullName}
          onChangeText={text => setFullName(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor={multiThemeColor().PlaceHolder}
        />
        <TextInput
          placeholder="Your Email *"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor={multiThemeColor().PlaceHolder}
        />
        <TextInput
          placeholder="Create Password *"
          value={password}
          onChangeText={text => setPassword(text)}
          style={{
            padding: 5,
            borderColor: multiThemeColor().textcolor,
            borderBottomWidth: 1,
            color: multiThemeColor().textcolor,
            width: 300,
            marginBottom: 30,
          }}
          placeholderTextColor={multiThemeColor().PlaceHolder}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginRight: 10,
          }}>
          <SubHeading
            text=" Have an account"
            style={{color: multiThemeColor().textcolor, margin: 10}}
            onPress={() => navigation.navigate('WelcomeScreen')}
          />
        </TouchableOpacity>
        <Space height={20} />
      </View>
      <View>
        <Button
          title="Sign Up"
          onPress={handleSignUp}
          backgroundColor={multiThemeColor().textcolor}
          TextColor={multiThemeColor().main_background}
        />
        <Space height={70} />
      </View>
    </View>
  );
};

export default SignUpMember;

const styles = StyleSheet.create({});
