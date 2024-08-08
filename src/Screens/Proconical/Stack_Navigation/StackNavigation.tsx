import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home_Dilemmas from '../Home_Dilemmas';
const StackHome = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <StackHome.Navigator>
            <StackHome.Screen name="Home_Dilemmas" component={Home_Dilemmas} />
            <StackHome.Screen name="MyComp" component={() => <Text>123</Text>} />
            <StackHome.Screen name="Profile" component={() => <Text>123</Text>} />
            <StackHome.Screen name="Settings" component={() => <Text>123</Text>} />
        </StackHome.Navigator>)
}

export default StackNavigation