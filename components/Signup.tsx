import React, { useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';
import Button from './Button';

interface SignupProps {
  onSignup: (user: User) => void;
  onNavigate: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    try {
      const newUser = authService.signup(email, password);
      onSignup(newUser);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-800">Create Your Account</h2>
        {error && <p className="text-red-600 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-lg font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 mt-1 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit" size="lg" fullWidth>
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={onNavigate} className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
