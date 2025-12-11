import { useState } from 'react';
import logo from '../assets/logo.png'; 
import './Navbar.css';

export default function Navbar({ setActivePage, username, avatarUrl, onProfileClick }) {
  const [activeItem, setActiveItem] = useState('loja');

  const menuItems = [
    { id: 'loja', label: 'LOJA' },
    { id: 'biblioteca', label: 'BIBLIOTECA' },
    { id: 'perfil', label: 'PERFIL' },
  ];

  function handleMenuClick(id) {
    setActiveItem(id);

    if (id === 'perfil') {
      onProfileClick(); 
    } else {
      setActivePage(id); 
    }
  }

  return (
    <nav className="stay-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="StayGames" className="navbar-logo" />
          <span className="navbar-title">StayGames</span>
        </div>

        <div className="navbar-menu">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`navbar-link ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="navbar-right">
          <div className="navbar-profile" onClick={onProfileClick}>
            <img src={avatarUrl} alt="Avatar" className="profile-avatar" />
            <span>{username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}