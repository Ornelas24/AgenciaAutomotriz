import firebase from 'firebase' 
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA9QqT6GxwFca7M0BV3ZP_qPGLPu0l1hmw",
    authDomain: "agenciaautomotriz-3ebe9.firebaseapp.com",
    projectId: "agenciaautomotriz-3ebe9",
    storageBucket: "gs://agenciaautomotriz-3ebe9.appspot.com",
    messagingSenderId: "165122980949",
    appId: "1:165122980949:web:4dfac3c8f0b209b5a6a8dc"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var storage = firebase.storage();
  const db = firebase.firestore();

  export default {
      firebase,
      db,
    };