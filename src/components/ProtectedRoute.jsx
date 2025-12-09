import { Navigate } from 'react-router-dom';
import { useStore } from '../context/store';

export const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/404" replace />;
  }

  return children;
};
