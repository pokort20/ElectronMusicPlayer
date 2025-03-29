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
    <div className="border modal">
      <span className="label baseH1" style={{marginBottom:10}}>Add new playlist</span>

      <span className="label baseH2">Playlist name</span>
      <input className="textbox base" style={{margin:10}} type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
      <div className="stack baseH">
      <button className="button round" style={{margin: 5}} onClick={handleAddPlaylist}>
        Add playlist
      </button>

      <button className="button round" onClick={onClose}>
        Cancel
      </button>
      </div>
    </div>
  );
};

export default AddPlaylistModal;
