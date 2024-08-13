import {Alert} from 'react-native';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import {RootStackParamList} from '../../Navigation/MainNavigation/MainNavigation';
import {NavigationProp} from '@react-navigation/native';

export const handleFacebookLogin = (
  navigation: NavigationProp<RootStackParamList>,
) => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    result => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken()
          .then(data => {
            console.log(data?.accessToken.toString());
            Profile.getCurrentProfile()
              .then(currentProfile => {
                if (currentProfile) {
                  console.log(
                    'The current logged user is: ' +
                      currentProfile.name +
                      '. His profile id is: ' +
                      currentProfile.userID,
                  );
                  //   Alert.alert(currentProfile.name);
                  navigation.navigate('DrawerNavigation', {
                    UserID: currentProfile.userID,
                  });
                }
              })
              .catch(err => console.log('Error fetching profile: ', err));
          })
          .catch(err => console.log('Error fetching access token: ', err));
      }
    },
    error => {
      console.log('Login failed with error: ' + error);
    },
  );
};
