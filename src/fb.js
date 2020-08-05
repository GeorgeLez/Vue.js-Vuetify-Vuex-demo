import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyAcC1z5tojPDzDyCDXL-WM16N_29KrEY-0",
  authDomain: "first-vuetify-project-22e35.firebaseapp.com",
  databaseURL: "https://first-vuetify-project-22e35.firebaseio.com",
  projectId: "first-vuetify-project-22e35",
  storageBucket: "first-vuetify-project-22e35.appspot.com",
  messagingSenderId: "114505882099",
  appId: "1:114505882099:web:f324e8b9eb8897381e9a86",
  measurementId: "G-K8W5GDP1TS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = () => firebase.firestore();

export const auth = () => firebase.auth();

// export { auth, db };
