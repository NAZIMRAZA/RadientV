
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD-a8eacOeJrOk68MeKSxGM0NoNbRlfeoE",
  authDomain: "sign-up-or-login-223f3.firebaseapp.com",
  projectId: "sign-up-or-login-223f3",
  storageBucket: "sign-up-or-login-223f3.firebasestorage.app",
  messagingSenderId: "1048973041405",
  appId: "1:1048973041405:web:0902f8d7c50288a4fe6894",
  measurementId: "G-2JFQFK4XJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);
