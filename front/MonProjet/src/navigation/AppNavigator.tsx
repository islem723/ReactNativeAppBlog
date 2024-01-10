import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import { RoutesParamList } from './NavTypes';
import { Routes } from './RouteEnums';

const { Navigator, Screen } = createNativeStackNavigator<RoutesParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name={Routes.AuthRoute} component={AuthNavigator} />
        <Screen name={Routes.HomeRoute} component={HomeNavigator} />
      </Navigator>
    </NavigationContainer>
  );
}
