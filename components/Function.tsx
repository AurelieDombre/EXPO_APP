// rnfe a saisir pour créer un composant fonctionnel
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const button = () => {
  return (
    <TouchableWithoutFeedback onPress={() => console.log('Button pressed')} >
        <Text>Submit</Text>
    </TouchableWithoutFeedback>
  )
}

export default button