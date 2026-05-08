import * as React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

export default function App() {
    const [bgColor, setBgColor] = React.useState('blue');


    //si on veut automatiser la couleur et la taille du texte
   /*  React.useEffect(() => {
        // On créé un code qui s'exécute à interval régulier
        const interval = setInterval(() => {
        setBgColor((previous) => (previous === 'yellow' ? 'green' : 'yellow'));
        }, 3000); 
        // Et on n'oublie pas de libérer la mémoire pour éviter les fuites de mémoire quand le composant est démonté
        return () => {
        clearInterval(interval);
        };
     }, []);  */


    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: bgColor,
                },
            ]}>
            <Button title="Rouge" onPress={() => setBgColor('red')} />
            <Text style={styles.title}>Bienvenue</Text>
            <Button title="Vert" onPress={() => setBgColor('green')} />


            {/* si on veut automatiser la couleur et la taille du texte */}
            {/* <Text style={styles.firstText}>Bienvenue</Text>
            <Text style={styles.secondText}>dans ce</Text>
            <Text style={styles.thirdText}>Tutoriel</Text> */}
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },

    // si on veut automatiser la couleur et la taille du texte
    firstText: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
    secondText: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10,
    },
    thirdText: {
        color: 'white',
        fontSize: 14,
    },
});

