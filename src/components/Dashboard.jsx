import React, { useEffect, useState } from 'react';

function formatIDR(n) {
  return n.toLocaleString('id-ID', { style:'currency', currency:'IDR' });
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(arr.reverse());
  }, []);

  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'penjualan') acc.sales += t.total;
    else acc.expense += t.total;
    return acc;
  }, { sales:0, expense:0 });

  return (
    <div>
      <div className="card summary">
        <div>
          <h4>Total Penjualan</h4>
          <p className="big">{formatIDR(totals.sales)}</p>
        </div>
        <div>
          <h4>Total Pengeluaran</h4>
          <p className="big">{formatIDR(totals.expense)}</p>
        </div>
        <div>
          <h4>Laba Bersih</h4>
          <p className="big">{formatIDR(totals.sales - totals.expense)}</p>
        </div>
      </div>

      <div className="card">
        <h3>Transaksi Terbaru</h3>
        {transactions.length === 0 && <p>Tidak ada transaksi.</p>}
        {transactions.length > 0 && (
          <table className="table">
            <thead><tr>
              <th>Tanggal</th><th>Jenis</th><th>Produk</th><th>Jumlah</th><th>Total</th>
            </tr></thead>
            <tbody>
              {transactions.slice(0,10).map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td>{t.product}</td>
                  <td>{t.qty}</td>
                  <td>{formatIDR(t.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}