import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../Navigation/MainNavigation/MainNavigation';
// import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';

GoogleSignin.configure({
  webClientId:
    '716511376654-2f49cp4fcbhde7uvfv1kljpaipnfd1a8.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

export const onGoogleButtonPress = async (
  navigation: NavigationProp<RootStackParamList>,
) => {
  // Alert.alert('Good');
  // navigation.navigate('DrawerNavigation');
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);

    console.log('User signed in with Google!');
    const UserId = userCredential.user?.uid;
    console.log('User UID:', UserId);
    navigation.navigate('DrawerNavigation', {UserID: UserId});
    // Alert.alert('Go to Google Login File ?');
  } catch (error) {
    console.error('Error signing in with Google: ', error);
    if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('Cancelled', 'Sign in was cancelled');
    } else if ((error as any).code === statusCodes.IN_PROGRESS) {
      Alert.alert('In Progress', 'Sign in is in progress');
    } else if (
      (error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
    ) {
      Alert.alert('Error', 'Play services not available or outdated');
    } else {
      Alert.alert(
        'Login Error',
        'An error occurred during Google sign-in. Please try again.',
      );
    }
  }
};
