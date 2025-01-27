import { StyleSheet, Image, Platform, View, Text } from 'react-native';


export default function Profile() {
  return (
     <View>
          <Text>Profile</Text>
          <Image
            source={require('../../assets/images/quiz/single_user.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
   )};
