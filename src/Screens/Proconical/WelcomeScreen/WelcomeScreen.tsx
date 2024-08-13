import React, {useState} from 'react';
import {View, StyleSheet, Alert, Text, ActivityIndicator} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
// import {multiThemeColor} from '../utils/AppConstants';
import Button from '../../../Components/CustomComponents/Button';
import Space from '../../../Components/CustomComponents/Space';
import LottieView from 'lottie-react-native';
import Heading from '../../../Components/CustomComponents/Heading';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {onGoogleButtonPress} from '../FireBase/GoogleSignMember';
import auth from '@react-native-firebase/auth';
import {GuestLogin} from '../../../Utils/Auth/AuthFunction';
import {
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  PersonIcon,
  PhoneIcon,
} from '../../../Utils/Icons/Icons';
import {handleFacebookLogin} from '../../../Utils/Auth/FaceBookAuth';
import {multiThemeColor} from '../../../Utils/AppConstants';
import {onGoogleButtonPress} from '../../../Utils/Auth/GoogleSignMember';
import {
  AccessToken,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
// import {
//   EmailIcon,
//   FacebookIcon,
//   GoogleIcon,
//   PersonIcon,
//   PhoneIcon,
// } from '../utils/Icons';
// import {handleFacebookLogin} from './FaceBookAuth';
// import {GuestLogin} from '../FireBase/AuthFunction';

// GoogleSignin.configure({
//   webClientId:
//     '716511376654-2f49cp4fcbhde7uvfv1kljpaipnfd1a8.apps.googleusercontent.com',
//   offlineAccess: true,
//   forceCodeForRefreshToken: true,
// });

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [fulloading, setfullLoading] = useState<boolean>(false);

  // =========================================
  const handleLoginFinished = (error, result) => {
    setfullLoading(true); // Show loading indicator

    if (error) {
      console.log('Login has error: ' + error);
      setfullLoading(false); // Hide loading indicator on error
    } else if (result.isCancelled) {
      console.log('Login is cancelled.');
      setfullLoading(false); // Hide loading indicator on cancellation
    } else {
      AccessToken.getCurrentAccessToken()
        .then(data => {
          if (data) {
            const accessToken = data.accessToken.toString();
            console.log('Access Token: ', accessToken);

            // Sign in with Facebook credential in Firebase
            const facebookCredential =
              auth.FacebookAuthProvider.credential(accessToken);

            // Sign-in the user with the Facebook credential
            auth()
              .signInWithCredential(facebookCredential)
              .then(userCredential => {
                // userCredential is now correctly defined here
                console.log('User signed in with Firebase using Facebook!');

                // Retrieve profile information
                Profile.getCurrentProfile()
                  .then(currentProfile => {
                    if (currentProfile) {
                      console.log(
                        'The current logged user is: ' +
                          currentProfile.name +
                          '. His profile id is: ' +
                          currentProfile.userID,
                      );

                      // Navigate to 'Dilemmas' on successful login
                      navigation.navigate('Dilemmas', {
                        UserID: userCredential.user.uid, // userCredential is accessible here
                      });
                    }
                  })
                  .catch(err => {
                    console.log('Error fetching profile: ', err);
                    setfullLoading(false); // Hide loading indicator on profile fetch error
                  });
              })
              .catch(err => {
                console.log('Firebase sign-in error: ', err);
                setfullLoading(false); // Hide loading indicator on Firebase sign-in error
              });
          }
        })
        .catch(err => {
          console.log('Error fetching access token: ', err);
          setfullLoading(false); // Hide loading indicator on access token fetch error
        });
    }
  };

  // =========================================
  // const handleLoginFinished = (error, result) => {
  //   if (error) {
  //     console.log('Login has error: ' + error);
  //   } else if (result.isCancelled) {
  //     console.log('Login is cancelled.');
  //   } else {
  //     AccessToken.getCurrentAccessToken()
  //       .then(data => {
  //         console.log(data.accessToken.toString());

  //         // Retrieve profile information along with the access token
  //         Profile.getCurrentProfile()
  //           .then(currentProfile => {
  //             if (currentProfile) {
  //               console.log(
  //                 'The current logged user is: ' +
  //                   currentProfile.name +
  //                   '. His profile id is: ' +
  //                   currentProfile.userID,
  //                 data,
  //               );
  //               // Alert.alert(currentProfile.name);
  //               // navigation.navigate('DrawerNavigation', {
  //               //   UserID: currentProfile.userID,
  //               // });
  //             }
  //           })
  //           .catch(err => console.log('Error fetching profile: ', err));
  //       })
  //       .catch(err => console.log('Error fetching access token: ', err));
  //   }
  // };

  // =========================================
  // =========================================
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  // =========================================

  // const handleLogin = () => {
  //   console.log('Solve me');
  // };

  const HandleGoogleSign = () => {
    onGoogleButtonPress(navigation);
  };

  const AnonymusLogIn = () => {
    GuestLogin(navigation);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: multiThemeColor().main_background},
      ]}>
      <View style={{flex: 1}}>
        <Space height={30} />
        <View
          style={{
            flex: 1,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <LottieView
            source={require('../../../Assets/LottieAnimation/WelcomeAnimation.json')}
            autoPlay
            loop
            style={{
              height: 300,
              width: 300,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Register Account"
          onPress={() => navigation.navigate('SignUpMember')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Heading
          text="- - OR - -"
          textAlign="center"
          color={multiThemeColor().textcolor}
        />
        <Space height={10} />
        <Button
          title="Log in"
          onPress={() => navigation.navigate('LogInMember')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<EmailIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="Google"
          onPress={HandleGoogleSign}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<GoogleIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="FaceBook Not Working "
          onPress={() => onFacebookButtonPress()}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<FacebookIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <View>
          <LoginButton
            onLoginFinished={handleLoginFinished}
            // onPress={() => onFacebookButtonPress()}
            onLogoutFinished={() => console.log('Logout.')}
            style={{width: '100%', height: 35}}
          />
        </View>

        <Space height={10} />
        <Button
          title="Phone Number"
          onPress={() => navigation.navigate('PhoneNumberScreen')}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<PhoneIcon color={multiThemeColor().main_background} />}
        />
        <Space height={10} />
        <Button
          title="Guest"
          onPress={AnonymusLogIn}
          backgroundColor={multiThemeColor().ButtonBackGround}
          TextColor={multiThemeColor().main_background}
          leftIcon={<PersonIcon color={multiThemeColor().main_background} />}
        />
        <Space height={80} />
      </View>
      {fulloading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 30,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: 1,
    color: 'white',
    width: 300,
    marginBottom: 30,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  registerText: {
    color: 'white',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
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

export default WelcomeScreen;
