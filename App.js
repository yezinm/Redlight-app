import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import AppScreen from './screens/AppScreen';
import { db, auth } from './firebase';
import { collection, getDoc } from 'firebase/firestore';
import React, {useEffect, useState} from 'react'
import { Tab } from '@rneui/base';


const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged(async(authUser) => {
      if (authUser) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid))
        setUser(userDoc)
      }
    });
  }, []);

  // console.log(user)
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="AppScreen" component={AppScreen} initialParams={{user:user}}/>
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} initialParams={{user:user}}/>
        {/* {
          user ?
            <Stack.Screen options={{headerShown: false}} name="AppScreen" component={AppScreen} />
          :
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        }           */}
      </Stack.Navigator>
    
    </NavigationContainer>

    // <NavigationContainer>

    // </NavigationContainer>
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
