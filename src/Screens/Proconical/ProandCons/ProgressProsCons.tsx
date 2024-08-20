import React, {useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {multiThemeColor} from '../../../Utils/AppConstants';
import {
  fetchProsRealtime,
  fetchConsRealtime,
} from '../../../Utils/Firebase/Functions';
import {ProsConsType, TopicDetail} from '../../../Utils/TypeExport/TypeExport';
import Space from '../../../Components/CustomComponents/Space';
import {Row} from 'native-base';

type ProgressProsConsProps = {
  selectedItem: TopicDetail;
};

const ProgressProsCons: React.FC<ProgressProsConsProps> = ({selectedItem}) => {
  const [prosSum, setProsSum] = useState(0);
  const [consSum, setConsSum] = useState(0);

  useEffect(() => {
    const unsubscribePros = fetchProsRealtime(
      selectedItem.id,
      (pros: ProsConsType[]) => {
        const sumImportance = (items: ProsConsType[]) =>
          items.reduce((sum, item) => sum + item.importance, 0);
        setProsSum(sumImportance(pros));
      },
      () => {},
    );

    const unsubscribeCons = fetchConsRealtime(
      selectedItem.id,
      (cons: ProsConsType[]) => {
        const sumImportance = (items: ProsConsType[]) =>
          items.reduce((sum, item) => sum + item.importance, 0);
        setConsSum(sumImportance(cons));
      },
      () => {},
    );

    return () => {
      unsubscribePros();
      unsubscribeCons();
    };
  }, [selectedItem.id]);

  const total = prosSum + consSum;

  // Prepare data for the pie chart
  const pieData = [
    {
      value: prosSum,
      color: multiThemeColor().PROS_COLOR,
    },
    {
      value: consSum,
      color: multiThemeColor().CONS_COLOR,
    },
  ];

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Space height={10} />
      <PieChart
        data={pieData}
        donut // For donut chart; remove if you want a regular pie chart
        showText // Show percentage text
        textColor="black"
        textSize={16}
        radius={100}
        innerRadius={60} // Only for donut chart
        centerLabelComponent={() => (
          <View>
            <Text style={styles.centerLabel}>Total</Text>
            <Text style={styles.centerLabel}>{total}</Text>
          </View>
        )}
      />
      <Space height={20} />
      <Row space={5}>
        <Row space={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
              backgroundColor: multiThemeColor().PROS_COLOR,
            }}
          />
          <Text>Cons</Text>
        </Row>
        <Row space={2} style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 100,
              backgroundColor: multiThemeColor().CONS_COLOR,
            }}
          />
          <Text>Pros</Text>
        </Row>
      </Row>
    </View>
  );
};

export default ProgressProsCons;

const styles = StyleSheet.create({
  centerLabel: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
