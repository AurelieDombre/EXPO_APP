Le code fourni par le cours est globalement correct pour React Native mobile, MAIS il a plusieurs problèmes :

* un peu ancien
* pas optimisé
* pas compatible proprement avec Expo Web
* quelques mauvaises pratiques

Je vais te commenter précisément ce code ligne par ligne et t’expliquer les problèmes réels.

---

# 1. Les imports

```jsx id="8jjlwm"
import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
```

---

# Explication

## `React`

Permet d’utiliser React.

---

## `View`

Equivalent d’une `<div>`.

---

## `StyleSheet`

Permet de créer des styles React Native.

---

## `Platform`

Permet de détecter :

* Android
* iOS
* Web

---

# 2. Le composant principal

```jsx id="5owc2q"
export default function App() {
```

C’est le composant principal de l’application.

---

# Le return

```jsx id="53f3os"
return (
    <View style={platformCardStyles.container}>
        <PlatformSpecificCard elevation={0} />
        <PlatformSpecificCard elevation={8} />
    </View>
);
```

---

# Explication

On affiche :

* une carte sans ombre
* une carte avec ombre

---

# IMPORTANT

```jsx id="hjlwm3"
elevation={8}
```

➡ on envoie une prop.

Le composant enfant reçoit :

```jsx id="2c1k91"
props.elevation
```

---

# 3. Le composant PlatformSpecificCard

```jsx id="m0v70u"
export function PlatformSpecificCard(props) {
```

---

# Ce composant reçoit :

```jsx id="vj8lma"
props.elevation
```

---

# 4. Premier IF : pas d’ombre

```jsx id="v5j2r5"
if (typeof props.elevation === 'undefined' || props.elevation === 0) {
    return <View style={platformCardStyles.card} />;
}
```

---

# Explication

---

## Partie 1

```jsx id="ywjlwm"
typeof props.elevation === 'undefined'
```

Vérifie si aucune valeur n’a été envoyée.

---

## Partie 2

```jsx id="bjlwmr"
props.elevation === 0
```

Vérifie si l’élévation vaut 0.

---

# Résultat

Dans les deux cas :
➡ aucune ombre.

---

# Ce qui est affiché

```jsx id="4b9jot"
<View style={platformCardStyles.card} />
```

---

# 5. Cas Android

```jsx id="k1j6zw"
if (Platform.OS === 'android') {
```

---

# Explication

On vérifie si on est sur Android.

---

# Pourquoi ?

Parce que Android possède :

```jsx id="4a5af2"
elevation
```

qui génère automatiquement une ombre.

---

# Le return Android

```jsx id="gvlwqs"
return (
    <View
        elevation={props.elevation}
        style={[{ elevation: props.elevation }, platformCardStyles.card]}
    />
);
```

---

# PROBLÈME IMPORTANT ICI

Cette ligne :

```jsx id="ujlwmj"
elevation={props.elevation}
```

ne sert à rien.

---

# Pourquoi ?

Car `elevation` n’est PAS une prop native de `<View>`.

C’est un STYLE.

---

# Donc ceci suffit :

```jsx id="9i6d90"
style={[
   { elevation: props.elevation },
   platformCardStyles.card
]}
```

---

# Version correcte

```jsx id="km4wnu"
return (
    <View
        style={[
            { elevation: props.elevation },
            platformCardStyles.card
        ]}
    />
);
```

---

# 6. Le tableau de styles

```jsx id="wxjlwm"
style={[
   { elevation: props.elevation },
   platformCardStyles.card
]}
```

---

# Pourquoi un tableau ?

React Native fusionne les styles.

Equivalent à :

```jsx id="89enqn"
style1 + style2
```

---

# Ici :

## Style dynamique

```jsx id="c3k3mq"
{ elevation: props.elevation }
```

---

## Style fixe

```jsx id="uqiwd7"
platformCardStyles.card
```

---

# 7. Cas iOS

```jsx id="gwmfbd"
return (
```

Si on arrive ici :

* ce n’est PAS Android
* donc iOS

---

# Pourquoi faire un code spécial ?

Parce que iOS ne comprend PAS :

```jsx id="jlwmkt"
elevation
```

---

# iOS utilise :

```jsx id="ceykba"
shadowOpacity
shadowRadius
shadowOffset
```

---

# 8. shadowOpacity

```jsx id="tjlwmq"
shadowOpacity: 0.0015 * props.elevation + 0.18,
```

---

# Rôle

Contrôle la visibilité de l’ombre.

---

# Exemple

Si elevation = 8 :

```jsx id="djlwmk"
0.0015 * 8 + 0.18
= 0.192
```

---

# 9. shadowRadius

```jsx id="gxl94z"
shadowRadius: 0.54 * props.elevation,
```

---

# Rôle

Contrôle le flou de l’ombre.

---

# Exemple

```jsx id="jlwmjn"
0.54 * 8
= 4.32
```

---

# 10. shadowOffset

```jsx id="bnjlwm"
shadowOffset: {
    height: 0.6 * props.elevation,
},
```

---

# Rôle

Décale l’ombre vers le bas.

---

# Exemple

```jsx id="jlwm2a"
0.6 * 8
= 4.8
```

---

# PROBLÈME ici

Il manque :

```jsx id="jlwm5g"
width: 0
```

---

# Version meilleure

```jsx id="jlwm7s"
shadowOffset: {
   width: 0,
   height: 0.6 * props.elevation,
}
```

---

# 11. Les styles

```jsx id="jlwm9q"
const platformCardStyles = StyleSheet.create({
```

---

# Style container

```jsx id="jlwmbg"
container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
},
```

---

# flex: 1

Prend toute la hauteur.

---

# justifyContent

Espace verticalement les cartes.

---

# alignItems

Centre horizontalement.

---

# 12. Style card

```jsx id="jlwmde"
card: {
    backgroundColor: Platform.OS === 'android'
        ? '#cf1b1b'
        : '#145374',
    height: 100,
    width: 100,
},
```

---

# Couleur conditionnelle

---

## Android

```txt id="jlwmgh"
#cf1b1b
```

Rouge.

---

## iOS

```txt id="jlwmjj"
#145374
```

Bleu.

---

# Problème moderne

Sur le WEB :

* ce sera bleu aussi
* car `"web"` ≠ `"android"`

---

# Donc meilleure version

```jsx id="jlwmmh"
backgroundColor:
   Platform.OS === 'android'
      ? '#cf1b1b'
      : Platform.OS === 'ios'
      ? '#145374'
      : '#999'
```

---

# 13. Les vrais problèmes du code du cours

---

# ❌ 1. `elevation={props.elevation}` inutile

À supprimer.

---

# ❌ 2. Pas compatible web

Car :

* React Native Web préfère `boxShadow`

---

# ❌ 3. shadowOffset incomplet

Il manque :

```jsx id="jlwmpp"
width: 0
```

---

# ❌ 4. Pas de shadowColor

Il manque :

```jsx id="jlwmrr"
shadowColor: '#000'
```

---

# 14. Version améliorée du code du cours

```jsx id="jlwmtt"
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <PlatformSpecificCard elevation={0} />
      <PlatformSpecificCard elevation={8} />
    </View>
  );
}

function PlatformSpecificCard({ elevation }) {

  if (!elevation) {
    return <View style={styles.card} />;
  }

  // Android
  if (Platform.OS === 'android') {
    return (
      <View
        style={[
          styles.card,
          { elevation }
        ]}
      />
    );
  }

  // iOS
  return (
    <View
      style={[
        styles.card,
        {
          shadowColor: '#000',
          shadowOpacity: 0.0015 * elevation + 0.18,
          shadowRadius: 0.54 * elevation,
          shadowOffset: {
            width: 0,
            height: 0.6 * elevation,
          },
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  card: {
    width: 100,
    height: 100,

    backgroundColor:
      Platform.OS === 'android'
        ? '#cf1b1b'
        : '#145374',
  },
});
```
