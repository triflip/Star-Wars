import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuthListener } from './hooks/useAuthListener';

// Importa els teus components i pàgines
import { Header } from './components/Header';
import { WelcomePage } from './pages/WelcomePage';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetails from './pages/StarshipDetails';
import { ProtectedRoute } from './components/ProtectedRoute';

// 1. El component Layout gestiona la part visual i el fons negre
function Layout() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="min-h-screen text-zinc-200 selection:bg-yellow-400 bg-black">
      {showHeader && <Header />}
      
      <main className={`${showHeader ? 'max-w-7xl mx-auto pb-20 px-4 pt-8' : ''}`}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/starships" element={<ProtectedRoute><StarshipsPage /></ProtectedRoute>} />
          <Route path="/starships/:id" element={<ProtectedRoute><StarshipDetails /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

// 2. El component App principal
export default function App() {
  const { initializing } = useAuthListener();

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