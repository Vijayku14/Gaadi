import { Link } from "expo-router";
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
export default function OtpVerificationScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  // Countdown logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    console.log('OTP Entered:', enteredOtp);
    // Add OTP verification logic here
  };

  const handleResend = () => {
    if (timer === 0) {
      console.log('Resending OTP...');
      setTimer(30);
      // Trigger resend OTP API here
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <TouchableOpacity>
        <Text style={styles.back}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Phone verification</Text>
      <Text style={styles.subtitle}>Enter your OTP code</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => inputs.current[index] = ref}
            style={styles.otpBox}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={text => handleChange(text, index)}
            value={digit}
          />
        ))}
      </View>

      <Text style={styles.resend}>
        {timer > 0 ? (
          `Resend available in ${timer}s`
        ) : (
          <Text onPress={handleResend} style={styles.resendLink}>
            Didn’t receive code? Resend again
          </Text>
        )}
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <Link href="/SelectAddress">Go</Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  back: {
    fontSize: 16,
    color: '#333',
    marginBottom: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  },
  subtitle: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20
  },
  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18
  },
  resend: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 30
  },
  resendLink: {
    color: '#f4aa1e',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#f4aa1e',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
