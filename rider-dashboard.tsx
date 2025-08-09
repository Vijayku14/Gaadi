import { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Quotation = {
  id: string;
  ownerName: string;
  amount: string;
  vehicleNo: string;
  vehicleModel: string;
  fuelType: string;
  image: string; // vehicle photo URL or local URI
};

type RideRequest = {
  id: string;
  source: string;
  destination: string;
  quotations: Quotation[];
};

export default function RiderDashboard() {
  const [rideRequest, setRideRequest] = useState<RideRequest>({
    id: 'R123',
    source: 'Sector 62, Noida',
    destination: 'Delhi Airport',
    quotations: [
      {
        id: 'Q1',
        ownerName: 'Ravi Verma',
        amount: '550',
        vehicleNo: 'UP14 AB 1234',
        vehicleModel: 'Maruti Swift',
        fuelType: 'Petrol',
        image: 'https://i.imgur.com/f8Qx6Uk.png',
      },
      {
        id: 'Q2',
        ownerName: 'Neha Singh',
        amount: '480',
        vehicleNo: 'DL10 CD 9876',
        vehicleModel: 'Hyundai Venue',
        fuelType: 'Diesel',
        image: 'https://i.imgur.com/0Xo0k9C.png',
      },
    ],
  });

  const [sortLowestFirst, setSortLowestFirst] = useState(false);

  const sortedQuotations = sortLowestFirst
    ? [...rideRequest.quotations].sort((a, b) => +a.amount - +b.amount)
    : rideRequest.quotations;

  const handleAccept = (quoteId: string) => {
    const quote = rideRequest.quotations.find(q => q.id === quoteId);
    if (quote) {
      Alert.alert(
        'Quotation Accepted',
        `You accepted ${quote.ownerName}'s quote of ₹${quote.amount}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rider Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Your Ride Request</Text>
        <Text>From: {rideRequest.source}</Text>
        <Text>To: {rideRequest.destination}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setSortLowestFirst(!sortLowestFirst)}
        style={styles.filterButton}
      >
        <Text style={styles.filterText}>
          {sortLowestFirst ? 'Show Original Order' : 'Sort by Lowest Price'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={sortedQuotations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.quoteCard}>
            <Text style={styles.ownerName}>{item.ownerName}</Text>
            <Text>Quote: ₹{item.amount}</Text>
            <Text>Vehicle: {item.vehicleModel} ({item.vehicleNo})</Text>
            <Text>Fuel Type: {item.fuelType}</Text>
            <Image source={{ uri: item.image }} style={styles.vehicleImage} />
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={() => handleAccept(item.id)}
            >
              <Text style={styles.buttonText}>Accept Quote</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  filterButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  filterText: { fontSize: 14, fontWeight: 'bold' },
  quoteCard: {
    backgroundColor: '#fff3e6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#f2b203',
    borderWidth: 1,
  },
  ownerName: { fontSize: 16, fontWeight: 'bold' },
  acceptButton: {
    marginTop: 10,
    backgroundColor: '#f39c12',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  vehicleImage: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    marginTop: 10,
    borderRadius: 8,
  },
});
