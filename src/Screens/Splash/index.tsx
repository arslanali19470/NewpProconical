import React, {useEffect, useState} from 'react';
import {Box} from 'native-base';

import auth from '@react-native-firebase/auth';
import {useStackNavigator} from '../../Navigation/HandleNavigation/HandleNavigation';
import {multiThemeColor, normalized} from '../../Utils/AppConstants';
import AnimatedContainer from '../../Components/CustomComponents';
import Picture from '../../Components/CustomComponents/Picture';
import {ProsConsImage} from '../../Assets';

const SplashScreen: React.FC = () => {
  const {replaceScreen} = useStackNavigator();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Set a timeout for 1.5 seconds before checking authentication state
    const timeoutId = setTimeout(() => {
      const currentUser = auth().currentUser;
      setUser(currentUser);
      setInitializing(false);
    }, 1500);

    // Cleanup timeout if component is unmounted
    return () => clearTimeout(timeoutId);
  }, []);

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

  return null;
};

export default SplashScreen;
