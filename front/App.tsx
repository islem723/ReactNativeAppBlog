// src/App.tsx
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const App: React.FC = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppNavigator />
    </ApplicationProvider>
  );
};

export default App;
