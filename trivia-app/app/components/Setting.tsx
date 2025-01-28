import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';

const Setting = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState('easy'); // You can later expand this with more options

  const toggleSound = () => setSoundEnabled(previousState => !previousState);
  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);


  return (
    <View className="flex-1 bg-[#132f94]">
        <View className="w-full rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-center text-white p-4">Settings</Text>
        </View>
        <View className='p-4'>

        {/* Sound Toggle */}
        <View className="flex-row justify-between items-center mb-4  bg-white p-2 rounded-lg shadow-md">
          <Text className="text-xl text-gray-800 font-semibold">Sound</Text>
          <Switch
            value={soundEnabled}
            onValueChange={toggleSound}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={soundEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        {/* Notifications Toggle */}
        <View className="flex-row justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-md">
          <Text className="text-xl text-gray-800 font-semibold">Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

      </View>
    </View>
  );
};

export default Setting;
