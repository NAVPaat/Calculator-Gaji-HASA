// firebase-config.js
// REPLACE the values below with your Firebase project's config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDcCimpduiHdGyEmWHivg2tz_GkEgbnxf8",
  authDomain: "data-staff-6hha55.firebaseapp.com",
  projectId: "data-staff-6hha55",
  storageBucket: "data-staff-6hha55.firebasestorage.app",
  messagingSenderId: "834544418876",
  appId: "1:834544418876:web:71b355bd0f3faf73244339",
};

// initialize (namespaced v8)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
