import { StyleSheet, Image, Platform, View, Text } from 'react-native';


export default function Leaderboard() {
    return (
        <View>
            <Text>Leaderboard</Text>
            <Image
                source={require('../../assets/images/quiz/leaderboard.png')}
                style={{ width: 200, height: 200 }}
            />
        </View>
    )
};
