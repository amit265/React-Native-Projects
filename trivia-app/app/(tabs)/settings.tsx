import { View, StatusBar, ScrollView } from 'react-native';
import Header from 'app/components/Header';
import Category from 'app/components/Categories';
import Setting from 'app/components/Setting';

export default function Settings() {
  return (
    <View className="flex-1 bg-[#132f94] mt-8">
      {/* Ensure the status bar is visible */}
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="pt-2">
          <Setting />
        </View>
      </ScrollView>
    </View>
  );
}
