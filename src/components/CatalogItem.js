import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CatalogItem = ({ item }) => {
  return (
    <View style={styles.card}>
      {/* Container Gambar */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      
      {/* Container Teks/Deskripsi */}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Layout menggunakan Flexbox (row)
  card: {
    flexDirection: 'row', 
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: '4%',
    overflow: 'hidden', // Agar gambar tidak keluar dari border radius
    // Efek estetika (Shadow)
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  
  // Responsivitas proporsional dengan Flex (Tidak pakai pixel mutlak)
  imageContainer: {
    flex: 1.2, // Mengambil porsi 1.2 dari total ruang (gambar)
    aspectRatio: 1, // Menjaga gambar tetap berbentuk rasio kotak
  },
  image: {
    width: '100%', 
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 2.8, // Mengambil porsi 2.8 dari total ruang (deskripsi)
    padding: '4%',
    justifyContent: 'center', // Konten teks berada di tengah secara vertikal
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: '2%',
  },
  description: {
    fontSize: 13,
    color: '#95A5A6',
    marginBottom: '4%',
    lineHeight: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
});

export default CatalogItem;
