// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: 'AIzaSyB-OEKuPnePlEe0w8NaM7MXjy_KO1lrwC8',
  authDomain: 'cos30043-dtask.firebaseapp.com',
  projectId: 'cos30043-dtask',
  storageBucket: 'cos30043-dtask.appspot.com',
  messagingSenderId: '555682040308',
  appId: '1:555682040308:web:3fe6015438928cdd0b91a1',
  measurementId: 'G-P2BD5JC4XT'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const analytics = getAnalytics(app)

export { 
  db 
}