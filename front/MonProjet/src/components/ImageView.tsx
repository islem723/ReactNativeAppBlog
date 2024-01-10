// src/components/CustomImageView.tsx
import React from 'react';
import { Image, StyleProp, View, ImageStyle } from 'react-native';

interface CustomImageViewProps {
  imageUrl: any; // Change the type to any
  imageStyle?: StyleProp<ImageStyle>;
  styles?: any;
}

const CustomImageView: React.FC<CustomImageViewProps> = (props) => {
  return (
    <View>
      <Image
        source={props.imageUrl} // Use the provided imageUrl directly
        style={[
          { width: 350, height: 350, resizeMode: 'contain' },
          props.imageStyle,
          props.styles,
        ]}
      />
    </View>
  );
};

export default CustomImageView;
