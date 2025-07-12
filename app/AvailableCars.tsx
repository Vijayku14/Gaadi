import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const cars = [
  {
    id: '1',
    name: 'BMW Cabrio',
    type: 'Automatic',
    seats: '3 seats',
    fuel: 'Octane',
    distance: '800m',
    time: '5mins',
    image: require('../assets/bmw-cabrio.png'),
  },
  {
    id: '2',
    name: 'Mustang Shelby GT',
    type: 'Automatic',
    seats: '3 seats',
    fuel: 'Octane',
    distance: '800m',
    time: '5mins',
    image: require('../assets/mustang.png'),
  },
  {
    id: '3',
    name: 'BMW 18',
    type: 'Automatic',
    seats: '3 seats',
    fuel: 'Octane',
    distance: '800m',
    time: '5mins',
    image: require('../assets/bmw-red.png'),
  },
  {
    id: '4',
    name: 'Jaguar Silber',
    type: 'Automatic',
    seats: '3 seats',
    fuel: 'Octane',
    distance: '800m',
    time: '5mins',
    image: require('../assets/jaguar.png'),
  },
];

const AvailableCars = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.carName}>{item.name}</Text>
          <Text style={styles.carSpecs}>
            {item.type} | {item.seats} | {item.fuel}
          </Text>
          <Text style={styles.carDistance}>
            <Ionicons name="location-sharp" size={14} color="#000" /> {item.distance} ({item.time} away)
          </Text>
        </View>
        <Image source={item.image} style={styles.carImage} resizeMode="contain" />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View car list</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow}>
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Available cars for ride</Text>
      <Text style={styles.subTitle}>5 cars found</Text>

      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: '#f6b100',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carSpecs: {
    color: 'gray',
    fontSize: 13,
    marginVertical: 2,
  },
  carDistance: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  carImage: {
    width: 100,
    height: 60,
  },
  button: {
    borderWidth: 1,
    borderColor: '#f6b100',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
    backgroundColor: '#fff9e6',
  },
  buttonText: {
    color: '#f6b100',
    fontWeight: 'bold',
  },
});

export default AvailableCars;
