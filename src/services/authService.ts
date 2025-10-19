import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth'
import { auth } from '../config/firebase'

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
}

class AuthService {
  private currentUser: AuthUser | null = null

  constructor() {
    // Listen for auth state changes
    onAuthStateChanged(auth, (user) => {
      this.currentUser = user ? {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      } : null
    })
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<AuthUser | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  // Create new admin user
  async createAdmin(email: string, password: string): Promise<AuthUser | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }
    } catch (error) {
      console.error('Error creating admin:', error)
      throw error
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(auth)
      this.currentUser = null
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    return this.currentUser
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null
  }

  // Wait for auth state to be determined
  async waitForAuth(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe()
        resolve(user ? {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        } : null)
      })
    })
  }
}

export const authService = new AuthService()
