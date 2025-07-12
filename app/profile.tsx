import React, { useState } from 'react';

import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CountryPicker, {
    Country,
    CountryCode,
} from 'react-native-country-picker-modal';
import RNPickerSelect from 'react-native-picker-select';

const CompleteProfile = () => {
  const [countryCode, setCountryCode] = useState<CountryCode>('IN');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Profile</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}></View>
        
      </View>

      <TextInput placeholder="Full Name" style={styles.input} />

      <View style={styles.phoneContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          withCountryNameButton={false}
          onSelect={onSelect}
          containerButtonStyle={styles.countryPicker}
        />
        <Text style={styles.phoneCode}>+91</Text>
        <TextInput
          style={styles.phoneInput}
          keyboardType="phone-pad"
          placeholder="Your mobile number"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="Street" style={styles.input} />

      <RNPickerSelect
        onValueChange={(value) => setCity(value)}
        placeholder={{ label: 'Select City', value: null }}
        style={pickerSelectStyles}
        items={[
          { label: 'Delhi', value: 'delhi' },
          { label: 'Mumbai', value: 'mumbai' },
        ]}
      />

      <RNPickerSelect
        onValueChange={(value) => setDistrict(value)}
        placeholder={{ label: 'Select District', value: null }}
        style={pickerSelectStyles}
        items={[
          { label: 'North', value: 'north' },
          { label: 'South', value: 'south' },
        ]}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelBtn}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#d3d3d3',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 110,
    backgroundColor: '#F4B200',
    padding: 6,
    borderRadius: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginVertical: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  countryPicker: {
    marginRight: 5,
  },
  phoneCode: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    height: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#F4B200',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtn: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#F4B200',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#F4B200',
    fontWeight: 'bold',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
    color: 'black',
  },
};

export default CompleteProfile;
