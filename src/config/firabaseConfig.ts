import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "./getEnvironments";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Dev/Prod

const envs = getEnvironments();
//console.log(envs);

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();


const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

 /* const firebaseConfig = {
  apiKey: "AIzaSyAsQ_td4-lHE7Vtm-GhenC7fWsvmFJ8IqI",
  authDomain: "journal-app-f2368.firebaseapp.com",
  projectId: "journal-app-f2368",
  storageBucket: "journal-app-f2368.firebasestorage.app",
  messagingSenderId: "474413740468",
  appId: "1:474413740468:web:9d40874f55849db6d602e1"
};  */

// Testing
/* const firebaseConfig = {
  apiKey: "AIzaSyDg2lyupQ_qNDY33ay4Z-9yCckLoH27Tj8",
  authDomain: "testing-db-75f3a.firebaseapp.com",
  projectId: "testing-db-75f3a",
  storageBucket: "testing-db-75f3a.firebasestorage.app",
  messagingSenderId: "244539407895",
  appId: "1:244539407895:web:1a3cdf96c816d98063e652",
  measurementId: "G-V5R2RJL6CF",
}; */

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirestoreDB = getFirestore(FirebaseApp);
