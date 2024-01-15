// CustomInput.tsx
import React, { useState } from 'react';
import { Input } from '@ui-kitten/components';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';

interface CustomInputProps {
  value: string;
  inputRef?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType?: ReturnKeyTypeOptions;
  placeholder: string;
  accessoryRight?: JSX.Element;
  accessoryLeft?: JSX.Element;
  styles?: StyleProp<TextStyle>;
  onValueChange: (val: string) => void;
  onSubmitValue?: () => void;
  error?: boolean;
  errorText?: string;
}

export default function CustomInput(props: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const defaultStyles: StyleProp<TextStyle> = {
    borderColor: isFocused ? '#3498db' : '#B9EDDD',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
  };

  const errorStyles: StyleProp<TextStyle> = {
    ...defaultStyles,
    borderColor: 'red',
  };

  return (
    <>
      <Input
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        ref={props.inputRef}
        style={[
          defaultStyles,
          props.styles, // User-provided styles
          props.error && errorStyles, // Highlight border in red if there's an error
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        value={props.value}
        accessoryLeft={props.accessoryLeft}
        accessoryRight={props.accessoryRight}
        onChangeText={props.onValueChange}
        onSubmitEditing={props.onSubmitValue}
        accessibilityLabel={props.placeholder}
        accessibilityHint={`Enter your ${props.placeholder.toLowerCase()}`}
      />
      {props.error && <Text style={styles.errorText}>{props.errorText}</Text>}
    </>
  );
}

const styles: Record<string, StyleProp<TextStyle>> = {
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
};
