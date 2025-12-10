import { useState, useEffect } from 'react';
import './GameList.css';

const ALL_CATEGORIES = [
  { title: "Mais curtidos", sort: "popularity" },
  { title: "Mais jogados da semana", sort: "popularity" },
  { title: "Animes", genre: "Anime" },
  { title: "Gratuito", platform: "PC" },
  { title: "Esportes", genre: "Sports" },
  { title: "Battle Royale", genre: "Battle Royale" },
  { title: "MMORPG", genre: "MMORPG" },
  { title: "Estratégias", genre: "Strategy" },
  { title: "Multiplayer", tag: "multiplayer" },
  { title: "Jogos de luta", genre: "Fighting" },
  { title: "SCI-FI", genre: "Sci-Fi" },
];

export default function GameList() {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://corsproxy.io/?' + encodeURIComponent('https://www.freetogame.com/api/games'))
      .then(res => res.json())
      .then(data => {
setGames(data);
shuffleCategories(); 
setLoading(false);  

      });
  }, []);

const shuffleCategories = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

  setLoading(true);

  const shuffled = [...ALL_CATEGORIES].sort(() => Math.random() - 0.5);
  setCategories(shuffled);

  setTimeout(() => {
    setLoading(false);
  }, 600);
};

const getGamesForRow = (cat) => {
  let list = [...games];

  if (cat.genre) {
    list = list.filter(g => g.genre.toLowerCase().includes(cat.genre.toLowerCase()));
  }
  if (cat.platform) {
    list = list.filter(g => g.platform.includes('Windows'));
  }
  if (cat.tag === 'multiplayer') {
    list = list.filter(g =>
      g.short_description.toLowerCase().includes('multiplayer') ||
      g.genre.toLowerCase().includes('mmo')
    );
  }
  if (cat.sort === 'popularity') {
    list.sort(() => Math.random() - 0.5);
  }

  if (list.length === 0) return [];

  const MIN_ITEMS = 20;
  let infiniteList = [];

  while (infiniteList.length < MIN_ITEMS) {
    infiniteList = [...infiniteList, ...list];
  }

  return infiniteList.slice(0, MIN_ITEMS);
};

  if (loading) {
    return <div className="list-loading">Carregando StayGames...</div>;
  }

  return (
    <div className="gamelist-container">
      {categories.map((category, index) => {
        const rowGames = getGamesForRow(category);
        if (rowGames.length === 0) return null;

        return (
          <section key={index} className="game-row">
            <h2 className="row-title">
                    {category.title}
            </h2>
            <div className="row-wrapper">
              <div className="row-games">
                {rowGames.map(game => (
                  <div key={game.id} className="game-card">
                    <div className="card-image">
                      <img src={game.thumbnail} alt={game.title} loading="lazy" />
                      <div className="card-overlay">
                        <a href={game.game_url} target="_blank" rel="noopener noreferrer" className="play-button">
                          JOGAR AGORA
                        </a>
                      </div>
                    </div>

                    <div className="card-info-text">
                      <h3>{game.title}</h3>
                      <p>{game.genre}</p>
                    </div>

                  </div>
                ))}
                
              </div>
            </div>
          </section>
        );
      })}

      <div className="shuffle-button-container">
        <button onClick={shuffleCategories} className="shuffle-button">
          Carregar
        </button>
      </div>
    </div>
  );
}
