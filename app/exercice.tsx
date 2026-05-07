import React, { useState } from 'react';
import { ScrollView, Image, View, Text, TextInput, StyleSheet } from 'react-native';


export default function App() {
  const [textValue, setTextValue] = useState('');

  return (
    <View style={styles.container}>

      {/* Section haute */}
      <View style={styles.section}>
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: 'https://i.pinimg.com/236x/5b/c2/c6/5bc2c65295d011c580ab5bf3563dabf9--stock-photo-free-free-stock-image.jpg' }}
          />
          <TextInput
            placeholder="Ecrivez ici"
            style={styles.input}
            onEndEditing={(event) => setTextValue(event.nativeEvent.text)}
          />
        </ScrollView>
      </View>

      {/* Section basse */}
      <View style={[styles.section, styles.sectionBorder]}>
        <ScrollView>
      
          <Image
            style={styles.image}
            source={{ uri: 'https://i.pinimg.com/236x/5b/c2/c6/5bc2c65295d011c580ab5bf3563dabf9--stock-photo-free-free-stock-image.jpg' }}
          />
          {textValue !== '' && (
            <Text style={styles.message}>Vous avez tapé : {textValue}</Text>
          )}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // ← occupe tout l'écran
  },
  section: {
    flex: 1,                    // ← 50% chacun, dynamique
  },
  sectionBorder: {
    borderTopWidth: 1,
    borderTopColor: 'black',
  },
  image: {
    width: '100%',
    aspectRatio: 1,             // ← s'adapte à n'importe quelle image
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    margin: 8,
  },
  message: {
    padding: 8,
    fontSize: 16,
  },
});