import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthRoutesParamList } from './NavTypes';
import { AuthRoutes } from './RouteEnums';

const Stack = createStackNavigator<AuthRoutesParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.LoginPage}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={AuthRoutes.LoginPage} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.RegisterPage} component={RegisterScreen} />
    </Stack.Navigator>
  );
}
