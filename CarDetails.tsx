import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Link } from "expo-router";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const CarDetails = () => {
  const handleBooking = () => {
    Alert.alert('Booking Confirmed', 'Your car has been booked successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.back}>← Back</Text>

      {/* Car Name & Rating */}
      <Text style={styles.carName}>Jaguar</Text>
      <View style={styles.rating}>
        <AntDesign name="star" size={16} color="#FFD700" />
        <Text style={styles.ratingText}>4.9 (531 reviews)</Text>
      </View>

     

      {/* Specifications */}
      <Text style={styles.sectionTitle}>Specifications</Text>
      <View style={styles.specRow}>
        <SpecBox icon="engine" label="Max. power" value="2500hp" />
        <SpecBox icon="fuel" label="Fuel" value="10km per litre" />
      </View>
      <View style={styles.specRow}>
        <SpecBox icon="speedometer" label="Max. speed" value="230kph" />
        <SpecBox icon="timer-sand" label="0–60mph" value="2.5sec" />
      </View>

      {/* Car Features */}
      <Text style={styles.sectionTitle}>Car features</Text>
      <FeatureBox label="Model" value="GT5000" />
      <FeatureBox label="Capacity" value="760hp" />
      <FeatureBox label="Color" value="Red" />
      <FeatureBox label="Fuel type" value="Octane" />
      <FeatureBox label="Gear type" value="Automatic" />
      <Link href="/BookingSummary">Go</Link>

      {/* Booking Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SpecBox = ({ icon, label, value }: any) => (
  <View style={styles.specBox}>
    <MaterialCommunityIcons name={icon} size={22} color="#000" />
    <Text style={styles.specLabel}>{label}</Text>
    <Text style={styles.specValue}>{value}</Text>
  </View>
);

const FeatureBox = ({ label, value }: any) => (
  <View style={styles.featureBox}>
    <Text style={styles.featureLabel}>{label}</Text>
    <Text style={styles.featureValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  back: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  ratingText: {
    marginLeft: 4,
    color: '#888',
  },
  carImage: {
    width: '100%',
    height: 180,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  specBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#FFBF00',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 12,
    color: '#555',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  featureBox: {
    borderWidth: 1,
    borderColor: '#FFBF00',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  featureLabel: {
    color: '#666',
  },
  featureValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#F5A623',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CarDetails;
