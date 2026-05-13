import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CatalogItem from '../components/CatalogItem';
import { foodData } from '../data/foodData';

const CatalogScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>FlavorDash</Text>
      <Text style={styles.headerSubtitle}>Katalog Makanan Favoritmu</Text>
      
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatalogItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Responsif
    paddingHorizontal: '5%', // Persentase alih-alih pixel absolut
    paddingTop: '3%',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FF6B6B',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: '6%',
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: '10%',
  },
});

export default CatalogScreen;
