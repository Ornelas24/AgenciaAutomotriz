import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

import CarDetailScreen from './screens/CarDetailScreen';
import CarsList from './screens/CarsList';
import CreateCarsScreen from './screens/CreateCarsScreen';

function MyStack() {
  return (
  
    <Stack.Navigator>
      <Stack.Screen name="CarsList" component={CarsList} options={{title: 'Lista de Autos'}}/>
      <Stack.Screen name="CreateCarsScreen" component={CreateCarsScreen} options={{title: 'Crear un nuevo Automóvil'}}/>   
      <Stack.Screen name="CarDetailScreen" component={CarDetailScreen} options={{title: 'Detalles de Auto'}}/>


    </Stack.Navigator>
  )
}

export default function App(){
  return (
    <NavigationContainer>
     <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding:35,
  },
});
