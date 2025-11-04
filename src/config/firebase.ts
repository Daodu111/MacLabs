import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from 'firebase/storage'

// Firebase configuration
// You'll need to replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDapRSmQtBhOEGJCHfrg-XGHhLrJhQoPTk",
  authDomain: "maclabs-blog.firebaseapp.com",
  projectId: "maclabs-blog",
  storageBucket: "maclabs-blog.firebasestorage.app",
  messagingSenderId: "291453247761",
  appId: "1:291453247761:web:bd1d6e397217d96a6f6cb0",
  measurementId: "G-E32WFEZ64K"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Testing Firebase connection...')
    console.log('Firebase App:', app.name)
    console.log('Firestore DB:', db.app.name)
    console.log('Auth:', auth.app.name)
    console.log('✅ Firebase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Firebase connection failed:', error)
    return false
  }
}

export default app
