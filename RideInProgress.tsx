import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { AnimatedRegion, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps';

export default function RideInProgress() {
  const { bookingId } = useLocalSearchParams<{ bookingId?: string }>();
  const router = useRouter();

  const [location, setLocation] = useState({
    latitude: 28.6139,
    longitude: 77.2090,
  });

  const coordinate = useRef(
    new AnimatedRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    })
  ).current;

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLat = location.latitude + (Math.random() * 0.001 - 0.0005);
      const newLng = location.longitude + (Math.random() * 0.001 - 0.0005);
      const newLocation = { latitude: newLat, longitude: newLng };

      setLocation(newLocation);

      (coordinate as any).timing({
        toValue: newLocation,
        duration: 2000,
        useNativeDriver: false,
      }).start();

      mapRef.current?.animateCamera(
        {
          center: newLocation,
          pitch: 45,
          zoom: 16,
        },
        { duration: 2000 }
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <MarkerAnimated coordinate={coordinate as any} title="Your Driver" />
      </MapView>

      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        <Text style={styles.arrivalText}>Your driver is coming in 3:35 min</Text>
        <Text style={styles.bookingId}>Booking ID: {bookingId || 'N/A'}</Text>

        <View style={styles.driverInfo}>
          <Image source={require('../assets/driver.jpg')} style={styles.driverImg} />
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>Bijay Kumar</Text>
            <Text style={styles.subText}>
              <FontAwesome name="map-marker" size={12} /> 800m (5mins away)
            </Text>
            <Text style={styles.subText}>⭐ 4.9 (531 reviews)</Text>
          </View>
          <Image source={require('../assets/mustang.png')} style={styles.carImage} />
        </View>

        <Text style={styles.paymentTitle}>Payment method</Text>
        <Text style={styles.price}>Rs. 220.00</Text>

        <View style={styles.card}>
          <Image source={require('../assets/visa.png')} style={styles.cardIcon} />
          <View>
            <Text>**** **** **** 8970</Text>
            <Text style={styles.expiry}>Expires: 12/26</Text>
          </View>
        </View>

        {/* Pay Now Button */}
        <TouchableOpacity
          style={styles.payNowBtn}
          onPress={() => router.push('/PaymentScreen')}
        >
          <Text style={styles.payNowText}>Pay Now</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => router.push('/CallingScreen')}
          >
            <MaterialIcons name="call" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => router.push('/ChatScreen')}
          >
            <Entypo name="chat" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.circleBtn}
            onPress={() => router.push('/PaymentScreen')}
          >
            <FontAwesome name="money" size={20} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.push('/ReviewModal')}
          >
            <Text style={styles.cancelText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { width: '100%', height: '55%' },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  arrivalText: { textAlign: 'center', fontSize: 16, marginBottom: 5 },
  bookingId: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subText: {
    color: '#666',
    fontSize: 12,
  },
  carImage: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  cardIcon: {
    width: 40,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  expiry: {
    fontSize: 12,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  circleBtn: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 30,
    marginHorizontal: 5,
  },
  cancelBtn: {
    backgroundColor: '#fdbb2d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  cancelText: {
    fontWeight: 'bold',
    color: '#000',
  },
  payNowBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 10,
  },
  payNowText: {
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
