interface Window {
    electron: {
        playSong: () => void;
        changeVolume: (volume: number) => void;
        searchDB: (searchTerm: string) => Promise<any>; // Replace `any` with a more specific type if possible
    }
}