import { Entypo, FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Link } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { height } = Dimensions.get('window');

const recentPlaces = [
  {
    id: '1',
    label: 'Office',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    distance: '1.1km',
    icon: 'building',
  },
];

const SelectAddressConfirm = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const renderItem = ({ item }: any) => (
    <View style={styles.recentItem}>
      <FontAwesome
        name={item.icon}
        size={18}
        color="#A0522D"
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{item.label}</Text>
        <Text style={styles.address}>{item.address}</Text>
      </View>
      <Text style={styles.distance}>{item.distance}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Map Background */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location?.latitude || 20.2961,
          longitude: location?.longitude || 85.8245,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Current Location"
          />
        )}
      </MapView>

      {/* Bottom Sheet */}
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <TouchableOpacity style={styles.closeBtn}>
          <Entypo name="cross" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Select address</Text>

        {/* Current Location */}
        <View style={styles.recentItem}>
          <FontAwesome
            name="map-marker"
            size={18}
            color="red"
            style={{ marginRight: 10 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Current location</Text>
            <Text style={styles.address}>
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </Text>
          </View>
        </View>

        {/* Recent Places */}
        <FlatList
          data={recentPlaces}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
        <Link href="/SelectTransport">Go</Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 10,
    maxHeight: height * 0.45,
    elevation: 10,
  },
  handle: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 15,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
  },
  address: {
    fontSize: 13,
    color: 'gray',
  },
  distance: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  confirmBtn: {
    backgroundColor: '#f6b100',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 15,
  },
  confirmText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SelectAddressConfirm;
