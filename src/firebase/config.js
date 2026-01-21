import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Imprescindible per al Login/Registre

const firebaseConfig = {
  apiKey: "AIzaSyCPfwP04EGaEh5Mh6SFc_FDbieh2BpKURg",
  authDomain: "star-wars-star-ships.firebaseapp.com",
  projectId: "star-wars-star-ships",
  storageBucket: "star-wars-star-ships.firebasestorage.app",
  messagingSenderId: "625287019818",
  appId: "1:625287019818:web:797dcffb25b6ae916bb253",
  measurementId: "G-35R4CRPLQY"
};

// Inicialitzem l'App
const app = initializeApp(firebaseConfig);

// Exportem el servei d'autenticació
export const auth = getAuth(app);