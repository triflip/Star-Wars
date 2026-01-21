import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetails from './pages/StarshipDetails';
import { WelcomePage } from './pages/WelcomePage';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice'; // Importem login/logout
import { ProtectedRoute } from './components/ProtectedRoute';
import { onAuthStateChanged } from 'firebase/auth'; // Import de Firebase
import { auth } from './firebase/config'; // La teva config

function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="min-h-screen text-zinc-200 selection:bg-yellow-400 bg-[#0a0a0a]">
      {showHeader && <Header />}
      
      <main className={`${showHeader ? 'max-w-7xl mx-auto pb-20 px-4' : ''}`}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/starships" element={<ProtectedRoute><StarshipsPage /></ProtectedRoute>} />
          <Route path="/starships/:id" element={<ProtectedRoute><StarshipDetails /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Escoltador de Firebase: La Font de la Veritat
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Si hi ha usuari a Firebase, l'injectem a Redux
        dispatch(login({ 
          email: firebaseUser.email, 
          name: firebaseUser.email.split('@')[0] 
        }));
      } else {
        // Si no, netegem Redux
        dispatch(logout());
      }
      
      // Ja hem comprovat l'estat, podem renderitzar l'app
      setInitializing(false);
    });

    return () => unsubscribe(); // Netegem l'escoltador
  }, [dispatch]);

  // Si l'app s'està iniciant (comprovant Firebase), mostrem pantalla de càrrega
  if (initializing) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <div className="text-yellow-500 tracking-[0.5em] uppercase text-xs animate-pulse font-bold">
          Transmitting Data...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;