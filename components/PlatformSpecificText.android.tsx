import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function PlatformSpecificTextAndroid(props : any) {
  return <Text style={platformTextStyles.text}>{props.children}</Text>;
}

const platformTextStyles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#cf1b1b', // La bonne couleur
    color: 'white',
    padding: 5,
  },
});