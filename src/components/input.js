import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {mainInput} from '../styles';

const Input = ({
  label,
  value,
  defaultValue,
  onChangeText,
  placeholder,
  error,
  errorText,
  password,
  name,
  keyboardType,
  onSubmitEditing,
  markRef,
  blurOnSubmit,
  props,
  onBlur,
  numberOfLines,
  multiline,
}) => {
  return (
    <View style={mainInput.inputWrapper}>
      <Text style={mainInput.label}>{label}</Text>
      <TextInput
        {...props}
        style={multiline ? mainInput.textMultiline : mainInput.text}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        secureTextEntry={password}
        autoCorrect={false}
        name={name}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor="#C7C7C7"
        ref={markRef}
        blurOnSubmit={blurOnSubmit}
        onBlur={onBlur}
        numberOfLines={numberOfLines}
        multiline={multiline}
      />
      <Text style={mainInput.error}>{errorText}</Text>
    </View>
  );
};

export default Input;
