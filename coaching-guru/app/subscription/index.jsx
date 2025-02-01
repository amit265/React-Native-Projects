import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

export default function SubscriptionWall() {

    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState();
  return (
    <View>
        <Text>Subscription wall</Text>
      <Image />
    </View>
  )
}