import { Redirect } from 'expo-router';

// Halaman index sebagai entry point default
// Mengarahkan pengguna ke halaman login saat pertama kali membuka aplikasi
export default function Index() {
  return <Redirect href="/login" />;
}
