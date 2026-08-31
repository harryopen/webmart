import React, { useState } from 'react';
import './CSS/LoginSignup.css';

function LoginSignup() {
  const [state, setState] = useState('login');
  const [loading, setLoading] = useState(false);
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
        window.location.replace('/');
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
        window.location.replace('/');
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

      </div>
    </div>
  );
}

export default LoginSignup;

