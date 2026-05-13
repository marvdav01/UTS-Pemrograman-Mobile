import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

// ============================================================
// HALAMAN DETAIL PESANAN (Protected Route - dilindungi oleh JWT Middleware)
// Halaman ini hanya bisa diakses jika token JWT valid
// Validasi dilakukan di AuthContext.tsx sebelum halaman ini di-render
// ============================================================
export default function OrderDetailScreen() {
  const { logout, userToken } = useAuth();
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Tombol Kembali ke Katalog */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Kembali ke Katalog</Text>
        </TouchableOpacity>

        <Text style={styles.title}>📋 Detail Pesanan</Text>

        {/* NESTED VIEW: Card status autentikasi */}
        <View style={styles.card}>
          <View style={styles.statusRow}>
            <View style={styles.statusDot} />
            <Text style={styles.status}>Terautentikasi (Protected Route)</Text>
          </View>

          <Text style={styles.label}>Token JWT Anda (disimpan di AsyncStorage):</Text>
          {/* Token JWT yang dibaca dari AsyncStorage melalui AuthContext */}
          <Text style={styles.tokenText}>{userToken}</Text>
        </View>

        {/* NESTED VIEW: Card simulasi pesanan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ringkasan Pesanan</Text>
          
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Item</Text>
            <Text style={styles.orderValue}>Spaghetti Bolognese</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Jumlah</Text>
            <Text style={styles.orderValue}>1x</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Total</Text>
            <Text style={styles.orderPrice}>Rp 45.000</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,                        // PROPORSIONAL
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,                        // PROPORSIONAL
    padding: '5%',                  // PERSENTASE
  },
  backBtn: {
    marginBottom: '4%',             // PERSENTASE
  },
  backBtnText: {
    fontSize: 15,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: '5%',             // PERSENTASE
    textAlign: 'center',
    color: '#2C3E50',
  },
  card: {
    backgroundColor: '#fff',
    padding: '5%',                  // PERSENTASE
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: '5%',             // PERSENTASE
  },
  statusRow: {
    flexDirection: 'row',           // FLEXBOX
    alignItems: 'center',
    marginBottom: '4%',             // PERSENTASE
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
    marginRight: 8,
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  label: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: '2%',             // PERSENTASE
  },
  tokenText: {
    fontSize: 11,
    color: '#95A5A6',
    backgroundColor: '#f0f3f4',
    padding: 10,
    borderRadius: 6,
    fontFamily: 'monospace',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '4%',             // PERSENTASE
  },
  orderRow: {
    flexDirection: 'row',           // FLEXBOX ROW
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3f4',
  },
  orderLabel: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  orderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: '3%',                // PERSENTASE
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
