# Explication complète de l’exercice

Le but de cet exercice est de comprendre :

* le rendu spécifique selon la plateforme (`Android` / `iOS`)
* les ombres (`shadow` et `elevation`)
* les props
* le rendu conditionnel en React Native

---

# 1. Import des éléments

```jsx id="6t8iqm"
import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
```

## Explication

### `React`

Permet d’utiliser React.

---

### `View`

Équivalent d’une `<div>` en React Native.

👉 Sert à créer des blocs.

---

### `StyleSheet`

Permet de créer les styles.

---

### `Platform`

Permet de savoir sur quelle plateforme l’application tourne :

```jsx id="0ow2jg"
Platform.OS
```

retourne :

* `"android"`
* `"ios"`

---

# 2. Le composant principal App

```jsx id="57k3k0"
export default function App() {
  return (
    <View style={platformCardStyles.container}>
      <PlatformSpecificCard elevation={0} />
      <PlatformSpecificCard elevation={8} />
    </View>
  );
}
```

---

# Ce que fait ce composant

Il affiche :

* une carte sans ombre (`elevation={0}`)
* une carte avec ombre (`elevation={8}`)

---

# Important

```jsx id="7t9v6o"
elevation={8}
```

➡ `elevation` est une **prop** envoyée au composant enfant.

---

# Schéma

```txt id="jlwm4z"
App
 └── PlatformSpecificCard
       └── reçoit la prop elevation
```

---

# 3. Le composant PlatformSpecificCard

```jsx id="m6m4im"
export function PlatformSpecificCard(props) {
```

Ce composant reçoit des props.

Ici :

```jsx id="i9lhjd"
props.elevation
```

---

# 4. Premier cas : aucune ombre

```jsx id="r5t5gm"
if (typeof props.elevation === 'undefined' || props.elevation === 0) {
  return <View style={platformCardStyles.card} />;
}
```

---

# Explication

Cette condition vérifie :

## Cas 1

```jsx id="0r7z9k"
typeof props.elevation === 'undefined'
```

➡ aucune valeur envoyée.

---

## Cas 2

```jsx id="y0ydch"
props.elevation === 0
```

➡ élévation = 0.

Donc :
👉 pas d’ombre.

---

# Résultat

On affiche simplement :

```jsx id="m6xh1f"
<View style={platformCardStyles.card} />
```

---

# 5. Cas Android

```jsx id="u9rjv8"
if (Platform.OS === 'android') {
```

---

# Explication

On vérifie si l’application tourne sur Android.

---

# Pourquoi ?

Car Android possède une propriété native :

```jsx id="8b7e3l"
elevation
```

qui gère automatiquement les ombres.

---

# Le code

```jsx id="ttr9qj"
return (
  <View
    elevation={props.elevation}
    style={[{ elevation: props.elevation }, platformCardStyles.card]}
  />
);
```

---

# Explication du style

```jsx id="0x1v2k"
style={[
  { elevation: props.elevation },
  platformCardStyles.card
]}
```

---

# Pourquoi un tableau `[]` ?

En React Native, on peut fusionner plusieurs styles :

```jsx id="9w7d1w"
style={[style1, style2]}
```

---

# Ici

On combine :

* le style dynamique
* le style général de la carte

---

# Style dynamique

```jsx id="9t0mow"
{ elevation: props.elevation }
```

➡ l’ombre dépend de la prop reçue.

---

# Exemple

Si :

```jsx id="6og9ko"
elevation={8}
```

alors :

```jsx id="6zxxsq"
{ elevation: 8 }
```

---

# 6. Cas iOS

```jsx id="yxdeq0"
return (
  <View
```

Si on arrive ici :

* ce n’est PAS Android
* donc c’est iOS

---

# Problème important

iOS ne supporte PAS :

```jsx id="8y7vpa"
elevation
```

---

# iOS utilise d’autres propriétés

* `shadowOpacity`
* `shadowRadius`
* `shadowOffset`

---

# L’algorithme

```jsx id="h75r4q"
{
  shadowOpacity: 0.0015 * props.elevation + 0.18,
  shadowRadius: 0.54 * props.elevation,
  shadowOffset: {
    height: 0.6 * props.elevation,
  },
}
```

---

# But de cet algorithme

Transformer :

```txt id="q2mw6h"
elevation Android
```

en :

```txt id="7eol0v"
ombre iOS
```

---

# Explication des propriétés

---

## shadowOpacity

```jsx id="78tn8q"
shadowOpacity
```

➡ transparence de l’ombre.

Plus la valeur augmente :
➡ plus l’ombre est visible.

---

## shadowRadius

```jsx id="nn5c0l"
shadowRadius
```

➡ flou de l’ombre.

Plus grand :
➡ ombre plus diffuse.

---

## shadowOffset

```jsx id="vqz9zn"
shadowOffset: {
  height: ...
}
```

➡ distance verticale de l’ombre.

---

# Exemple avec elevation = 8

---

## shadowOpacity

```jsx id="ez4ms0"
0.0015 * 8 + 0.18
= 0.192
```

---

## shadowRadius

```jsx id="75rv7u"
0.54 * 8
= 4.32
```

---

## shadowOffset

```jsx id="6grpp2"
0.6 * 8
= 4.8
```

---

# Donc l’ombre devient :

```jsx id="zw2u5n"
{
  shadowOpacity: 0.192,
  shadowRadius: 4.32,
  shadowOffset: {
    height: 4.8
  }
}
```

---

# 7. Les styles

```jsx id="8m9h4j"
const platformCardStyles = StyleSheet.create({
```

---

# container

```jsx id="9q9n8f"
container: {
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'center',
},
```

---

# Explication

## `flex: 1`

Prend toute la hauteur de l’écran.

---

## `justifyContent: 'space-around'`

Espace vertical entre les éléments.

---

## `alignItems: 'center'`

Centre horizontalement.

---

# card

```jsx id="zjlwmx"
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

```jsx id="7r06a0"
Platform.OS === 'android'
  ? '#cf1b1b'
  : '#145374'
```

---

# C’est un opérateur ternaire

Equivalent à :

```jsx id="d9n74u"
if (Platform.OS === 'android') {
  return '#cf1b1b';
} else {
  return '#145374';
}
```

---

# Résultat

| Plateforme | Couleur |
| ---------- | ------- |
| Android    | Rouge   |
| iOS        | Bleu    |

---

# 8. Ce que cet exercice veut vraiment t’apprendre

---

# 1. Les props

```jsx id="4nq4l3"
elevation={8}
```

➡ transmettre des données à un composant.

---

# 2. Le rendu conditionnel

```jsx id="sq09qe"
if (Platform.OS === 'android')
```

➡ afficher du code différent selon la plateforme.

---

# 3. Les styles dynamiques

```jsx id="s1iqp1"
{ elevation: props.elevation }
```

➡ styles calculés avec des variables.

---

# 4. Les différences Android / iOS

Android :

```jsx id="p3rb7x"
elevation
```

iOS :

```jsx id="8wmwqd"
shadowOpacity
shadowRadius
shadowOffset
```

---

# 9. Version simplifiée mentale

Tu peux voir ce composant comme :

```txt id="mqax2z"
SI elevation = 0
    → pas d’ombre

SINON SI Android
    → utiliser elevation

SINON (iOS)
    → calculer une ombre équivalente
```

---

# 10. Ce qu’il faut retenir absolument

## Android

Utilise :

```jsx id="sgjlwm"
elevation
```

---

## iOS

Utilise :

```jsx id="eqo6b8"
shadowOpacity
shadowRadius
shadowOffset
```

---

## Platform.OS

Permet de faire du code spécifique à la plateforme.

---

## style={[...]}

Permet de fusionner plusieurs styles.

---

# Mini résumé ultra simple

```txt id="77jlwm"
Props :
→ données reçues

Platform.OS :
→ détecte Android/iOS

Android :
→ elevation

iOS :
→ shadowOpacity
→ shadowRadius
→ shadowOffset

style={[...]} :
→ combine plusieurs styles
```
