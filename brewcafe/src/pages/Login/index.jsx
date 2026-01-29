import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { Coffee, Mail, Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login'); // login, register, forgot
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      await login(formData.email, formData.password);
      navigate('/');
    } else if (activeTab === 'register') {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-card rounded-2xl p-8 border border-gray-800 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <Coffee className="text-accent" size={32} />
              </div>
              <h1 className="text-2xl font-bold text-secondary mb-2">
                {activeTab === 'login' && 'Welcome Back'}
                {activeTab === 'register' && 'Create Account'}
                {activeTab === 'forgot' && 'Reset Password'}
              </h1>
              <p className="text-gray-400 text-sm">
                {activeTab === 'login' && 'Sign in to access your account and rewards'}
                {activeTab === 'register' && 'Join BrewCafe for exclusive offers'}
                {activeTab === 'forgot' && 'Enter your email to reset your password'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex mb-6 border-b border-gray-800">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors relative
                  ${activeTab === 'login' ? 'text-accent' : 'text-gray-500 hover:text-secondary'}`}
              >
                Login
                {activeTab === 'login' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 pb-3 text-sm font-medium transition-colors relative
                  ${activeTab === 'register' ? 'text-accent' : 'text-gray-500 hover:text-secondary'}`}
              >
                Register
                {activeTab === 'register' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
            </div>

            {/* Forms */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === 'register' && (
                <Input
                  label="Full Name"
                  icon={User}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              )}
              
              <Input
                label="Email Address"
                type="email"
                icon={Mail}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              
              {activeTab !== 'forgot' && (
                <Input
                  label="Password"
                  type="password"
                  icon={Lock}
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              )}
              
              {activeTab === 'register' && (
                <Input
                  label="Confirm Password"
                  type="password"
                  icon={Lock}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              )}

              {activeTab === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-sm text-accent hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Please wait...' : (
                  <>
                    {activeTab === 'login' && 'Sign In'}
                    {activeTab === 'register' && 'Create Account'}
                    {activeTab === 'forgot' && 'Send Reset Link'}
                    <ArrowRight size={18} />
                  </>
                )}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-accent hover:text-accent transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-700 rounded-lg text-gray-300 hover:border-accent hover:text-accent transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;