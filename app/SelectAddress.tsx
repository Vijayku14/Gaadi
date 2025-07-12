import { Entypo, FontAwesome } from '@expo/vector-icons';
import { Link } from "expo-router";
import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const recentPlaces = [
  {
    id: '1',
    label: 'Office',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    distance: '2.7km',
  },
  {
    id: '2',
    label: 'Coffee shop',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    distance: '1.1km',
  },
  {
    id: '3',
    label: 'Shopping center',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    distance: '4.9km',
  },
  {
    id: '4',
    label: 'Shopping mall',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    distance: '4.0km',
  },
];

const SelectAddress = () => {
  const renderItem = ({ item }: { item: typeof recentPlaces[0] }) => (
    <View style={styles.recentItem}>
      <FontAwesome name="map-marker" size={18} color="gray" style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.placeLabel}>{item.label}</Text>
        <Text style={styles.placeAddress}>{item.address}</Text>
      </View>
      <Text style={styles.placeDistance}>{item.distance}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Drag Handle */}
      <View style={styles.dragHandle} />

      <TouchableOpacity style={styles.closeButton}>
        <Entypo name="cross" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Select address</Text>

      {/* From Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={16} color="gray" style={styles.icon} />
        <TextInput placeholder="Form" style={styles.input} />
      </View>

      {/* To Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="map-marker" size={16} color="gray" style={styles.icon} />
        <TextInput placeholder="To" style={styles.input} />
      </View>

      <Text style={styles.recentTitle}>Recent places</Text>
      <Link href="/SelectAddressConfirm">Go</Link>

      <FlatList
        data={recentPlaces}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  placeLabel: {
    fontWeight: '600',
    fontSize: 15,
  },
  placeAddress: {
    color: 'gray',
    fontSize: 13,
  },
  placeDistance: {
    fontWeight: '600',
    fontSize: 13,
    color: '#000',
  },
});

export default SelectAddress;
