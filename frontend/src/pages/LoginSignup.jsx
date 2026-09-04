import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CSS/LoginSignup.css';

function LoginSignup() {
  const [state, setState] = useState('login');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [data, setData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const changehandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const loginURL = `${import.meta.env.VITE_API_URL}login`;
  const signURL = `${import.meta.env.VITE_API_URL}signup`;

  const login = async () => {
    setLoading(true);
    try {
      const response = await fetch(loginURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responsedata = await response.json();
      if (responsedata.success) {
        localStorage.setItem('auth-token', responsedata.token);
        window.location.replace(from);
      } else {
        alert(responsedata.errors || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      const response = await fetch(signURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responsedata = await response.json();
      if (responsedata.success) {
        localStorage.setItem('auth-token', responsedata.token);
        window.location.replace(from);
      } else {
        alert(responsedata.errors || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-pink-50/30">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 sm:p-10 flex flex-col items-center">
        
        {/* Card Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            {state === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-sm text-slate-500">
            {state === 'login'
              ? 'Enter your credentials to access your account'
              : 'Sign up today for exclusive member offers and fast checkout'}
          </p>
        </div>

        {/* Form Inputs */}
        <div className="w-full space-y-4 mb-6">
          {state === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Full Name</label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={changehandler}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Address</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={changehandler}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={changehandler}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 transition-all"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="w-full flex items-start gap-2.5 mb-6 text-xs text-slate-500">
          <input type="checkbox" id="terms" defaultChecked className="mt-0.5 rounded border-slate-300 text-red-500 focus:ring-red-500" />
          <label htmlFor="terms">
            By continuing, I agree to the <a href="#" className="underline font-semibold text-slate-700">Terms of Use</a> & <a href="#" className="underline font-semibold text-slate-700">Privacy Policy</a>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={() => (state === 'login' ? login() : signup())}
          disabled={loading}
          className="w-full py-4 rounded-full bg-slate-900 hover:bg-red-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {loading ? 'Processing...' : state === 'login' ? 'CONTINUE TO LOGIN' : 'CREATE ACCOUNT'}
        </button>

        {/* Switch State Link */}
        <div className="text-xs text-slate-600 font-medium">
          {state === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setState('signup')}
                className="font-bold text-red-500 hover:underline cursor-pointer ml-1"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setState('login')}
                className="font-bold text-red-500 hover:underline cursor-pointer ml-1"
              >
                Login here
              </button>
            </p>
          )}
        </div>
        <button
  type="button"
  onClick={() => {
    if (from && from !== '/') {
      sessionStorage.setItem('redirectAfterLogin', from);
    }
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8001/';
    const authUrl = `${apiBase.endsWith('/') ? apiBase : apiBase + '/'}auth/google`;
    window.location.href = authUrl;
  }}
  className="w-full py-3.5 px-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-sm active:scale-98"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
  </svg>
  <span>Sign in with Google</span>
</button>

      </div>
    </div>
  );
}

export default LoginSignup;

