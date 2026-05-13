import { Slot } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout() {
  return (
    // Membungkus seluruh aplikasi dengan AuthProvider
    // agar context auth (termasuk pengecekan middleware rute) tersedia di mana saja
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
