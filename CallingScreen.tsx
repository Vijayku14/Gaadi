import { Entypo, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CallingScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require('../assets/avatar.png')} // Replace with actual avatar
          style={styles.avatar}
        />
        <Text style={styles.callingText}>Calling....</Text>
        <Text style={styles.nameText}>Vijay Kumar</Text>
      </View>

      {/* Control Icons */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlIcon}>
          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlIcon}>
          <Feather name="mic-off" size={24} color="black" />
        </TouchableOpacity>

        {/* 📞 Call Button triggers navigation to TalkingScreen */}
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => router.push('/TalkingScreen')}
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

export default CallingScreen;

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
  callingText: {
    marginTop: 15,
    fontSize: 16,
    color: 'gray',
  },
  nameText: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: '600',
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
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 50,
  },
});
