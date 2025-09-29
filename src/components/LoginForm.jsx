import React, { useState } from 'react';
import { saveUserToStorage } from '../utils/storage';

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // dummy cred: owner / owner123 ; staff / staff123
  const users = [
    { username: 'owner', name: 'Pemilik', role: 'owner', password: 'owner123' },
    { username: 'staff', name: 'Karyawan', role: 'staff', password: 'staff123' }
  ];

  const submit = (e) => {
    e.preventDefault();
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) {
      setError('Username atau password salah');
      return;
    }
    saveUserToStorage(found);
    onLogin(found);
  };

  return (
    <div className="card login-card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Login</button>
      </form>
      <p className="hint">Contoh: owner / owner123  —  staff / staff123</p>
    </div>
  );
}