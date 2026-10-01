import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="container page-msg">Loading…</div>;
  return token ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
