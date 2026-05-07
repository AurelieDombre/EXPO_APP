/* eslint-disable */
import * as React from 'react';
import { Text, Button, View } from 'react-native';

export default function App() {
    const [showCoucou, setShowCoucou] = React.useState(true);

    return (
        <View>
            <Button title={showCoucou ? "Masquer coucou" : "Afficher coucou"} onPress={() => setShowCoucou((prev) => !prev)} />
            {showCoucou ? <Coucou /> : <Text>Pas coucou</Text>}
        </View>
    );
}

function Coucou() {
    React.useEffect(() => {
        console.log("Je suis apparu")

        return () => {
            console.log('Je vais disparaitre');
        };
    }, []);
    return <Text>Coucou</Text>;
}