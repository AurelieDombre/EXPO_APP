import React from 'react';

// On importe les composants nécessaires depuis React Native
import {
    View,        // équivalent d'une <div>
    StyleSheet,  // permet de créer les styles
    Platform     // permet de savoir si on est sur Android ou iOS
} from 'react-native';


// ==============================
// COMPOSANT PRINCIPAL
// ==============================

export default function App() {

    // Le composant App affiche deux cartes :
    // - une sans ombre
    // - une avec ombre

    return (

        // Conteneur principal
        <View style={styles.container}>

            {/* Carte sans ombre */}
            <PlatformSpecificCard elevation={0} />

            {/* Carte avec ombre */}
            <PlatformSpecificCard elevation={8} />

        </View>
    );
}


// ==============================
// COMPOSANT CARTE
// ==============================

// On récupère directement la prop "elevation"
// grâce au destructuring
function PlatformSpecificCard({ elevation }) {

    // ==============================
    // CAS : PAS D'OMBRE
    // ==============================

    // Si elevation vaut 0, undefined, null ou false
    // alors on affiche simplement une carte normale
    // sans ombre

    if (!elevation) {
        return <View style={styles.card} />;
    }


    // ==============================
    // CAS ANDROID
    // ==============================

    // Android possède une propriété native :
    // "elevation"
    // qui génère automatiquement une ombre

    if (Platform.OS === 'android') {

        return (

            <View

                // style={[...]} permet de fusionner plusieurs styles
                style={[

                    // Style de base de la carte
                    styles.card,

                    // Style dynamique :
                    // l'ombre dépend de la valeur de elevation
                    {
                        elevation: elevation,
                    },

                ]}
            />
        );
    }


    // ==============================
    // CAS IOS
    // ==============================

    // iOS ne supporte PAS "elevation"
    // Il faut utiliser :
    // - shadowOpacity
    // - shadowRadius
    // - shadowOffset

    return (

        <View
            style={[

                // Style de base
                styles.card,

                // Styles de l'ombre iOS
                {

                    // Couleur de l'ombre
                    shadowColor: '#000',

                    // Transparence de l'ombre
                    // Plus la valeur est grande,
                    // plus l'ombre est visible
                    shadowOpacity: 0.0015 * elevation + 0.18,

                    // Flou de l'ombre
                    // Plus la valeur est grande,
                    // plus l'ombre est diffuse
                    shadowRadius: 0.54 * elevation,

                    // Décalage de l'ombre
                    shadowOffset: {

                        // Pas de décalage horizontal
                        width: 0,

                        // Décalage vertical
                        // L'ombre descend selon elevation
                        height: 0.6 * elevation,
                    },
                },
            ]}
        />
    );
}


// ==============================
// STYLES
// ==============================

const styles = StyleSheet.create({

    // ==============================
    // CONTENEUR PRINCIPAL
    // ==============================

    container: {

        // Prend toute la hauteur disponible
        flex: 1,

        // Répartit l'espace verticalement
        // entre les éléments
        justifyContent: 'space-around',

        // Centre les éléments horizontalement
        alignItems: 'center',
    },


    // ==============================
    // STYLE DES CARTES
    // ==============================

    card: {

        // Largeur de la carte
        width: 100,

        // Hauteur de la carte
        height: 100,


        // Couleur différente selon plateforme

        // Android → rouge
        // iOS → bleu
        backgroundColor:
            Platform.OS === 'android'
                ? '#cf1b1b'
                : '#145374',
    },
});