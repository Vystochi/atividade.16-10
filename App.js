import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import EditScreen from './src/screens/EditScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lista de Compras"
          component={HomeScreen}
          options={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24, 
              fontWeight: 'bold',
              color: '#333',
            },
          }}
        />
        <Stack.Screen name="Adicionar Produto" component={AddScreen} />
        <Stack.Screen name="Editar Produto" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
