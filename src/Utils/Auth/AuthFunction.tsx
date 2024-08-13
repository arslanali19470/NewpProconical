import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert, ToastAndroid} from 'react-native';
// import {RootStackParamList} from '../navigation/MainNavigation/MainNavigation';
import {NavigationProp} from '@react-navigation/native';
import {LoginManager} from 'react-native-fbsdk-next';
import {RootStackParamList} from '../../Navigation/MainNavigation/MainNavigation';
// import {AppDispatch} from '../services/ReduxToolkit/store';
// import {useDispatch} from 'react-redux';
// import {setUserID} from '../services/ReduxToolkit/UserIDSlice';

// ========================================================================
// Interfaces
// ========================================================================

interface SignUpProps {
  fullName: string;
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setFullName: React.Dispatch<React.SetStateAction<string>>;
  navigation: NavigationProp<RootStackParamList>;
}

interface LoginProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  navigation: NavigationProp<RootStackParamList>;
}
// const dispatch: AppDispatch = useDispatch();
// ========================================================================
// SignUpMemberFunction
// ========================================================================

export const SignUpMemberFunction = async ({
  fullName,
  email,
  password,
  setEmail,
  setPassword,
  setFullName,
  navigation,
}: SignUpProps) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    console.log('User account created');
    setEmail('');
    setPassword('');
    setFullName('');

    // const usersCollection = firestore().collection('Users');
    // const docRef = await usersCollection.add({
    //   name: fullName,
    //   email: email,
    // });
    // console.log('Document written with ID:', docRef.id);

    await user.sendEmailVerification();

    // Alert.alert(
    //   'Registration Successful',
    //   'Your account has been created. Please verify your email address before logging in.',
    // );
    ToastAndroid.showWithGravityAndOffset(
      'Please verify your email address!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );

    navigation.navigate('LogInMember');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      // Alert.alert(
      //   'Registration Error',
      //   'That email address is already in use!',
      // );
      ToastAndroid.showWithGravityAndOffset(
        'That email address is already in use!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (error.code === 'auth/invalid-email') {
      // Alert.alert('Registration Error', 'That email address is invalid!');
      ToastAndroid.showWithGravityAndOffset(
        'That email address is invalid!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      // Alert.alert('Registration Error', 'An error occurred. Please try again.');
      ToastAndroid.showWithGravityAndOffset(
        'Registration Error!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
    console.error(error);
  }
};

// ========================================================================
// LoginMemberFunction
// ========================================================================

export const LoginMemberFunction = async ({
  email,
  password,
  setEmail,
  setPassword,
  navigation,
}: LoginProps) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const user = userCredential.user;

    if (user.emailVerified) {
      console.log('User signed in!');
      setEmail('');
      setPassword('');
      const UserId = userCredential.user?.uid;
      console.log('User UID:', UserId);
      // dispatch(setUserID(UserId));
      navigation.navigate('DrawerNavigation', {UserID: UserId});
      // Alert.alert('Good');
    } else {
      await auth().signOut();
      // Alert.alert(
      //   'Email Verification Required',
      //   'Please verify your email address before logging in.',
      // );
      ToastAndroid.showWithGravityAndOffset(
        'Email Verification Required!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  } catch (error: any) {
    if (error.code === 'auth/wrong-password') {
      console.error(
        'The password is invalid or the user does not have a password.',
      );
      // Alert.alert(
      //   'Invalid Password',
      //   'The password is invalid or the user does not have a password.',
      // );
      ToastAndroid.showWithGravityAndOffset(
        'Invalid Password!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (error.code === 'auth/user-not-found') {
      console.error(
        'There is no user record corresponding to this identifier. The user may have been deleted.',
      );
      // Alert.alert(
      //   'User Not Found',
      //   'There is no user record corresponding to this identifier. The user may have been deleted.',
      // );
      ToastAndroid.showWithGravityAndOffset(
        'User Not Found!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      console.error('An error occurred:', error);
      // Alert.alert('Login Error', 'An error occurred. Please try again.');
      ToastAndroid.showWithGravityAndOffset(
        'Login Error!',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }
};
// ========================================================================
// Anonymus Login Methode:
// ========================================================================

export const GuestLogin = (navigation: NavigationProp<RootStackParamList>) => {
  // Alert.alert('Bye');
  auth()
    .signInAnonymously()
    .then(userCredential => {
      console.log('User signed in anonymously');
      const userId = userCredential.user?.uid;
      console.log('User UID:', userId);
      // if (userId) {
      //   dispatch(setUserID(userId));
      // }
      navigation.navigate('DrawerNavigation', {UserID: userId});
      // Alert.alert('Good');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
};
// ========================================================================
// handleLogoutMember:
// ========================================================================

export const handleLogoutMember = async (
  navigation: NavigationProp<RootStackParamList>,
) => {
  try {
    // Attempt Firebase sign out
    const currentUser = auth().currentUser;
    if (currentUser) {
      await auth().signOut();
      console.log('User signed out from Firebase!');
    } else {
      console.log('No user currently signed in with Firebase.');
    }

    // Attempt Facebook sign out
    LoginManager.logOut();
    // console.log('User logged out from Facebook!');

    // Show success message
    ToastAndroid.showWithGravityAndOffset(
      'You are signed out!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );

    // Navigate to login screen
    navigation.navigate('WelcomeScreen');
  } catch (error) {
    console.error('Error signing out:', error);
    Alert.alert(
      'Logout Error',
      'An error occurred while logging out. Please try again.',
    );
  }
};
