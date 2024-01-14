// navigation/RootNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Articles from '../screens/HomeScreen';

import { HomeRoutesParamList } from './NavTypes';
import { HomeRoutes } from './RouteEnums';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import BookmarksScreen from '../screens/BookmarksScreen';

const { Navigator, Screen } = createBottomTabNavigator<HomeRoutesParamList>();

interface BottomTabBarProps {
  navigation: any;
  state: any;
}

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
  </BottomNavigation>
);

export default function HomeNavigator() {
  return (
    <Navigator
      tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
    >
      <Screen name={HomeRoutes.HomeScreen} component={Articles} />
      <Screen name={HomeRoutes.BookmarksScreen} component={BookmarksScreen} />
    </Navigator>
  );
}
