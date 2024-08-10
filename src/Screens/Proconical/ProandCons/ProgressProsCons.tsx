import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {multiThemeColor} from '../../../Utils/AppConstants';
import {TopicDetail, ProCon} from '../../../Utils/TypeExport/TypeExport';
import {
  fetchProsRealtime,
  fetchConsRealtime,
} from '../../../Utils/Firebase/Functions';

type ProgressProsConsProps = {
  selectedItem: TopicDetail;
};

const ProgressProsCons: React.FC<ProgressProsConsProps> = ({selectedItem}) => {
  const [prosSum, setProsSum] = useState(0);
  const [consSum, setConsSum] = useState(0);

  useEffect(() => {
    const unsubscribePros = fetchProsRealtime(
      selectedItem.id,
      (pros: ProCon[]) => {
        const sumImportance = (items: ProCon[]) =>
          items.reduce((sum, item) => sum + item.importance, 0);
        const prosSum = sumImportance(pros);
        setProsSum(prosSum);
        // console.log('Fetched Pros:', pros);
        // console.log('Sum of Pros Importance:', prosSum);
      },
      () => {},
    );

    const unsubscribeCons = fetchConsRealtime(
      selectedItem.id,
      (cons: ProCon[]) => {
        const sumImportance = (items: ProCon[]) =>
          items.reduce((sum, item) => sum + item.importance, 0);
        const consSum = sumImportance(cons);
        setConsSum(consSum);
        console.log('Fetched Cons:', cons);
        console.log('Sum of Cons Importance:', consSum);
      },
      () => {},
    );

    return () => {
      unsubscribePros();
      unsubscribeCons();
    };
  }, [selectedItem.id]);

  const total = prosSum + consSum;
  const progress = total === 0 ? 0.5 : prosSum / total;

  const width = 320;
  const height = 50;

  const filledPercentage = Math.round(progress * 100);
  const emptyPercentage = 100 - filledPercentage;

  const filledTextPosition = (progress * width) / 2;
  const emptyTextPosition = width - ((emptyPercentage / 100) * width) / 2;

  const prosTextOpacity = filledPercentage === 0 ? 0 : 1;
  const consTextOpacity = emptyPercentage === 0 ? 0 : 1;

  return (
    <View>
      <View style={{width, height, alignSelf: 'center', position: 'relative'}}>
        <Progress.Bar
          progress={progress}
          width={width}
          height={height}
          unfilledColor={multiThemeColor().PROS_COLOR}
          color={multiThemeColor().CONS_COLOR}
          borderWidth={0}
        />
        <Text
          style={[
            styles.progressText,
            {left: filledTextPosition - 25, opacity: prosTextOpacity},
          ]}>
          +{`${filledPercentage}.0 %`}
        </Text>
        <Text
          style={[
            styles.progressText,
            {left: emptyTextPosition - 25, opacity: consTextOpacity},
          ]}>
          -{`${emptyPercentage}.0 %`}
        </Text>
      </View>
    </View>
  );
};

export default ProgressProsCons;

const styles = StyleSheet.create({
  progressText: {
    position: 'absolute',
    top: '40%',
    transform: [{translateY: -8}],
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
