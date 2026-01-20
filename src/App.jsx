import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetails from './pages/StarshipDetails';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Només arrencar l'App, mirem si l'usuari ja estava loguejat anteriorment
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
     
      <div className="min-h-screen text-zinc-200 selection:bg-yellow-400">
        <Header />
        <main className="max-w-7xl mx-auto pb-20 px-4">
          <Routes>
            <Route path="/" element={<StarshipsPage />} />
            <Route path="/starships/:id" element={<StarshipDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;