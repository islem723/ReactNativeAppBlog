// screens/HomeScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Accueil</Text>
      <Button
        title="Ouvrir le tiroir"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default HomeScreen;
