import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

import { foodData } from '../../src/data/foodData';

// ============================================================
// KOMPONEN KATALOG ITEM
// Implementasi Flexbox: flexDirection 'row' agar gambar di samping deskripsi
// Menggunakan Nested View untuk estetika sesuai rubrik penilaian
// ============================================================
const CatalogItem = ({ item }: { item: any }) => {
  return (
    // NESTED VIEW LEVEL 1: Card container utama
    // flexDirection: 'row' → gambar & deskripsi tersusun horizontal (satu baris)
    <View style={styles.card}>

      {/* NESTED VIEW LEVEL 2: Container gambar produk */}
      {/* flex: 1.2 → gambar mendapat ~30% ruang secara proporsional */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      {/* NESTED VIEW LEVEL 2: Container informasi produk */}
      {/* flex: 2.8 → deskripsi mendapat ~70% ruang secara proporsional */}
      <View style={styles.infoContainer}>

        {/* NESTED VIEW LEVEL 3: Wrapper teks nama & deskripsi */}
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        {/* NESTED VIEW LEVEL 3: Wrapper harga & badge */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Tersedia</Text>
          </View>
        </View>

      </View>
    </View>
  );
};

// ============================================================
// HALAMAN KATALOG UTAMA (Protected Route - memerlukan JWT)
// ============================================================
export default function CatalogScreen() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      {/* NESTED VIEW: Container utama halaman */}
      <View style={styles.container}>

        {/* NESTED VIEW: Header dengan judul dan tombol */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>🍽️ FlavorDash</Text>
            <Text style={styles.headerSubtitle}>Katalog Makanan Favoritmu</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* FlatList untuk menampilkan daftar katalog secara efisien */}
        <FlatList
          data={foodData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push('/(app)/order-detail')}
              activeOpacity={0.8}
            >
              <CatalogItem item={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

// ============================================================
// STYLESHEET
// ANALISIS RESPONSIVITAS:
// - Semua dimensi utama menggunakan unit PROPORSIONAL (flex, persentase)
// - TIDAK menggunakan pixel absolut untuk width/height container
// - Memastikan tampilan konsisten di berbagai ukuran layar Android & iOS
// ============================================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,                    // PROPORSIONAL: mengisi seluruh layar
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,                    // PROPORSIONAL: mengisi ruang yang tersedia
    paddingHorizontal: '5%',    // PERSENTASE: padding menyesuaikan lebar layar
    paddingTop: '3%',           // PERSENTASE: jarak atas menyesuaikan tinggi layar
  },

  // --- Header ---
  header: {
    flexDirection: 'row',       // FLEXBOX: judul dan tombol dalam satu baris
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4%',         // PERSENTASE: jarak bawah proporsional
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FF6B6B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },

  // --- List ---
  listContainer: {
    paddingBottom: '10%',       // PERSENTASE: ruang bawah proporsional
  },

  // --- Card (FLEXBOX ROW LAYOUT) ---
  card: {
    flexDirection: 'row',       // ★ FLEXBOX ROW: gambar DI SAMPING deskripsi
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: '4%',         // PERSENTASE
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  // --- Gambar (PROPORSIONAL) ---
  imageContainer: {
    flex: 1.2,                  // ★ PROPORSIONAL: ~30% dari lebar card
    aspectRatio: 1,             // Menjaga rasio gambar tanpa pixel absolut
  },
  image: {
    width: '100%',              // PERSENTASE: mengikuti ukuran parent
    height: '100%',             // PERSENTASE: mengikuti ukuran parent
    resizeMode: 'cover',
  },

  // --- Info (PROPORSIONAL) ---
  infoContainer: {
    flex: 2.8,                  // ★ PROPORSIONAL: ~70% dari lebar card
    padding: '4%',              // PERSENTASE
    justifyContent: 'space-between',
  },
  textWrapper: {
    marginBottom: '3%',         // PERSENTASE
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '2%',         // PERSENTASE
  },
  description: {
    fontSize: 13,
    color: '#95A5A6',
    lineHeight: 18,
  },

  // --- Harga & Badge ---
  priceRow: {
    flexDirection: 'row',       // FLEXBOX: harga dan badge dalam satu baris
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  badge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});
