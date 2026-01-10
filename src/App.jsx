import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StarshipsPage from './pages/StarshipsPage';
import StarshipDetails from './pages/StarshipDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        {/*  Header més endavant */}
        <Routes>
          <Route path="/" element={<StarshipsPage />} />
          {/* Ruta per al detall (la farem en el següent pas) */}
          <Route path="/starships/:id" element={<StarshipDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;