import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
export default function PaymentScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Payment</Text>

      {/* Vehicle Summary */}
      <View style={styles.cardBox}>
        <View style={styles.cardLeft}>
          <Text style={styles.carName}>Mustang Shelby GT</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="gold" />
            <Text style={styles.ratingText}>4.9 (531 reviews)</Text>
          </View>
        </View>
        <Image source={require('../assets/mustang.png')} style={styles.carImage} />
      </View>

      {/* Charge Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Charge</Text>
        <Link href="/PaymentSuccessModal">Go</Link>
        <View style={styles.row}>
          <Text>Mustang/per hours</Text>
          <Text>Rs200</Text>
        </View>
        <View style={styles.row}>
          <Text>Vat (5%)</Text>
          <Text>Rs20</Text>
        </View>
        <View style={styles.row}>
          <Text>Promo Code</Text>
          <Text>-Rs5</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>Rs215</Text>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <View style={styles.paymentHeader}>
          <Text style={styles.sectionTitle}>Select payment method</Text>
          <TouchableOpacity><Text style={styles.viewAll}>View All</Text></TouchableOpacity>
        </View>

        {[
          { logo: require('../assets/visa.png'), masked: '**** **** **** 8970', expiry: '12/26', selected: true },
          { logo: require('../assets/mastercard.png'), masked: '**** **** **** 8970', expiry: '12/26' },
          { logo: require('../assets/paypal.png'), masked: 'mailaddress@mail.com', expiry: '12/26' },
          { logo: require('../assets/cash.png'), masked: 'Cash', expiry: '' },
        ].map((item, i) => (
          <View key={i} style={[styles.paymentMethod, item.selected && styles.selectedMethod]}>
            <Image source={item.logo} style={styles.logo} resizeMode="contain" />
            <View>
              <Text>{item.masked}</Text>
              {item.expiry !== '' && <Text style={styles.expiry}>Expires: {item.expiry}</Text>}
            </View>
          </View>
        ))}
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmText}>Confirm Ride</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    marginLeft: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  cardBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fffbe7',
    padding: 15,
    borderRadius: 10,
    borderColor: '#f9d98b',
    borderWidth: 1,
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 6,
    color: 'gray',
  },
  carImage: {
    width: 80,
    height: 50,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  totalRow: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 8,
  },
  totalText: {
    fontWeight: '700',
    fontSize: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    color: '#f5b000',
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9e5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderColor: '#eee',
    borderWidth: 1,
    gap: 12,
  },
  selectedMethod: {
    borderColor: '#f5b000',
    borderWidth: 2,
  },
  logo: {
    width: 40,
    height: 30,
  },
  expiry: {
    color: 'gray',
    fontSize: 12,
  },
  confirmBtn: {
    marginTop: 30,
    backgroundColor: '#f5b000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
