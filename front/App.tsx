// src/App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { RootSiblingParent } from 'react-native-root-siblings';

const App: React.FC = () => {
  return (
    <RootSiblingParent>
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </RootSiblingParent>
  );
};

export default App;
