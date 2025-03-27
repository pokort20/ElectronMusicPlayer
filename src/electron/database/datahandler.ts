import { query } from './db.js';
import { Song} from '../models/Song.js';
import { Playlist } from '../models/Playlist.js';
import { Artist } from '../models/Artist.js';
import { Podcast } from '../models/Podcast.js';
import { Album } from '../models/Album.js';

export async function searchSongs(searchTerm: string): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.id,
           s.name,
           s.duration,
           s.icon,
           s.data,
           COALESCE(string_agg(a.name, ', '), '') AS "artistNames"
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

export async function searchArtists(searchTerm: string): Promise<Artist[]> {
  const result = await query(
    `
    SELECT *
    FROM artist
    WHERE name ILIKE '%' || $1 || '%'
    `,
    [searchTerm]
  );

  return result.rows;
}
export async function searchAlbums(searchTerm: string): Promise<Album[]> {
  const result = await query(
    `
    SELECT al.id,
           al.name,
           al.year,
           al.icon,
           COALESCE(string_agg(ar.name, ', '), '') AS "artistNames"
    FROM album al
    LEFT JOIN album_artist aa ON al.id = aa.albumid
    LEFT JOIN artist ar ON aa.artistid = ar.id
    WHERE al.name ILIKE '%' || $1 || '%'
    GROUP BY al.id
    `,
    [searchTerm]
  );

  return result.rows;
}
export async function searchPlaylists(searchTerm: string): Promise<Playlist[]> {
  const result = await query(
    `
    SELECT *
    FROM playlist
    WHERE name ILIKE '%' || $1 || '%'
    `,
    [searchTerm]
  );

  return result.rows;
}
export async function searchPodcasts(searchTerm: string): Promise<Podcast[]> {
  const result = await query(
    `
    SELECT *
    FROM podcast
    WHERE name ILIKE '%' || $1 || '%'
    `,
    [searchTerm]
  );

  return result.rows;
}
export async function getSongsByPlaylist(playlistId: number): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.id,
           s.name,
           s.duration,
           s.icon,
           s.data,
           COALESCE(string_agg(a.name, ', '), '') AS "artistNames"
    FROM song s
    JOIN song_playlist sp ON s.id = sp.songid
    LEFT JOIN song_artist sa ON s.id = sa.songid
    LEFT JOIN artist a ON sa.artistid = a.id
    WHERE sp.playlistid = $1
    GROUP BY s.id
    `,
    [playlistId]
  );
  return result.rows;
}
export async function getSongsByArtist(artistId: number): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.id,
           s.name,
           s.duration,
           s.icon,
           s.data,
           COALESCE(string_agg(a2.name, ', '), '') AS "artistNames"
    FROM song s
    JOIN song_artist sa1 ON s.id = sa1.songid
    JOIN artist a1 ON sa1.artistid = a1.id
    LEFT JOIN song_artist sa2 ON s.id = sa2.songid
    LEFT JOIN artist a2 ON sa2.artistid = a2.id
    WHERE a1.id = $1
    GROUP BY s.id
    `,
    [artistId]
  );
  return result.rows;
}
export async function getSongsByAlbum(albumId: number): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.id,
           s.name,
           s.duration,
           s.icon,
           s.data,
           COALESCE(string_agg(a.name, ', '), '') AS "artistNames"
    FROM song s
    JOIN album_song als ON s.id = als.songid
    LEFT JOIN song_artist sa ON s.id = sa.songid
    LEFT JOIN artist a ON sa.artistid = a.id
    WHERE als.albumid = $1
    GROUP BY s.id
    `,
    [albumId]
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
    `
    SELECT al.id,
           al.name,
           al.icon,
           al.year,
           COALESCE(string_agg(ar.name, ', '), '') AS "artistNames"
    FROM album al
    JOIN account_album aa ON al.id = aa.albumid
    LEFT JOIN album_artist ala ON al.id = ala.albumid
    LEFT JOIN artist ar ON ala.artistid = ar.id
    WHERE aa.accountid = $1
    GROUP BY al.id
    `,
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
export async function getSuggestedSongs(accountId: number, count: number): Promise<Song[]> {
  const result = await query(
    `
    SELECT s.id,
           s.name,
           s.duration,
           s.icon,
           s.data,
           COALESCE(string_agg(a.name, ', '), '') AS "artistNames"
    FROM song s
    LEFT JOIN song_artist sa ON s.id = sa.songid
    LEFT JOIN artist a ON sa.artistid = a.id
    GROUP BY s.id, s.name, s.duration, s.icon, s.data
    ORDER BY RANDOM()
    LIMIT $1
    `,
    [count]
  );
  return result.rows;
}
export async function getSuggestedArtists(accountId: number, count: number): Promise<Artist[]> {
  const result = await query(
    `SELECT artist.id, artist.name
     FROM artist
     JOIN account_artist ON artist.id = account_artist.artistid
     WHERE account_artist.accountid = $1
     ORDER BY RANDOM()
     LIMIT $2`,
    [accountId, count]
  );
  return result.rows;
}
export async function getAuthorsBySong(songId: number): Promise<string> {
  const result = await query(
    `SELECT artist.name
     FROM artist
     JOIN song_artist ON artist.id = song_artist.artistid
     WHERE song_artist.songid = $1`,
    [songId]
  );
  const names = result.rows.map(row => row.name);
  return names.join(", ");
}
