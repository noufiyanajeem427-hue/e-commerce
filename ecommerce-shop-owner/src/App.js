import React from 'react';
import './styles/owner.css';

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Owner Panel</h1>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Products</a>
          <a href="#">Orders</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <h2>Overview</h2>
        </header>

        <section className="cards">
          <div className="card">
            <span>Total Revenue</span>
            <strong>$24,500</strong>
          </div>
          <div className="card">
            <span>Orders</span>
            <strong>328</strong>
          </div>
          <div className="card">
            <span>Products</span>
            <strong>142</strong>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
