import { useState, useEffect, useCallback, useRef} from "react";

export function useMainViewModel() {
  // --- State variables ---
  const [songName, setSongName] = useState("SongName");
  const [authorName, setAuthorName] = useState("AuthorName");
  const [timeElapsed, setTimeElapsed] = useState("0:00");
  const [timeLeft, setTimeLeft] = useState("0:00");
  const [accountName, setAccountName] = useState("AccountName");
  const [searchText, setSearchText] = useState("");
  const [volume, setVolume] = useState<number>(1);
  const [songProgress, setSongProgress] = useState(0);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [isHomePageVisible, setIsHomePageVisible] = useState(true);
  const [isTabControlVisible, setIsTabControlVisible] = useState(false);
  const [minSongProgress, setMinSongProgress] = useState(0);
  const [maxSongProgress, setMaxSongProgress] = useState(100);
  var [isPlaying, setIsPlaying] = useState(false);
  const previousVolume = useRef<number>(volume);

  // --- Collections ---
  const [songQueue, setSongQueue] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [podcasts, setPodcasts] = useState([]);

  // --- Command logic ---

  
  const changeVolume = useCallback((volume: number) => {
    console.log("volume changed", volume);
    //@ts-ignore
    window.electron.changeVolume(volume);
  }, []);
  
  const playPauseCommand = useCallback(() => {
    //@ts-ignore
    isPlaying = window.electron.playPause();
    console.log("isPlaying: ", isPlaying);
  }, []);
  const playCommand = useCallback(() => {
    //@ts-ignore
    isPlaying = window.electron.playSong();
    console.log("isPlaying: ", isPlaying);
  }, []);

  const nextCommand = useCallback(() => {
    console.log("NextCommand not implemented");
  }, []);

  const previousCommand = useCallback(() => {
    console.log("PreviousCommand not implemented");
  }, []);

  const shuffleCommand = useCallback(() => {
    console.log("ShuffleCommand not implemented");
  }, []);

  const repeatCommand = useCallback(() => {
    console.log("RepeatCommand not implemented");
  }, []);

  const muteCommand = useCallback(() => {
    //@ts-ignore
    isPlaying = window.electron.mute();
  }, []);

  const homeCommand = useCallback(() => {
    setSearchText("");
    setIsHomePageVisible(true);
    setIsTabControlVisible(false);
  }, []);

  const addPlaylistCommand = useCallback(() => {
    console.log("AddPlaylistCommand not implemented");
  }, []);
 
  // --- Effects ---
  useEffect(() => {
    if (!searchText) {
      setIsHomePageVisible(true);
      setIsTabControlVisible(false);
    } else {
      setIsHomePageVisible(false);
      setIsTabControlVisible(true);
    }
  }, [searchText]);

  useEffect(() => {
    if (Math.abs(previousVolume.current - volume) > 0.001) {
      console.log("volume: " + volume);
      changeVolume(volume);
      previousVolume.current = volume;
    }
  }, [volume]);
  
  useEffect(() => {
    // @ts-ignore
    window.electron.subVolume((v: number) => {
      console.log("Renderer received volume update:", v);
      setVolume(v);
    });
  }, []);
  
  useEffect(() => {
    // This would usually trigger a search API
    console.log("SearchText or TabIndex changed", searchText, selectedTabIndex);
  }, [searchText, selectedTabIndex]);


  
  // useEffect(() => {
  //   //@ts-ignore
  //   window.electron.subVolume((vol) => console.log("volume: ", vol));
  // })
  // --- Expose everything ---
  return {
    songName,
    setSongName,
    authorName,
    setAuthorName,
    timeElapsed,
    setTimeElapsed,
    timeLeft,
    setTimeLeft,
    accountName,
    setAccountName,
    searchText,
    setSearchText,
    volume,
    setVolume,
    songProgress,
    setSongProgress,
    selectedTabIndex,
    setSelectedTabIndex,
    isHomePageVisible,
    setIsHomePageVisible,
    isTabControlVisible,
    setIsTabControlVisible,
    minSongProgress,
    setMinSongProgress,
    maxSongProgress,
    isPlaying,
    setIsPlaying,
    setMaxSongProgress,
    songQueue,
    setSongQueue,
    suggestions,
    setSuggestions,
    playlists,
    setPlaylists,
    artists,
    setArtists,
    albums,
    setAlbums,
    podcasts,
    setPodcasts,

    // Commands
    changeVolume,
    playCommand,
    playPauseCommand,
    nextCommand,
    previousCommand,
    shuffleCommand,
    repeatCommand,
    muteCommand,
    homeCommand,
    addPlaylistCommand
  };
}
