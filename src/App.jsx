import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetails from './pages/StarshipDetails';
import { WelcomePage } from './pages/WelcomePage';
import { Header } from './components/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './features/auth/authSlice';

// 1. Creem un component intern per poder usar useLocation
function Layout() {
  const location = useLocation();
  
  // 2. Definim que si estem a "/", showHeader és fals
  const showHeader = location.pathname !== '/';

  return (
    <div className="min-h-screen text-zinc-200 selection:bg-yellow-400">
      {/* 3. El Header només es renderitza si showHeader és true */}
      {showHeader && <Header />}
      
      <main className={`${showHeader ? 'max-w-7xl mx-auto pb-20 px-4' : ''}`}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/starships" element={<StarshipsPage />} />
          <Route path="/starships/:id" element={<StarshipDetails />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    // 4. El Router envolta el Layout per donar-li el context de les rutes
    <Router>
      <Layout />
    </Router>
  );
}

export default App;