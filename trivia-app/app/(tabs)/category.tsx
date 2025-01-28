import Header from 'app/components/Header';
import { View, StatusBar, ScrollView } from 'react-native';
import { Categories } from 'app/components/Categories';


export default function Category() {
  return (
    <View className="flex-1 bg-[#132f94] mt-8">
      {/* Ensure the status bar is visible */}
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
      

        {/* Category Section */}
        <View className="p-2">
          <Categories />
        </View>
      </ScrollView>
    </View>
  );
}