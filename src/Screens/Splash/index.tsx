import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';
// import {useStackNavigator} from '../../../utils/HandleNavigation';
// import {multiThemeColor, normalized} from '../../../utils/AppConstants';
// import Picture from '../../../components/Picture/Picture';
// import AnimatedContainer from '../../../utils/AnimationsContainer';
// import {ProsConsImage} from '../../../assets';
import auth from '@react-native-firebase/auth';
import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
import {multiThemeColor, normalized} from '../../Utils/AppConstants';
import AnimatedContainer from '../../Components/CustomComponents';
import Picture from '../../Components/CustomComponents/Picture';
import {ProsConsImage} from '../../Assets';

const SplashScreen: React.FC = () => {
  const {replaceScreen} = useStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>(null); // Type 'any' or adjust to your user type

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userAuth => {
      setUser(userAuth);
      if (initializing) setInitializing(false);
    });

    // Clean up subscription on unmount
    return subscriber;
  }, [initializing]);

  useEffect(() => {
    if (!initializing) {
      if (user) {
        // If user is logged in, navigate to DrawerNavigation with user UID
        replaceScreen('DrawerNavigation', {UserID: user.uid});
      } else {
        // If no user is logged in, navigate to WelcomeScreen
        replaceScreen('WelcomeScreen', {});
      }
    }
  }, [initializing, replaceScreen, user]);

  if (initializing) {
    // You can show a loading indicator or splash screen while initializing
    return (
      <Box
        bg={multiThemeColor().main_background}
        alignItems="center"
        justifyContent="center"
        flex={1}>
        <AnimatedContainer
          delay={100}
          duration={800}
          animationType="fadeInDown"
          isVisible={true}>
          <Picture
            localSource={ProsConsImage}
            height={normalized.hp('28%')}
            width={normalized.hp('40%')}
            resizeMode="contain"
          />
        </AnimatedContainer>
      </Box>
    );
  }

  // This return statement is only reached once initializing is false
  return null; // Or you can return a loading indicator here as well
};

export default SplashScreen;
