import './ProfileModal.css';
import { useState } from 'react';

const avatarOptions = [
  'https://i.imgur.com/ckBhGsw.png', // Himiko Yumeno
  'https://i.imgur.com/LKLncUW.png', // Akiyama
  'https://i.imgur.com/cN9ufvl.png', // Kurome
  'https://i.imgur.com/UnYEMrk.png', // Nana Hiragi
  'https://i.imgur.com/M7NIcm8.png', // Yuki Maeda
  'https://i.imgur.com/W3RlV5r.png' // Yuuichi Katagiri
];

const MAX_USERNAME_LENGTH = 15;

export default function ProfileModal({ username, setUsername, avatarUrl, setAvatarUrl, onClose }) {
  const [editName, setEditName] = useState(username);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveName = () => {
    if (editName.trim() === '') {
      setEditName(username); 
    } else {
      const finalName = editName.trim().slice(0, MAX_USERNAME_LENGTH);
      setUsername(finalName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setEditName(username);
      setIsEditing(false);
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="profile-modal-close" onClick={onClose}>
          ×
        </button>

        <img src={avatarUrl} alt="Avatar atual" className="profile-modal-avatar" />

        <div className="username-editor">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value.slice(0, MAX_USERNAME_LENGTH))}
              onBlur={handleSaveName}
              onKeyDown={handleKeyDown}
              autoFocus
              className="username-input"
            />
          ) : (
            <h2
              className="profile-modal-username display"
              onClick={() => setIsEditing(true)}
            >
              {username || 'Clique para editar'}
            </h2>
          )}

          <div className="char-counter">
            {isEditing ? (
              <span className={editName.length >= MAX_USERNAME_LENGTH ? 'limit' : ''}>
                {editName.length} / {MAX_USERNAME_LENGTH}
              </span>
            ) : (
              <span style={{ opacity: 0.6, fontSize: '14px' }}>
                Clique no nome para editar (máx. 15 caracteres)
              </span>
            )}
          </div>
        </div>

        <div className="profile-modal-gallery">
          <h3>Escolha seu avatar</h3>
          <div className="avatar-grid">
            {avatarOptions.map((src, index) => (
              <div
                key={index}
                className={`avatar-option ${avatarUrl === src ? 'selected' : ''}`}
                onClick={() => setAvatarUrl(src)}
              >
                <img src={src} alt={`Avatar ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}