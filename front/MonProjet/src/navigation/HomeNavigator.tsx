// navigation/RootNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from '../components/DrawerContent';
import { HomeRoutesParamList } from './NavTypes';
import { HomeRoutes } from './RouteEnums';

const { Navigator, Screen } = createDrawerNavigator<HomeRoutesParamList>();

export default function HomeNavigator() {
  return (
    <Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Screen name={HomeRoutes.HomeScreen} component={HomeScreen} />
    </Navigator>
  );
}
