import { useClerk } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Use `useClerk()` to access the `signOut()` function

export default function Home() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(app)/(auth)/welcome');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4">
        <TouchableOpacity
          onPress={handleSignOut}
          className="h-10 w-10 items-center justify-center rounded-full bg-gray-200">
          <Ionicons name="person" size={20} color="#1A1A1A" />
        </TouchableOpacity>

        <Text className="text-2xl font-bold text-[#1A1A1A]">Run</Text>

        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View className="relative h-full flex-1">
        {/* TODO: Map View Container */}

        {/* Controls Container */}
        <View className="absolute bottom-6 left-0 right-0 z-30">
          <View className="flex-row items-center justify-center">
            {/* Settings Button */}
            <TouchableOpacity
              className="mr-4 h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <Ionicons name="settings-outline" size={24} color="#1A1A1A" />
            </TouchableOpacity>

            {/* START Button */}
            <View className="items-center">
              <TouchableOpacity
                className="h-40 w-40 items-center justify-center rounded-full bg-[#FF6B35] shadow-lg"
                style={{
                  shadowColor: '#FF6B35',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                }}>
                <Text className="text-3xl font-bold tracking-wider text-white">START</Text>
              </TouchableOpacity>
            </View>

            {/* Music Button */}
            <TouchableOpacity
              className="ml-4 h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <Ionicons name="musical-notes-outline" size={24} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Navigation */}
      {/* <View className="border-t border-gray-200 bg-white pb-2 pt-2">
        <View className="flex-row items-center justify-around px-4">
          Home
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="home-outline" size={24} color="#9CA3AF" />
            <Text className="mt-1 text-xs text-gray-400">Home</Text>
          </TouchableOpacity>

          Plans
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="calendar-outline" size={24} color="#9CA3AF" />
            <Text className="mt-1 text-xs text-gray-400">Plans</Text>
          </TouchableOpacity>

          Run (Active)
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="play" size={24} color="#1A1A1A" />
            <Text className="mt-1 text-xs font-semibold text-[#1A1A1A]">Run</Text>
          </TouchableOpacity>

          Club
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="people-outline" size={24} color="#9CA3AF" />
            <Text className="mt-1 text-xs text-gray-400">Club</Text>
          </TouchableOpacity>

          Activity
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="bar-chart-outline" size={24} color="#9CA3AF" />
            <Text className="mt-1 text-xs text-gray-400">Activity</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </SafeAreaView>
  );
}
