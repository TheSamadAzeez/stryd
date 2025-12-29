import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f8fafc', // slate-50 equivalent
        },
        tabBarActiveTintColor: '#1A1A1A',
        tabBarInactiveTintColor: '#9CA3AF',
        // tabBarActiveBackgroundColor: '#f8fafc',
        // tabBarInactiveBackgroundColor: '#f8fafc',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="play" size={30} color="#1A1A1A" />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
