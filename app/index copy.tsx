import { Text, View, Image } from "react-native";
import {StyleSheet, TextInput, Button, ScrollView} from 'react-native';


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView>
        <Text>Veuillez saisir une remarque ci-dessous :</Text>
        <Image source={require('@/assets/images/cartoon question mark.png')} style={{ width: 200, height: 200 }} />
        <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 20, paddingHorizontal: 10 }}
            onChangeText={text => console.log(text)}
            placeholder="Saisissez un commentaire"
          />
        <Button title="Envoyer" onPress={() => console.log('Commentaire envoyé')} />

          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.       
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
      </ScrollView>
      
        
    </View>
  );
}
