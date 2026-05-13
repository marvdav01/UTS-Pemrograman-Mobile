import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';

// API Base URL (IP Address komputer lokal dan port server PHP)
const API_BASE_URL = 'http://192.168.101.4:8000';

const loginAPI = async (username: string, password: string): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal login');
    }

    return data.token;
  } catch (error: any) {
    throw new Error(error.message || 'Koneksi ke server gagal');
  }
};

type AuthContextType = {
  userToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // 4. Detail: Memuat token dari AsyncStorage saat aplikasi di-mount
    const loadToken = async () => {
      try {
        // Token JWT disimpan secara lokal menggunakan AsyncStorage
        const token = await AsyncStorage.getItem('jwt_token');
        if (token) {
          // Dalam skenario nyata: Decode JWT di sini dan cek masa kedaluwarsa (exp)
          // Jika masih valid, set state. Jika tidak, hapus token.
          setUserToken(token);
        }
      } catch (e) {
        console.error('Gagal memuat token', e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  // 2. Middleware/Route Protection: Logika untuk melindungi route berbasis kondisi JWT
  useEffect(() => {
    if (isLoading) return; // Tunggu hingga token selesai dicek

    // Cek apakah pengguna sedang berada di grup rute terlindungi yaitu folder (app)
    const inProtectedGroup = segments[0] === '(app)';

    if (!userToken && inProtectedGroup) {
      // Akses ditolak: Jika mencoba masuk 'Detail Pesanan' tanpa JWT, arahkan ke Login
      router.replace('/login');
    } else if (userToken && !inProtectedGroup) {
      // Akses diizinkan: Jika sudah login tapi berada di luar grup (misal di halaman login), arahkan ke (app)
      router.replace('/(app)/catalog');
    }
  }, [userToken, segments, isLoading]);

  const login = async (username: string, password: string) => {
    try {
      const token = await loginAPI(username, password);
      // Simpan JWT di AsyncStorage agar status login bertahan meski aplikasi ditutup
      await AsyncStorage.setItem('jwt_token', token);
      setUserToken(token);
    } catch (error: any) {
      alert('Login Gagal: ' + error.message);
    }
  };

  const logout = async () => {
    // Hapus JWT saat logout
    await AsyncStorage.removeItem('jwt_token');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
