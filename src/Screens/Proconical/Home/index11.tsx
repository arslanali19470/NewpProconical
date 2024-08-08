import React from 'react';
import {Button, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { getGoalByUser } from '../../../Utils/Firebase/Functions';

const FetchGoals: React.FC = () => {
    const fetchGoal = async (): Promise<void> => {
      const goalId = 'user123'; // Replace with the actual goal ID you want to fetch
      try {
        const goal = await getGoalByUser(goalId);
        console.log('Fetched goal:', goal);
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => fetchGoal()}>
          <Text style={styles.text}>Fetch Goal</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
      color: 'white',
    },
  });
  
  export default FetchGoals;
  