import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const cancelReasons = [
  'Waiting for long time',
  'Unable to contact driver',
  'Driver denied to go to destination',
  'Driver denied to come to pickup',
  'Wrong address shown',
  'The price is not reasonable',
];

export default function CancelRideScreen() {
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    const reason = selectedReason || otherReason;
    if (reason.trim()) {
      // Submit the reason logic (if needed)
      router.push('/CancellationSadModal'); // Navigate to Review or any next screen
    } else {
      alert('Please select or write a reason to cancel the ride.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Cancel Ride</Text>
      <Text style={styles.subtitle}>Please select the reason of cancellation</Text>

      <FlatList
        data={cancelReasons}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.reasonBox,
              selectedReason === item && styles.selectedBox,
            ]}
            onPress={() => {
              setSelectedReason(item);
              setOtherReason('');
            }}
          >
            <Ionicons
              name={selectedReason === item ? 'checkbox' : 'square-outline'}
              size={20}
              color={selectedReason === item ? 'green' : '#ccc'}
              style={{ marginRight: 10 }}
            />
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Other"
        placeholderTextColor="#888"
        multiline
        value={otherReason}
        onChangeText={(text) => {
          setOtherReason(text);
          setSelectedReason('');
        }}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 20,
    textAlign: 'center',
  },
  reasonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedBox: {
    borderColor: 'green',
    backgroundColor: '#e8f5e9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    height: 80,
    textAlignVertical: 'top',
    padding: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  submitBtn: {
    backgroundColor: '#fdbb2d',
    paddingVertical: 14,
    borderRadius: 30,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});
