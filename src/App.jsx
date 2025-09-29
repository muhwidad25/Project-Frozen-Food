import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import ReportView from './components/ReportView';
import { loadUserFromStorage } from './utils/storage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [route, setRoute] = useState('dashboard'); // 'dashboard' | 'input' | 'report' | 'login'

  useEffect(() => {
    const saved = loadUserFromStorage();
    if (saved) {
      setUser(saved);
    } else {
      setRoute('login');
    }
  }, []);

  const handleLogin = (userObj) => {
    setUser(userObj);
    setRoute('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setRoute('login');
    localStorage.removeItem('activeUser'); // simple logout
  };

  return (
    <div className="app">
      <Navbar user={user} onRouteChange={setRoute} onLogout={handleLogout} />
      <main className="main">
        {!user && route === 'login' && <LoginForm onLogin={handleLogin} />}
        {user && route === 'dashboard' && <Dashboard />}
        {user && route === 'input' && <TransactionForm />}
        {user && route === 'report' && <ReportView />}
        {!user && route !== 'login' && (
          <div className="not-auth">Silakan login terlebih dahulu.</div>
        )}
      </main>
    </div>
  );
}
