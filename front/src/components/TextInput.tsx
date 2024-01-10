import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  TextStyle,
} from 'react-native';

interface CustomInputProps {
  value?: string;
  inputRef?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  placeholder: string;
  styles?: StyleProp<TextStyle>;
  onValueChange: (val: string) => void;
  onSubmitValue?: () => void;
}

export default function CustomInput(props: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const defaultStyles: StyleProp<TextStyle> = {
    borderColor: '#B9EDDD', // Default border color
    borderWidth: 1,
  };

  return (
    <Input
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      ref={props.inputRef}
      style={[
        defaultStyles,
        props.styles, // User-provided styles
        isFocused && { borderColor: '#3498db' }, // Change the border color when focused
      ]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      keyboardType={props.keyboardType}
      returnKeyType={props.returnKeyType}
      value={props.value}
      onChangeText={props.onValueChange}
      onSubmitEditing={props.onSubmitValue}
    />
  );
}
