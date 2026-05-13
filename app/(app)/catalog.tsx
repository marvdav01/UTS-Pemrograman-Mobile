import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

// API Base URL (IP Address komputer lokal dan port server PHP)
const API_BASE_URL = 'http://192.168.101.4:8000';

// ============================================================
// KOMPONEN KATALOG ITEM
// ============================================================
const CatalogItem = ({ item }: { item: any }) => {
  // Gambar placeholder jika URL kosong atau gagal dimuat
  const placeholderImage = 'https://via.placeholder.com/150?text=No+Image';
  const imageUrl = item.image_url ? item.image_url : placeholderImage;

  // Format harga ke Rupiah
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(item.price));

  return (
    // NESTED VIEW LEVEL 1: Card container utama
    <View style={styles.card}>

      {/* NESTED VIEW LEVEL 2: Container gambar produk */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          onError={(e) => console.log('Gagal memuat gambar untuk:', item.name, e.nativeEvent.error)}
        />
      </View>

      {/* NESTED VIEW LEVEL 2: Container informasi produk */}
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
          <Text style={styles.price}>{formattedPrice}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category || 'Tersedia'}</Text>
          </View>
        </View>

      </View>
    </View>
  );
};

// ============================================================
// HALAMAN KATALOG UTAMA
// ============================================================
export default function CatalogScreen() {
  const { logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products.php`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Gagal mengambil data produk:', error);
      alert('Gagal mengambil data dari server');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item: any) => 
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={{ marginTop: 10, color: '#7F8C8D' }}>Memuat Katalog...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />

      {/* NESTED VIEW: Container utama halaman */}
      <View style={styles.container}>

        {/* Header dengan judul dan tombol */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>🍽️ FlavorDash</Text>
            <Text style={styles.headerSubtitle}>Katalog Makanan Favoritmu</Text>
          </View>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari menu favoritmu..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* FlatList untuk menampilkan daftar katalog */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: '/(app)/order-detail',
                params: { 
                  name: item.name,
                  price: item.price,
                  image_url: item.image_url,
                  description: item.description,
                  category: item.category
                }
              })}
              activeOpacity={0.8}
            >
              <CatalogItem item={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>Menu tidak ditemukan 😕</Text>
            </View>
          }
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

  // --- Search Bar ---
  searchContainer: {
    marginBottom: '5%',
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 15,
    color: '#2C3E50',
    borderWidth: 1,
    borderColor: '#E0E6ED',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  // --- Empty State ---
  emptyState: {
    alignItems: 'center',
    marginTop: '20%',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
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
