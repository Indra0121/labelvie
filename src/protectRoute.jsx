import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAuth }) => {
  const isAuthenticated = useSelector((state) => state.global.isAuthenticated);

  if (requireAuth && !isAuthenticated) {
    // Si l'utilisateur doit être authentifié mais ne l'est pas, redirige vers /auth
    return <Navigate to="/auth" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    // Si l'utilisateur est authentifié mais tente d'accéder à /auth, redirige vers /dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Affiche le contenu de la route demandée si les conditions sont remplies
  return children;
};

export default ProtectedRoute;
