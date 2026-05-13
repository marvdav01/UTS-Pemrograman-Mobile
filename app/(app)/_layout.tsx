import { Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function ProtectedLayout() {
  const { isLoading } = useAuth();

  // 2. Middleware/Route Protection
  // Middleware yang me-redirect saat pengguna tidak memiliki akses
  // ditangani oleh useEffect di dalam AuthContext.
  // Selama pengecekan AsyncStorage berlangsung, kita render loading screen.
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  // Jika sudah lolos dari cek autentikasi (karena useEffect di AuthContext
  // akan otomatis redirect ke /login jika tidak ada token),
  // maka kita bisa me-render Stack layout untuk area yang di-protect.
  return <Stack screenOptions={{ headerShown: false }} />;
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
