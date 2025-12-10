import { useState } from 'react';
import logo from '../assets/logo.png'; 
import './Navbar.css';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState('loja');

  const menuItems = [
    { id: 'loja', label: 'LOJA' },
    { id: 'biblioteca', label: 'BIBLIOTECA' },
    { id: 'perfil', label: 'PERFIL' },
  ];

  return (
    <nav className="stay-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="StayGames" className="navbar-logo" />
          <span className="navbar-title">StayGames</span>
        </div>

        <div className="navbar-menu">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`navbar-link ${activeItem === item.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveItem(item.id)}
              onClick={() => setActiveItem(item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="navbar-right">
          <div className="navbar-profile">
            <div className="profile-avatar"></div>
            <span>USER</span>
          </div>
        </div>
      </div>
    </nav>
  );
}