import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const transportOptions = [
  { id: '1', label: 'Car', image: require('../assets/car.png') },
  { id: '2', label: 'Auto', image: require('../assets/auto.png') },
  { id: '3', label: 'Heavy Vehicle', image: require('../assets/truck.png') },
  { id: '4', label: 'Others', image: require('../assets/taxi.png') },
];

const SelectTransport = () => {
  const [selected, setSelected] = useState('Car');

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[
        styles.card,
        selected === item.label && { backgroundColor: '#FFF3C5', borderColor: '#f6b100' },
      ]}
      onPress={() => setSelected(item.label)}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}>Select transport</Text>
      </View>

      <Text style={styles.title}>Select your transport</Text>

      <FlatList
        data={transportOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    width: '48%',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectTransport;
