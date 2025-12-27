import { Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

export default function Layout() {
  const { isSignedIn, isLoaded } = useAuth();

  console.log('Auth State:', {
    isSignedIn: isSignedIn as boolean,
    isLoaded: isLoaded,
  });

  //   TODO: change this to something unique to this application
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={'#0000ff'} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn as boolean}>
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
