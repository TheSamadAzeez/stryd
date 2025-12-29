import { useSSO } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useCallback } from 'react';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';

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
      source={require('../../../assets/welcome-background.png')}
      className="flex-1"
      resizeMode="cover"
      imageStyle={{ alignSelf: 'center', top: -200 }}>
      {/* Dark overlay for better text readability */}
      <View className="absolute inset-0 bg-black/40" />

      {/* Logo */}
      <View className="absolute left-8 top-20">
        <Image
          source={require('../../../assets/logo.png')}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View className="flex-1 justify-end px-8 pb-12">
        {/* Welcome Text */}
        <View className="mb-12">
          <Text className="mb-3 text-center text-5xl font-bold text-white">Stryd</Text>
          <Text className="text-center text-lg text-gray-300">
            Your Pace. Our Heartbeat. One Rhythm.
          </Text>
        </View>

        {/* Auth Buttons */}
        <View className="gap-4">
          {/* Google Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleGoogleSignIn}
            className="flex-row items-center justify-center rounded-full bg-white px-6 py-4 active:opacity-80">
            <Ionicons name="logo-google" size={20} color="[#1A1A1A]" />
            <Text className="ml-3 text-base font-semibold text-[#1A1A1A]">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Apple Sign In Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleAppleSignIn}
            className="flex-row items-center justify-center rounded-full bg-[#1A1A1A] px-6 py-4 active:opacity-80">
            <Ionicons name="logo-apple" size={20} color="#FFF" />
            <Text className="ml-3 text-base font-semibold text-white">Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Terms and Privacy */}
        <View className={` ${Platform.OS === 'android' ? 'mb-8 mt-4' : 'mt-8'}`}>
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
