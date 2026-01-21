import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    // Si no està loguejat, el redirigim a la Welcome Page
    return <Navigate to="/" replace />;
  }

  // Si està loguejat, deixem que vegi el contingut (les rutes filles)
  return children;
};