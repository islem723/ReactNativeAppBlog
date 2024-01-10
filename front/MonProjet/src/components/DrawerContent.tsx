// components/DrawerContent.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

const DrawerContent: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tiroir</Text>
      <Button
        title="Fermer le tiroir"
        onPress={() => navigation.closeDrawer()}
      />
    </View>
  );
};

export default DrawerContent;
