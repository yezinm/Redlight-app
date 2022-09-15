import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DevicesScreen from './DevicesScreen';
import DeviceScreen from './DeviceScreen';
import React, {useEffect, useState} from 'react'
import HomeScreen from './HomeScreen';


const Stack = createNativeStackNavigator();


export default function MainScreen() {

  return (
        <Stack.Navigator>
          <Stack.Screen  name="Home" component={HomeScreen} />
          <Stack.Screen name="Devices" component={DevicesScreen} />
          <Stack.Screen name="Device" options={({route}) => ({title: route.params.deviceName})} component={DeviceScreen} />
        </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
