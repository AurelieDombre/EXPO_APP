import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function PlatformSpecificText(props : any) {
  return <Text style={platformTextStyles.text}>{props.children}</Text>;
}

const platformTextStyles = StyleSheet.create({
  text: {
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#145374', // La bonne couleur
    color: 'white',
    padding: 5,
  },
});

const iosShadowElevation = {
  shadowOpacity: 0.0015 * elevation + 0.18,
  shadowRadius: 0.54 * elevation,
  shadowOffset: {
    height: 0.6 * elevation,
  },
};