import { useState, useEffect, useCallback, useRef } from "react";
import { Song, Album, Playlist, Artist, Podcast } from "../../electron/models/";

export type MainViewModel = ReturnType<typeof useMainViewModel>;

export function useMainViewModel() {
  //State variables
  const [songName, setSongName] = useState("SongName");
  const [authorName, setAuthorName] = useState("AuthorName");
  const [timeElapsed, setTimeElapsed] = useState("1:01");
  const [timeLeft, setTimeLeft] = useState("2:05");
  const [accountName, setAccountName] = useState("TestAccount");
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

  //collections
  const [songQueue, setSongQueue] = useState<Song[]>([]);
  const [suggestedSongs, setSuggestedSongs] = useState<Song[]>([]);
  const [suggestedArtists, setSuggestedArtists] = useState<Song[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [trendingArtists, setTrendingArtists] = useState<Song[]>([]);
  const [searchSongs, setSearchSongs] = useState<Song[]>([]);
  const [searchArtists, setSearchArtists] = useState<Artist[]>([]);
  const [searchAlbums, setSearchAlbums] = useState<Album[]>([]);
  const [searchPlaylists, setSearchPlaylists] = useState<Playlist[]>([]);
  const [searchPodcasts, setSearchPodcasts] = useState<Podcast[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //modal
  const openModal = () => {
    console.log("Opening modal");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const addPlaylistCommand = useCallback((playlistname: string) => {
    console.log("adding playlist: ", playlistname);
    //@ts-ignore
    window.api.addNewPlaylist(1, playlistname);
  }, []);

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
  const playSongCommand = useCallback(async (song: Song) => {
    console.log("UI SENDS SONG:", {
      id: song.id,
      name: song.name,
      duration: song.duration,
      artistNames: song.artistNames,
    });

    //@ts-ignore
    await window.electron.playSong(song);
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
  const contextMenuCommand = useCallback((item: any) => {
    const accountId = 1;
    //@ts-ignore
    window.electron.showContextMenu(accountId, item);
  }, []);








  const homeCommand = useCallback(() => {
    setSearchText("");
    setIsHomePageVisible(true);
    setIsTabControlVisible(false);
  }, []);

  useEffect(() => {
    //load from db later 
    const accountId = 1;
    console.log("loading all data");
    //@ts-ignore
    window.api.loadPlaylists(accountId).then(setPlaylists);
    //@ts-ignore
    window.api.loadArtists(accountId).then(setArtists);
    //@ts-ignore
    window.api.loadAlbums(accountId).then(setAlbums);
    //@ts-ignore
    window.api.loadPodcasts(accountId).then(setPodcasts);
    //@ts-ignore
    window.api.loadSuggestedSongs(accountId, 4).then(setSuggestedSongs);
    //@ts-ignore
    window.api.loadSuggestedArtists(accountId, 2).then(setSuggestedArtists);
    //@ts-ignore
    window.api.loadSuggestedSongs(accountId, 4).then(setTrendingSongs);
    //@ts-ignore
    window.api.loadSuggestedArtists(accountId, 5).then(setTrendingArtists);
    console.log("loading all data finished");
  }, []);

  useEffect(() => {
    if (Math.abs(previousVolume.current - volume) > 0.001) {
      console.log("volume: " + volume);
      changeVolume(volume);
      previousVolume.current = volume;
    }
  }, [volume]);
  useEffect(() => {
    console.log("isModalOpen:", isModalOpen);
  }, [isModalOpen])
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
    window.electron.albumsChanged((updated: Album[]) => {
      console.log("albumsChanged");
      setAlbums(updated);
    });
  }, []);
  useEffect(() => {
    console.log("SongProgress: ", songProgress);
  }, [songProgress]);
  
  useEffect(() => {
    // @ts-ignore
    window.electron.playlistsChanged((updated: Playlist[]) => {
      console.log("playlistsChanged");
      setPlaylists(updated);
    });
  }, []);
  
  useEffect(() => {
    // @ts-ignore
    window.electron.artistsChanged((updated: Artist[]) => {
      console.log("artistsChanged", artists);
      setArtists(updated);
    });
  }, []);
  
  useEffect(() => {
    // @ts-ignore
    window.electron.podcastsChanged((updated: Podcast[]) => {
      console.log("podcastsChanged");
      setPodcasts(updated);
    });
  }, []);


  useEffect(() => {
    // @ts-ignore
    window.electron.isPlayingChanged((data: boolean) => {
      console.log("Renderer received isPlaying:", data);
      setIsPlaying(data);
    });
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.electron.shuffleChanged((data: boolean) => {
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
    if (!searchText) {
      setIsHomePageVisible(true);
      setIsTabControlVisible(false);
    } else {
      setIsHomePageVisible(false);
      setIsTabControlVisible(true);
    }
  }, [searchText]);

  useEffect(() => {
    console.log("SearchText or TabIndex changed", searchText, selectedTabIndex);
    switch (selectedTabIndex) {
      case 0:
        // @ts-ignore
        window.api.searchSongs(searchText).then(setSearchSongs);
        break;
      case 1:
        // @ts-ignore
        window.api.searchArtists(searchText).then(setSearchArtists);
        break;
      case 2:
        // @ts-ignore
        window.api.searchAlbums(searchText).then(setSearchAlbums);
        break;
      case 3:
        // @ts-ignore
        window.api.searchPlaylists(searchText).then(setSearchPlaylists);
        break;
      case 4:
        // @ts-ignore
        window.api.searchPodcasts(searchText).then(setSearchPodcasts);
        break;
    }
  }, [searchText, selectedTabIndex]);

  // useEffect(() => {
  //   //@ts-ignore
  //   window.electron.subVolume((vol) => console.log("volume: ", vol));
  // })
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
    searchSongs,
    setSearchSongs,
    searchArtists,
    setSearchArtists,
    searchAlbums,
    setSearchAlbums,
    searchPlaylists,
    setSearchPlaylists,
    searchPodcasts,
    setSearchPodcasts,

    //modal
    isModalOpen,
    setIsModalOpen,
    openModal,
    closeModal,

    //commands
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
    addPlaylistCommand,
    contextMenuCommand
  };
}