import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const PaymentSuccessModal = ({ visible, onClose, onFeedback }) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Close Icon */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Ionicons name="close" size={24} color="#888" />
          </TouchableOpacity>

          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color="white" />
            </View>
          </View>

          {/* Success Text */}
          <Text style={styles.title}>Payment Success</Text>
          <Text style={styles.description}>
            Your money has been successfully sent to{"\n"}<Text style={{ fontWeight: 'bold' }}>Vijay Kumar</Text>
          </Text>

          {/* Amount */}
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amount}>Rs 215</Text>

          {/* Feedback Prompt */}
          <Text style={styles.feedbackPrompt}>How is your trip?</Text>
          <Text style={styles.feedbackNote}>
            Your feedback will help us to improve your driving experience better
          </Text>

          {/* Feedback Button */}
          <TouchableOpacity style={styles.feedbackBtn} onPress={onFeedback}>
            <Text style={styles.feedbackBtnText}>Please Feedback</Text>
            <Link href="/ReviewModal">Go</Link>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    width: '85%',
    elevation: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconContainer: {
    marginBottom: 15,
  },
  successIcon: {
    backgroundColor: '#a1e7a3',
    borderRadius: 50,
    padding: 18,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  amount: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
  feedbackPrompt: {
    fontSize: 15,
    fontWeight: '600',
  },
  feedbackNote: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginVertical: 8,
  },
  feedbackBtn: {
    backgroundColor: '#f5b000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  feedbackBtnText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default PaymentSuccessModal;