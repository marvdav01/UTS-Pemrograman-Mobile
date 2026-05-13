import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OrderDetailScreen() {
  const { logout, userToken } = useAuth();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Ambil data dari params
  const { name, price, image_url, description, category } = params;

  // Format harga
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(Number(price || 0));

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Tombol Kembali ke Katalog */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>← Kembali ke Katalog</Text>
        </TouchableOpacity>

        <Text style={styles.title}>📋 Detail Pesanan</Text>

        {/* Gambar Produk */}
        <View style={styles.imageCard}>
          <Image source={{ uri: image_url as string }} style={styles.detailImage} />
        </View>

        {/* Info Produk */}
        <View style={styles.card}>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemCategory}>{category}</Text>
          <Text style={styles.itemDescription}>{description}</Text>
        </View>

        {/* Ringkasan Pesanan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ringkasan Pembayaran</Text>
          
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Harga Satuan</Text>
            <Text style={styles.orderValue}>{formattedPrice}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Pajak (10%)</Text>
            <Text style={styles.orderValue}>
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(price || 0) * 0.1)}
            </Text>
          </View>
          <View style={[styles.orderRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.totalLabel}>Total Bayar</Text>
            <Text style={styles.orderPrice}>
               {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(Number(price || 0) * 1.1)}
            </Text>
          </View>
        </View>

        {/* Info Token (Untuk keperluan UTS/Tugas) */}
        <View style={styles.card}>
          <Text style={styles.tokenLabel}>Token JWT Aktif:</Text>
          <Text style={styles.tokenText} numberOfLines={1}>{userToken}</Text>
        </View>

        <TouchableOpacity style={styles.orderButton} onPress={() => alert('Pesanan Berhasil Dibuat!')}>
          <Text style={styles.orderButtonText}>Konfirmasi Pesanan</Text>
        </TouchableOpacity>

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
    marginBottom: '5%',
    textAlign: 'center',
    color: '#2C3E50',
  },
  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: '5%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  itemCategory: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginTop: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 10,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: '5%',
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    marginBottom: '5%',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '4%',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
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
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  tokenLabel: {
    fontSize: 13,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  tokenText: {
    fontSize: 11,
    color: '#95A5A6',
    backgroundColor: '#f0f3f4',
    padding: 10,
    borderRadius: 6,
    fontFamily: 'monospace',
  },
  orderButton: {
    backgroundColor: '#2ecc71',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: '4%',
    elevation: 4,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: '10%',
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
