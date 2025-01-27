import { StyleSheet, Image, Platform, View, Text } from 'react-native';


export default function Settings() {
  return (
    <View>
      <Text>Settings</Text>
      <Image
        source={require('../../assets/images/quiz/setting.png')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  )
};
