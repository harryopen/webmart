import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  console.log("token12",token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth-token', token);
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || '/';
      sessionStorage.removeItem('redirectAfterLogin');
      window.location.replace(redirectUrl);
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, token]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-600">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin mb-4"></div>
      <p className="font-semibold text-sm">Completing Google Sign In...</p>
    </div>
  );
}

export default LoginSuccess;
