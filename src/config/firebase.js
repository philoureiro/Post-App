import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyCAPK00iBmzniOm8jrpsiSez0LgO7OfA7w",
    authDomain: "posts-f2913.firebaseapp.com",
    databaseURL: "https://posts-f2913.firebaseio.com",
    projectId: "posts-f2913",
    storageBucket: "posts-f2913.appspot.com",
    messagingSenderId: "456704687072",
    appId: "1:456704687072:web:ae2890469fed101ce78985",
    measurementId: "G-PL16NKT3BD"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
  //firebase.analytics();