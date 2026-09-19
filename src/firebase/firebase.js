import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAQBXl49AU1-J4x2s0KDA1kHxwpDrbFtns",
    authDomain: "ef-react-jessica-cruzat.firebaseapp.com",
    projectId: "ef-react-jessica-cruzat",
    storageBucket: "ef-react-jessica-cruzat.firebasestorage.app",
    messagingSenderId: "1030108335028",
    appId: "1:1030108335028:web:2b17aaf3ed72d695ba40e1"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { app, db, auth, storage }