import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const fadeTaglineAnim = useRef(new Animated.Value(0)).current;
  const fadeSubTaglineAnim = useRef(new Animated.Value(0)).current;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.spring(translateYAnim, {
        toValue: -80,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeSubTaglineAnim, {
      toValue: 1,
      duration: 1000,
      delay: 1400,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeTaglineAnim, {
      toValue: 1,
      duration: 1200,
      delay: 1800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/OnboardingScreen');
    }, 6500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background animation */}
      <LottieView
        source={require('../assets/Red Car Drive.json')}
        autoPlay
        loop
        style={StyleSheet.absoluteFill}
      />

      {/* Logo */}
      <Animated.Image
        source={require('../assets/logo.png')}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: translateYAnim },
              { scale: scaleAnim },
              { rotate },
            ],
          },
        ]}
      />

      {/* Loader */}
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />

      {/* Tagline (positioned near bottom, below animation) */}
      <Animated.Text style={[styles.subTagline, { opacity: fadeSubTaglineAnim }]}>
        Drive the Distance, Save the Cost!
      </Animated.Text>

      {/* Made by text at the very bottom */}
      <Animated.Text style={[styles.tagline, { opacity: fadeTaglineAnim }]}>
        Made by Bijay Kumar Bibhar
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  loader: {
    marginTop: 30,
  },
  subTagline: {
    position: 'absolute',
    bottom: 80, // ⬅️ positioned above the "Made by" text
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  tagline: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
});
