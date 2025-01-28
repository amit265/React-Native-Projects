import Header from 'app/components/Header';
import Userboard from 'app/components/Userboard';
import { View, StatusBar, ScrollView } from 'react-native';


export default function Leaderboard() {
    return (
        <View className="flex-1 bg-[#132f94] mt-8">
            {/* Ensure the status bar is visible */}
            <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>

                <View className="pt-2">
                    <Header />
                </View>

                <View className="">
                    <Userboard />
                </View>


            </ScrollView>
        </View>
    );
}