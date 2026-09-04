import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('auth-token');
  const location = useLocation();

  if (token) {
    // If user is already authenticated and visits /login:
    // 1. Check React Router state (location.state.from)
    // 2. Check sessionStorage last visited path (e.g. /women)
    // 3. Fallback to '/'
    const lastVisited = sessionStorage.getItem('lastVisitedPath');
    const from =
      location.state?.from?.pathname ||
      (typeof location.state?.from === 'string' ? location.state.from : null) ||
      (lastVisited && lastVisited !== '/login' ? lastVisited : null) ||
      '/';

    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
