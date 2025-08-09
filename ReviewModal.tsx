import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ReviewScreen() {
  const [rating, setRating] = useState(4);
  const [tip, setTip] = useState(2);
  const [feedback, setFeedback] = useState('');

  const tipOptions = [1, 2, 5, 10, 20];
  const router = useRouter();

  const handleSubmit = () => {
    Alert.alert("Thank you!", "Thank you for your kind gesture.", [
      {
        text: "OK",
        onPress: () => router.replace('/'), // You can change this to go elsewhere if needed
      },
    ]);
  };

  const handleCancel = () => {
    router.push('/CancelRideScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
        <Ionicons name="close" size={24} color="gray" />
      </TouchableOpacity>

      {/* Rating Stars */}
      <View style={styles.starRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Ionicons
            key={i}
            name={i <= rating ? 'star' : 'star-outline'}
            size={28}
            color={i <= rating ? '#facc15' : '#d1d5db'}
            onPress={() => setRating(i)}
          />
        ))}
      </View>

      <Text style={styles.title}>Excellent</Text>
      <Text style={styles.subtitle}>You rated Vijay Kumar {rating} star</Text>

      {/* Feedback */}
      <TextInput
        style={styles.input}
        placeholder="Write your feedback"
        placeholderTextColor="#888"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />

      {/* Tip Section */}
      <Text style={styles.tipTitle}>Give some tips to Vijay Kumar</Text>
      <View style={styles.tipRow}>
        {tipOptions.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTip(t)}
            style={[styles.tipButton, tip === t && styles.tipButtonSelected]}
          >
            <Text style={styles.tipText}>Rs{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backIcon: {
    alignSelf: 'flex-end',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 5,
  },
  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    textAlignVertical: 'top',
    height: 80,
    marginBottom: 16,
  },
  tipTitle: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 16,
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  tipButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 50,
    alignItems: 'center',
  },
  tipButtonSelected: {
    borderColor: '#facc15',
    backgroundColor: '#fef9c3',
  },
  tipText: {
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#facc15',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
  },
});
