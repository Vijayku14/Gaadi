import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

enum RideStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Rejected = 'rejected',
}

type RideRequest = {
  id: string;
  riderName: string;
  source: string;
  destination: string;
  phone?: string;
  quotation?: string;
  status?: RideStatus;
};

export default function OwnerDashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<RideRequest[]>([]);
  const [profileVisible, setProfileVisible] = useState(false);

  const driverProfile = {
    name: 'Vijay Kumar',
    phone: '9876543210',
    account: '1234567890',
    upi: 'vijay@upi',
  };

  const generateRandomRequests = (): RideRequest[] => {
    const names = ['Amit Kumar', 'Sneha Rani', 'Rahul Verma', 'Anjali Sharma', 'Vivek Gupta'];
    const sources = ['Sector 10, Noida', 'MG Road, Bangalore', 'Andheri, Mumbai', 'Park Street, Kolkata'];
    const destinations = ['Connaught Place, Delhi', 'Electronic City', 'Marine Drive', 'Howrah Bridge'];

    return Array.from({ length: 3 }).map(() => ({
      id: Math.random().toString(),
      riderName: names[Math.floor(Math.random() * names.length)],
      source: sources[Math.floor(Math.random() * sources.length)],
      destination: destinations[Math.floor(Math.random() * destinations.length)],
      phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
    }));
  };

  const refreshRequests = () => {
    const newRequests = generateRandomRequests();
    setRequests(newRequests);
    Haptics.selectionAsync();
  };

  const handleQuote = async (id: string, quotation: string) => {
    if (!quotation) {
      Alert.alert('Missing Input', 'Please enter a quotation amount.');
      return;
    }

    const updated = requests.map((req) =>
      req.id === id ? { ...req, quotation, status: RideStatus.Pending } : req
    );
    setRequests(updated);

    Alert.alert('Quotation submitted!', 'Waiting for customer confirmation...');

    setTimeout(async () => {
      const isAccepted = Math.random() > 0.5;
      const updatedRequests = updated.map((req) =>
        req.id === id
          ? { ...req, status: isAccepted ? RideStatus.Accepted : RideStatus.Rejected }
          : req
      );

      setRequests(updatedRequests);
      const matchedReq = updatedRequests.find((r) => r.id === id);

      if (matchedReq?.status === RideStatus.Accepted) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        Alert.alert(
          'Ride Accepted ✅',
          `Customer ${matchedReq.riderName} (${matchedReq.phone}) has accepted your quotation.`
        );
      } else {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(
          'Ride Rejected ❌',
          `Customer ${matchedReq?.riderName} has rejected your quotation.`
        );
      }
    }, 5000);
  };

  const openWhatsApp = (phone: string) => {
    const phoneNumber = phone.startsWith('+91') ? phone : `+91${phone}`;
    const url =
      Platform.OS === 'ios'
        ? `whatsapp://send?phone=${phoneNumber}`
        : `https://wa.me/${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'WhatsApp is not installed on this device.');
        }
      })
      .catch((err) => console.error('WhatsApp error:', err));
  };

  const renderRequest = ({ item }: { item: RideRequest }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Rider: {item.riderName}</Text>
      <Text>From: {item.source}</Text>
      <Text>To: {item.destination}</Text>

      <TextInput
        placeholder="Enter your quotation (₹)"
        keyboardType="numeric"
        value={item.quotation || ''}
        onChangeText={(text) => {
          const updated = requests.map((req) =>
            req.id === item.id ? { ...req, quotation: text } : req
          );
          setRequests(updated);
        }}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleQuote(item.id, item.quotation || '')}
      >
        <Text style={styles.buttonText}>Submit Quotation</Text>
      </TouchableOpacity>

      {item.status && (
        <View style={styles.statusRow}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>Status: {item.status}</Text>
          {item.status === RideStatus.Accepted && item.phone && (
            <View style={styles.iconGroup}>
              <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.phone}`)} style={styles.iconBtn}>
                <Ionicons name="call" size={24} color="#27ae60" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openWhatsApp(item.phone!)} style={styles.iconBtn}>
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );

  const getStatusColor = (status: RideStatus) => {
    switch (status) {
      case RideStatus.Accepted:
        return 'green';
      case RideStatus.Rejected:
        return 'red';
      case RideStatus.Pending:
        return '#888';
      default:
        return '#000';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Owner Dashboard</Text>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={refreshRequests} style={{ marginRight: 15 }}>
            <Ionicons name="refresh" size={28} color="#27ae60" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setProfileVisible(true)} style={{ marginRight: 15 }}>
            <Ionicons name="person-circle-outline" size={30} color="#8e44ad" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/')}>
            <Ionicons name="home" size={28} color="#3498db" />
          </TouchableOpacity>
        </View>
      </View>

      {requests.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, color: '#aaa' }}>
          No requests yet. Tap refresh 🔄
        </Text>
      ) : (
        <FlatList data={requests} keyExtractor={(item) => item.id} renderItem={renderRequest} />
      )}

      {/* Profile Bottom Modal */}
      <Modal
        visible={profileVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setProfileVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Driver Profile</Text>
            <Text>Name: {driverProfile.name}</Text>
            <Text>Phone: {driverProfile.phone}</Text>
            <Text>Account No: {driverProfile.account}</Text>
            <Text>UPI ID: {driverProfile.upi}</Text>
            <Text style={{ marginTop: 10 }}>Scan to Pay:</Text>
            <View style={{ marginTop: 10 }}>
              <QRCode
                value={`upi://pay?pa=${driverProfile.upi}&pn=${driverProfile.name}&cu=INR`}
                size={150}
              />
            </View>
            <TouchableOpacity onPress={() => setProfileVisible(false)} style={styles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  iconGroup: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconBtn: {
    marginLeft: 10,
  },
  statusText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
