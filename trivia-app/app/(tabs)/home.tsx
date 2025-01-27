import { StyleSheet, Image, Platform, View, Text } from 'react-native';


export default function HomeScreen() {
  return (
     <View>
          <Text>Home</Text>
          <Image
            source={require('../../assets/images/quiz/home.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
   )};
