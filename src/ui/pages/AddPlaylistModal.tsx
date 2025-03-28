import React, { useState } from 'react';

interface AddPlaylistModalProps {
  onAddPlaylist: (playlistName: string) => void;
  onClose: () => void;
}

const AddPlaylistModal: React.FC<AddPlaylistModalProps> = ({ onAddPlaylist, onClose }) => {
  const [playlistName, setPlaylistName] = useState('');

  const handleAddPlaylist = () => {
    if (playlistName.trim()) {
      onAddPlaylist(playlistName);
      setPlaylistName('');
      onClose();
    }
  };

  return (
    <div className="border base">
      <div className="modal-container">
        <h1 className="modal-title">Add new playlist</h1>

        <label className="modal-label">Playlist name</label>
        <input
          className="modal-input"
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />

        <button
          onClick={handleAddPlaylist}
          className="modal-button primary"
        >
          Add playlist
        </button>

        <button
          onClick={onClose}
          className="modal-button secondary"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddPlaylistModal;
