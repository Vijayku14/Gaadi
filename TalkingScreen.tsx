import { Entypo, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TalkingScreen = () => {
  const [callTime, setCallTime] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      {/* Profile & Timer */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.nameText}>Vijay Kumar</Text>
        <Text style={styles.timerText}>{formatTime(callTime)}</Text>
      </View>

      {/* Call Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlIcon}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlIcon}>
          <Feather name="mic-off" size={24} color="black" />
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => router.replace('/RideInProgress')}  // 👈 Navigation
        >
          <Feather name="phone" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlIcon}>
          <Feather name="video" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlIcon}>
          <Entypo name="dots-three-horizontal" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TalkingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  nameText: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '600',
  },
  timerText: {
    marginTop: 5,
    fontSize: 20,
    color: '#444',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 40,
    width: '90%',
    paddingHorizontal: 10,
  },
  controlIcon: {
    backgroundColor: '#fff7d1',
    padding: 15,
    borderRadius: 50,
  },
  callButton: {
    backgroundColor: '#f44336',
    padding: 18,
    borderRadius: 50,
  },
});
