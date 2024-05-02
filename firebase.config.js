import {getApp, getApps, initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB11Bh2yzSQ8yxo9OjKc6uN4vZAYLwqvHU",
    authDomain: "restaurantapp-b847b.firebaseapp.com",
    databaseURL: "https://restaurantapp-b847b-default-rtdb.firebaseio.com",
    projectId: "restaurantapp-b847b",
    storageBucket: "restaurantapp-b847b.appspot.com",
    messagingSenderId: "252559418040",
    appId: "1:252559418040:web:083b0dfcbdc54f3d734a4d"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, firestore, storage}
