import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <CustomBox color="blue" />
            <CustomBox color="gray" />
            <CustomBox color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // On change l'axe principal
        flex: 1, // Dit à la boite de prendre 1/1 * 100 % (car seul enfant) de l'espace de l'axe principal (horizontal donc width)
    },
});

function CustomBox(props : any) {
    const [flexSize, setFlexSize] = React.useState(1);

    return (
        <View
            style={{
                flex: flexSize,
                backgroundColor: props.color,
            }}>
            <TextInput
                onChangeText={(value) => setFlexSize(Number(value !== '' ? value : 1))}
                value={flexSize}
            />
        </View>
    );
}