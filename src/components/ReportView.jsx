import React, { useEffect, useState } from 'react';

function formatIDR(n) {
  return n.toLocaleString('id-ID', { style:'currency', currency:'IDR' });
}

export default function ReportView() {
  const [transactions, setTransactions] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState(null);

  useEffect(()=> {
    const arr = JSON.parse(localStorage.getItem('transactions') || '[]');
    setTransactions(arr);
  }, []);

  const generate = () => {
    const f = from || '1970-01-01';
    const t = to || '9999-12-31';
    const filtered = transactions.filter(trx => trx.date >= f && trx.date <= t);
    const totals = filtered.reduce((acc, t) => {
      if (t.type === 'penjualan') acc.sales += t.total; else acc.expense += t.total;
      return acc;
    }, { sales:0, expense:0 });
    setReport({ filtered, totals });
  };

  const exportCSV = () => {
    if (!report) return;
    const rows = [['ID','Tanggal','Jenis','Produk','Qty','Harga','Total','Note']];
    report.filtered.forEach(r => rows.push([r.id, r.date, r.type, r.product, r.qty, r.price, r.total, r.note]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${from || 'all'}_${to||'all'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="card">
        <h3>Generate Laporan</h3>
        <div className="form-inline">
          <label>Dari</label>
          <input type="date" value={from} onChange={e=>setFrom(e.target.value)} />
          <label>Sampai</label>
          <input type="date" value={to} onChange={e=>setTo(e.target.value)} />
          <button className="btn" onClick={generate}>Generate</button>
          <button className="btn small" onClick={exportCSV} disabled={!report}>Export CSV</button>
        </div>
      </div>

      {report && (
        <div className="card">
          <h4>Laporan ({report.filtered.length} transaksi)</h4>
          <p>Total Penjualan: {formatIDR(report.totals.sales)}</p>
          <p>Total Pengeluaran: {formatIDR(report.totals.expense)}</p>
          <p>Laba Bersih: {formatIDR(report.totals.sales - report.totals.expense)}</p>

          <table className="table">
            <thead><tr><th>Tanggal</th><th>Jenis</th><th>Produk</th><th>Jumlah</th><th>Total</th></tr></thead>
            <tbody>
              {report.filtered.map(r => (
                <tr key={r.id}>
                  <td>{r.date}</td>
                  <td>{r.type}</td>
                  <td>{r.product}</td>
                  <td>{r.qty}</td>
                  <td>{formatIDR(r.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}