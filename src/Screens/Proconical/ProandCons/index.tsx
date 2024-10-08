import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';
import {Row} from 'native-base';
// import {MaterialIcons, multiThemeColor} from '../../../utils/AppConstants';
// import Heading from '../../../components/Headings/Heading';
import Heading from '../../../Components/CustomComponents/Heading';
import Space from '../../../Components/CustomComponents/Space';
import Gradiant_Button from '../../../Components/CustomComponents/Gradiant_Button';
import Head_ProsCons from './Head_ProsCons';
import ProgressProsCons from './ProgressProsCons';
import ProsList from './ProsList';
import ConsList from './ConsList';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../Navigation/MainNavigation/MainNavigation';
// import {ProsConsType, TopicDetail} from '../../../utils/TypeExport';
import LottieView from 'lottie-react-native';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {ProsConsType} from '../../../Utils/TypeExport/TypeExport';
import {MaterialIcons, multiThemeColor} from '../../../Utils/AppConstants';
import Button from '../../../Components/CustomComponents/Button';
import ConnectionStatusToast from '../../../Components/CustomComponents/ConnectionStatusToast';

type ProsConsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProandCons'
>;
type ProsConsRouteProp = RouteProp<RootStackParamList, 'ProandCons'>;

export type ProsConsScreenProps = {
  navigation: ProsConsNavigationProp;
  route: ProsConsRouteProp;
};

const ProandCons: React.FC<ProsConsScreenProps> = ({route, navigation}) => {
  const {selectedItem} = route.params;
  const [emptyCheck, setEmptyCheck] = useState<boolean>(false);
  const [fulloading, setfullLoading] = useState<boolean>(false);
  const [emptyCheck1, setEmptyCheck1] = useState<boolean>(false);
  const [prosList, setProsList] = useState<ProsConsType[]>([]);
  const [consList, setConsList] = useState<ProsConsType[]>([]);
  const [swapDisabled, setSwapDisabled] = useState(false);
  const [SubTopicName, setSubTopicName] = useState<boolean>(true);
  const [AnimationLoad, setAnimationLoad] = useState<boolean>(true);
  const [Mainloading, setMainLoading] = useState<boolean>();
  const subTopicSharedValue = useSharedValue(true);
  const redTranslateX = useSharedValue(0);
  const redTranslateY = useSharedValue(0);
  const blueTranslateX = useSharedValue(0);
  const blueTranslateY = useSharedValue(0);
  const offset = 235;

  useEffect(() => {}, []);
  useAnimatedReaction(
    () => subTopicSharedValue.value,
    result => {
      runOnJS(setSubTopicName)(result);
    },
    [],
  );

  const panRed = Gesture.Pan()
    .onUpdate(e => {
      redTranslateX.value = e.translationX;
      redTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      if (redTranslateX.value < 26) {
        redTranslateX.value = withSpring(0);
        redTranslateY.value = withSpring(0);
        blueTranslateX.value = withSpring(0);
        subTopicSharedValue.value = !subTopicSharedValue.value;
      } else {
        redTranslateY.value = withSpring(0);
        const tempRedX = 0;
        redTranslateX.value = withSpring(blueTranslateX.value + offset);
        blueTranslateX.value = withSpring(tempRedX - offset);
        subTopicSharedValue.value = !subTopicSharedValue.value; // Toggle the shared value
      }
    });

  const panBlue = Gesture.Pan()
    .onUpdate(e => {
      blueTranslateX.value = e.translationX;
      blueTranslateY.value = e.translationY;
    })
    .onEnd(() => {
      if (blueTranslateX.value > -26) {
        blueTranslateX.value = withSpring(0);
        blueTranslateY.value = withSpring(0);
        redTranslateX.value = withSpring(0);
        subTopicSharedValue.value = !subTopicSharedValue.value;
      } else {
        blueTranslateY.value = withSpring(0);
        const tempRedX = 0;
        redTranslateX.value = withSpring(offset);
        blueTranslateX.value = withSpring(tempRedX - offset);
        subTopicSharedValue.value = !subTopicSharedValue.value; // Toggle the shared value
      }
    });

  const redStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: redTranslateX.value},
        {translateY: redTranslateY.value},
      ],
    };
  });

  const blueStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: blueTranslateX.value},
        {translateY: blueTranslateY.value},
      ],
    };
  });

  const swapBoxes = () => {
    const tempRedX = redTranslateX.value;
    redTranslateX.value = withSpring(blueTranslateX.value + offset);
    blueTranslateX.value = withSpring(tempRedX - offset);
    setSubTopicName(!SubTopicName);
    setSwapDisabled(true);
    setTimeout(() => setSwapDisabled(false), 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: multiThemeColor().main_background}}>
      <ConnectionStatusToast />
      <Head_ProsCons
        selectedItem={selectedItem}
        setfullLoading={setfullLoading}
      />
      {/* <Text style={{color: 'white'}}>{selectedItem?.id}</Text> */}
      <ScrollView>
        <ProgressProsCons
          // prosLength={prosList.length}
          // consLength={consList.length}
          selectedItem={selectedItem}
        />
        <Row alignItems={'center'} mt={3}>
          <Heading
            text={SubTopicName == true ? 'Pros' : 'Cons'}
            style={{padding: 20}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: multiThemeColor().textcolor,
              width: 30,
              height: 30,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={!swapDisabled ? swapBoxes : null}
            disabled={swapDisabled}>
            <MaterialIcons
              name="autorenew"
              color={multiThemeColor().main_background}
              size={20}
            />
          </TouchableOpacity>
        </Row>
        <View style={{flex: 1}}>
          <View>
            <View>
              <ScrollView style={{height: 300}}>
                <Row style={styles.row}>
                  <GestureDetector gesture={panRed}>
                    <Animated.View
                      style={[
                        {
                          width: '65%',
                          padding: 5,
                          borderRadius: 5,
                        },
                        redStyle,
                      ]}>
                      <ProsList
                        selectedItem={selectedItem}
                        setEmptyCheck={setEmptyCheck}
                        setProsList={setProsList}
                        setMainLoading={setMainLoading}
                      />
                    </Animated.View>
                  </GestureDetector>

                  <GestureDetector gesture={panBlue}>
                    <Animated.View
                      style={[
                        {
                          width: '65%',
                          padding: 5,
                          borderRadius: 5,
                        },
                        blueStyle,
                      ]}>
                      <ConsList
                        selectedItem={selectedItem}
                        setEmptyCheck1={setEmptyCheck1}
                        setConsList={setConsList}
                        // setLoading={setLoading}
                      />
                    </Animated.View>
                  </GestureDetector>
                </Row>
              </ScrollView>
            </View>
          </View>

          <Space height={40} />

          <Button
            title="Add Argument"
            onPress={() => navigation.navigate('Argument', {selectedItem})}
            backgroundColor="#26c4f5"
            style={{marginBottom: '10%', marginRight: 20}}
            width={120}
            alignSelf="flex-end"
          />
        </View>
        {fulloading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    padding: 5,
    gap: 4,
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

export default ProandCons;
