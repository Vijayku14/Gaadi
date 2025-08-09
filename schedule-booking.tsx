import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Vehicle = {
  id: string;
  name: string;
  seats: number;
};

export default function ScheduleBookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const selectedVehicle = params.vehicleName
    ? {
        id: params.vehicleId as string,
        name: params.vehicleName as string,
        seats: Number(params.vehicleSeats),
      }
    : null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Your Ride</Text>

      <TextInput
        placeholder="Pickup Location"
        value={pickupLocation}
        onChangeText={setPickupLocation}
        style={styles.input}
      />
      <TextInput
        placeholder="Drop Location"
        value={dropLocation}
        onChangeText={setDropLocation}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.selector}>
        <Text>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.selector}>
        <Text>Select Time: {time.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}

      {/* 🟡 Centered Select Vehicle Button */}
      <TouchableOpacity
        onPress={() => router.push('/SelectTransport')}
        style={styles.selectVehicleButton}
      >
        <Text style={styles.selectVehicleButtonText}>
          {selectedVehicle ? `Vehicle: ${selectedVehicle.name}` : 'Select Vehicle'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFC800', // ChooseRole screen color
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#222',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 14,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selector: {
    padding: 14,
    backgroundColor: '#fff9c4',
    borderRadius: 8,
    marginBottom: 15,
  },
  selectVehicleButton: {
    marginTop: 25,
    backgroundColor: '#a75f28',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
    elevation: 4,
  },
  selectVehicleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
