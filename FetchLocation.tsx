import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [region, setRegion] = useState<Region | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to use this feature.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          initialRegion={region}
          showsUserLocation
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
            title="You are here"
            description="Current Location"
          />
        </MapView>
      )}

      {/* Top Left Menu Icon */}
      <TouchableOpacity style={styles.menuIcon}>
        <MaterialIcons name="menu" size={24} color="black" />
      </TouchableOpacity>

      {/* Top Right Icons */}
      <View style={styles.topIcons}>
        <TouchableOpacity style={styles.topBtn}>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBtn}>
          <Ionicons name="notifications-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <View style={styles.searchInputWrapper}>
          <Ionicons name="search" size={18} color="#999" style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Where would you go?"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <Ionicons name="heart-outline" size={18} color="#999" />
        </View>

        <View style={styles.optionTabs}>
          <TouchableOpacity style={[styles.optionButton, styles.activeTab]}>
            <Text style={styles.optionTextActive}>Transport</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Delivery</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.rentalBtn}
          onPress={() => router.push('/AvailableCars')}
        >
          <Text style={styles.rentalText}>Rental</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={20} color="#c47d31" />
        <Ionicons name="heart-outline" size={20} color="#999" />
        <View style={styles.walletIconWrapper}>
          <Ionicons name="wallet" size={24} color="white" />
        </View>
        <Ionicons name="pricetags-outline" size={20} color="#999" />
        <Ionicons name="person-outline" size={20} color="#999" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  menuIcon: {
    position: 'absolute',
    top: 50,
    left: 15,
    backgroundColor: '#ffeeba',
    padding: 8,
    borderRadius: 6,
    zIndex: 10,
  },
  topIcons: {
    position: 'absolute',
    top: 50,
    right: 15,
    flexDirection: 'row',
    zIndex: 10,
  },
  topBtn: {
    backgroundColor: '#ffeeba',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: width * 0.9,
    padding: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  optionTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#f1a12f',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#f1a12f',
  },
  optionText: {
    color: '#f1a12f',
    fontWeight: 'bold',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rentalBtn: {
    marginTop: 12,
    backgroundColor: '#f1a12f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rentalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  walletIconWrapper: {
    backgroundColor: '#c47d31',
    padding: 12,
    borderRadius: 14,
  },
});
