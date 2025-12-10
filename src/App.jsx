import { useState, useEffect } from 'react';
import logo from './assets/logo.png'; 
import Navbar from './components/Navbar';
import GameList from './components/GameList';
import './App.css';

const loadingTexts = [
  'Carregando os jogos',
  'Pulando das cascas de Bananas',
  'Em alta velocidade',
  'Pulando de susto',
  'Acelerando os motores',
];

function App() {
  const [loading, setLoading] = useState(true);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <img src={logo} alt="StayGames Logo" className="loading-logo" />

          <h1 className="site-title">StayGames</h1>

          <div className="spinner"></div>

          <p className="loading-text">
            ...{loadingTexts[currentTextIndex]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar></Navbar>
<main style={{ paddingTop: '90px' }}> 
         <GameList />
      </main>
    </div>
  );
}

export default App;