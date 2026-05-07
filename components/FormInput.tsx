import { Text, View, TextInput } from 'react-native'
import React, { Component } from 'react'



export class FormInput extends Component {

  componentDidMount(): void {
    //Montage du composant
  }

  componentDidUpdate(): void {
    //Mise a jour du composant
  }

  componentWillUnmount(): void {
    //Démontage du composant
  }

  render() {
    return (
      <View>
        <Text>Prénom</Text>
        <TextInput
            value="{this.props.firstNames}"
          />
      </View>
    )
  }
}

export default FormInput