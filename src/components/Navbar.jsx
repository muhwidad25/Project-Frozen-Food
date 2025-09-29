import React from 'react';

export default function Navbar({ user, onRouteChange, onLogout }) {
  return (
    <header className="nav">
      <div className="brand">Frozen Food Oppa - Sistem Keuangan</div>
      <nav>
        <button onClick={() => onRouteChange('dashboard')}>Dashboard</button>
        <button onClick={() => onRouteChange('input')}>Input Transaksi</button>
        <button onClick={() => onRouteChange('report')}>Laporan</button>
      </nav>
      <div className="user-area">
        {user ? (
          <>
            <span>{user.name} ({user.role})</span>
            <button className="small" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={() => onRouteChange('login')}>Login</button>
        )}
      </div>
    </header>
  );
}