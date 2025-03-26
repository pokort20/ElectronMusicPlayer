import { query } from './db.js';
import { Song} from '../models/Song.js';
import { Playlist } from '../models/Playlist.js';
import { Artist } from '../models/Artist.js';
import { Podcast } from '../models/Podcast.js';
import { Album } from '../models/Album.js';

export async function searchSongs(searchTerm: string): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.*,
           json_agg(json_build_object('id', a.id, 'name', a.name)) AS artists
    FROM song s
    LEFT JOIN song_artist sa ON s.id = sa.songid
    LEFT JOIN artist a ON sa.artistid = a.id
    WHERE s.name ILIKE '%' || $1 || '%'
    GROUP BY s.id
    `,
    [searchTerm]
  );

  return result.rows;
}
//account collections
export async function getPlaylistsByAccount(accountId: number): Promise<Playlist[]> {
  const result = await query(
    `SELECT playlist.id, playlist.name, playlist.icon
     FROM playlist
     JOIN account_playlist ON playlist.id = account_playlist.playlistid
     WHERE account_playlist.accountid = $1`,
    [accountId]
  );
  return result.rows;  
}
export async function getArtistsByAccount(accountId: number): Promise<Artist[]> {
  const result = await query(
    `SELECT artist.id, artist.name, artist.icon
     FROM artist
     JOIN account_artist ON artist.id = account_artist.artistid
     WHERE account_artist.accountid = $1`,
    [accountId]
  );
  return result.rows;
}
export async function getAlbumsByAccount(accountId: number): Promise<Album[]> {
  const result = await query(
    `SELECT album.id, album.name, album.icon
     FROM album
     JOIN account_album ON album.id = account_album.albumid
     WHERE account_album.accountid = $1`,
    [accountId]
  );
  return result.rows;
}
export async function getPodcastsByAccount(accountId: number): Promise<Podcast[]> {
  const result = await query(
    `SELECT podcast.id, podcast.name, podcast.description, podcast.duration, podcast.icon, podcast.data
     FROM podcast
     JOIN account_podcast ON podcast.id = account_podcast.podcastid
     WHERE account_podcast.accountid = $1`,
    [accountId]
  );
  return result.rows;
}