import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useSSO } from '@clerk/clerk-expo';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function WelcomeScreen() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleAppleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_apple',
      });

      if (createdSessionId && setActive) {
        setActive({
          session: createdSessionId,
          navigate: () => router.replace('/(app)/(main)'),
        });
      }
    } catch (err: any) {
      console.error('Apple OAuth error:', {
        message: err?.message || 'Unknown error',
        code: err?.code,
        errors: err?.errors,
        fullError: err,
      });
    }
  }, [startSSOFlow, router]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: 'oauth_google',
      });

      if (createdSessionId && setActive) {
        setActive({
          session: createdSessionId,
          navigate: () => router.replace('/(app)/(main)'),
        });
      }
    } catch (err: any) {
      console.error('Google OAuth error:', {
        message: err?.message || 'Unknown error',
        code: err?.code,
        errors: err?.errors,
        fullError: err,
      });
    }
  }, [startSSOFlow, router]);

  return (
    <ImageBackground
      source={require('../../../assets/placeholder-background.png')}
      className="flex-1"
      resizeMode="cover">
      {/* Dark overlay for better text readability */}
      <View className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <View className="flex-1 justify-end px-8 pb-12">
        {/* Animated pattern placeholder - you can replace this with an actual animation */}
        <View className="mb-12 items-center">
          <View className="h-64 w-64 items-center justify-center">
            {/* Placeholder for animated pattern */}
            <View className="h-48 w-48 items-center justify-center rounded-full border-2 border-[#FF6B35]/30">
              <View className="h-32 w-32 items-center justify-center rounded-full border-2 border-[#FF6B35]/50">
                <View className="h-16 w-16 rounded-full bg-[#FF6B35]/70" />
              </View>
            </View>
          </View>
        </View>

        {/* Welcome Text */}
        <View className="mb-12">
          <Text className="mb-3 text-center text-5xl font-bold text-white">Welcome</Text>
          <Text className="text-center text-base text-gray-300">Your journey starts from here</Text>
        </View>

        {/* Auth Buttons */}
        <View className="gap-4">
          {/* Google Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGoogleSignIn}
            className="flex-row items-center justify-center rounded-full bg-white px-6 py-4 active:opacity-80">
            <Ionicons name="logo-google" size={20} color="#000" />
            <Text className="ml-3 text-base font-semibold text-black">Continue with Google</Text>
          </TouchableOpacity>

          {/* Apple Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAppleSignIn}
            className="flex-row items-center justify-center rounded-full bg-[#2D2D2D] px-6 py-4 active:opacity-80">
            <Ionicons name="logo-apple" size={20} color="#FFF" />
            <Text className="ml-3 text-base font-semibold text-white">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy */}
        <View className="mt-8">
          <Text className="text-center text-xs text-gray-400">
            By pressing on &ldquo;Continue with&rdquo; you agree{'\n'}
            to our <Text className="underline">Terms of Service</Text> and{' '}
            <Text className="underline">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}
