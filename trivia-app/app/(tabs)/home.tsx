import { View, StatusBar, ScrollView } from 'react-native';
import Header from 'app/components/Header';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-[#132f94] mt-8">
      {/* Ensure the status bar is visible */}
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="pt-2">
          <Header />
        </View>

        {/* Category Section */}
        <View className="px-2">
        </View>
      </ScrollView>
    </View>
  );
}
