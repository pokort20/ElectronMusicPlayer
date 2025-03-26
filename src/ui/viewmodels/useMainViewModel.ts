import { useState, useEffect, useCallback, useRef} from "react";
import { Song, Album, Playlist, Artist, Podcast } from "../../electron/models/";

export type MainViewModel = ReturnType<typeof useMainViewModel>;

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const previousVolume = useRef<number>(volume);

  // --- Collections ---
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);
  const [suggestedArtists, setSuggestedArtists] = useState<Song[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [trendingArtists, setTrendingArtists] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);


  // --- Command logic ---
  //Player controls
  
  const changeVolume = useCallback((volume: number) => {
    console.log("volume changed", volume);
    //@ts-ignore
    window.electron.changeVolume(volume);
  }, []);
  
  const playPauseCommand = useCallback(async () => {
    //@ts-ignore
    await window.electron.playPause();
  }, []);
  const playSongCommand = useCallback(async () => {
    //@ts-ignore
    await window.electron.playSong();
  }, []);
  const playPlaylistCommand = useCallback(async (playlistId: number) => {
    //@ts-ignore
    await window.electron.playPlaylist(playlistId);
  }, []);
  const playAlbumCommand = useCallback(async (albumId: number) => {
    //@ts-ignore
    await window.electron.playAlbum(albumId);
  }, []);
  const playArtistCommand = useCallback(async (artistId: number) => {
    //@ts-ignore
    await window.electron.playArtist(artistId);
  }, []);
  const playPodcastCommand = useCallback(async (podcastId: number) => {
    //@ts-ignore
    await window.electron.playPodcast(podcastId);
  }, []);

  const nextCommand = useCallback(() => {
    //@ts-ignore
    window.electron.next();
  }, []);

  const previousCommand = useCallback(() => {
    //@ts-ignore
    window.electron.previous();
  }, []);

  const shuffleCommand = useCallback(() => {
    //@ts-ignore
    window.electron.shuffle();
  }, []);

  const repeatCommand = useCallback(() => {
    //@ts-ignore
    window.electron.repeat();
  }, []);

  const muteCommand = useCallback(() => {
    //@ts-ignore
    window.electron.mute();
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
    const accountId = 1; // later from login
    console.log("loading all data");
    //@ts-ignore
    //window.api.loadPlaylists(accountId).then(setPlaylists);
    window.api.loadPlaylists(accountId).then(setPlaylists);
    //@ts-ignore
    window.api.loadArtists(accountId).then(setArtists);
    //@ts-ignore
    window.api.loadAlbums(accountId).then(setAlbums);
    //@ts-ignore
    window.api.loadPodcasts(accountId).then(setPodcasts);
    //@ts-ignore
    window.api.loadSuggestedSongs(accountId, 5).then(setSuggestedSongs);
    //@ts-ignore
    window.api.loadSuggestedArtists(accountId, 5).then(setSuggestedArtists);
    //@ts-ignore
    window.api.loadSuggestedSongs(accountId, 5).then(setTrendingSongs);
    //@ts-ignore
    window.api.loadSuggestedArtists(accountId, 5).then(setTrendingArtists);
    console.log("loading all data finished");
  }, []);
  
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
    // @ts-ignore
    window.electron.songDescriptionChanged((description: { name: string, artist: string }) => {
      console.log("Renderer received song description:", description);
      setSongName(description.name);
      setAuthorName(description.artist);
    });
  }, []);
  useEffect(() => {
    // @ts-ignore
    window.electron.songQueueChanged((queue: Song[]) => {
      console.log("Renderer received song queue:");
      setSongQueue(queue);
    });
  }, []);
  useEffect(() => {
    // @ts-ignore
    window.electron.isPlayingChanged((data: boolean) => {
      console.log("Renderer received isPlaying:");
      setIsPlaying(data);
    });
  }, []);
  useEffect(() => {
    // @ts-ignore
    window.electron.shuffleChanged((data: boolean) => {
      console.log("Renderer received shuffle:");
      setShuffle(data);
    });
  }, []);
  useEffect(() => {
    // @ts-ignore
    window.electron.repeatChanged((data: boolean) => {
      console.log("Renderer received repeat:");
      setRepeat(data);
    });
  }, []);

  useEffect(() => {
    // This would usually trigger a search API
    console.log("SearchText or TabIndex changed", searchText, selectedTabIndex);
  }, [searchText, selectedTabIndex]);

  useEffect(() => {
    // This would usually trigger a search API
    console.log("isPlaying changed, number of playlists:", playlists.length);
  }, [searchText]);

  
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
    shuffle,
    setShuffle,
    repeat,
    setRepeat,
    setMaxSongProgress,
    songQueue,
    setSongQueue,
    suggestedSongs,
    setSuggestedSongs,
    suggestedArtists,
    setSuggestedArtists,
    trendingSongs,
    setTrendingSongs,
    trendingArtists,
    setTrendingArtists,
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
    playSongCommand,
    playPlaylistCommand,
    playAlbumCommand,
    playArtistCommand,
    playPodcastCommand,
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
