export interface Song {
    id: number;
    name: string;
    duration: string;
    icon: Buffer;
    data: Buffer;
    albumid: number | null;
  }