// firebaseConfig.js
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// ✅ Updated Firebase config for your project
const firebaseConfig = {
  apiKey: "AIzaSyCrRgU-4UM1j9BdYP4DCnDZwBjeNFNiNpk",
  authDomain: "gaadi-6d512.firebaseapp.com",
  projectId: "gaadi-6d512",
  storageBucket: "gaadi-6d512.appspot.com", // ✅ Corrected
  messagingSenderId: "269339352710",
  appId: "1:269339352710:web:236ae50d858811689ebb07"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };

