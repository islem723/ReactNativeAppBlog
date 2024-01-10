// components/BottomNavigationContent.tsx
import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

interface BottomNavigationContentProps {
  state: { index: number; routeNames: string[] };
  navigation: { navigate: (route: string) => void };
}

export default function BottomNavigationContent({
  state,
  navigation,
}: BottomNavigationContentProps) {
  const onSelect = (index: number) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="home-outline" />}
        title="Home"
      />
      <BottomNavigationTab
        icon={(props) => <Icon {...props} name="bookmark-outline" />}
        title="Bookmarks"
      />
    </BottomNavigation>
  );
}
