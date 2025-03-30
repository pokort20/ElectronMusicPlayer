import { query } from './db.js';
import { Song } from '../models/Song.js';
import { Playlist } from '../models/Playlist.js';
import { Artist } from '../models/Artist.js';
import { Podcast } from '../models/Podcast.js';
import { Album } from '../models/Album.js';

export async function addNewPlaylist(accountId: number, name: string): Promise<void> {
  console.log("datahandler adding playlist:", name);
  const result = await query(
    `
    WITH new_playlist AS (
      INSERT INTO playlist (name, ownerid)
      VALUES ($1, $2)
      RETURNING id
    )
    INSERT INTO account_playlist (accountid, playlistid)
    SELECT $2, id FROM new_playlist
    `,
    [name, accountId]
  );
}
export async function deletePlaylist(accountId: number, playlistId: number): Promise<void> {
  console.log("datahandler deleting playlist:", playlistId);

  await query(
    `
    DELETE FROM account_playlist
    WHERE accountid = $1 AND playlistid = $2
    `,
    [accountId, playlistId]
  );

  await query(
    `
    DELETE FROM playlist
    WHERE id = $1
    `,
    [playlistId]
  );
}

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
    `SELECT *
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
    `SELECT *
     FROM artist
     ORDER BY RANDOM()
     LIMIT $1`,
    [count]
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
export async function addToPlaylist(accountId: number, song: any, playlist: any): Promise<void> {
  await query(
    `
    INSERT INTO song_playlist (songid, playlistid)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    `,
    [song.id, playlist.id]
  );
  console.log("datahandler adding ", song, " to playlist ", playlist);
}
export async function addToFavourites(accountId: number, object: any): Promise<void> {
  switch (object?.type.toLowerCase()) {
    case 'song':
      await query(
        `
        INSERT INTO account_song (accountid, songid)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [accountId, object.id]
      );
      break;

    case 'album':
      await query(
        `
        INSERT INTO account_album (accountid, albumid)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [accountId, object.id]
      );
      break;

    case 'artist':
      await query(
        `
        INSERT INTO account_artist (accountid, artistid)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [accountId, object.id]
      );
      break;

    case 'podcast':
      await query(
        `
        INSERT INTO account_podcast (accountid, podcastid)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [accountId, object.id]
      );
      break;
    case 'playlist':
      await query(
        `
        INSERT INTO account_playlist (accountid, playlistid)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
        `,
        [accountId, object.id]
      );
      break;

    default:
      console.log("unable to add unknown type to favourites:", object?.type);
  }
  console.log("datahandler added item to favourites");
}
export async function isInFavourites(accountId: number, object: any): Promise<boolean> {
  let result;

  switch (object?.type.toLowerCase()) {
    case 'song':
      result = await query(
        `
        SELECT 1 FROM account_song
        WHERE accountid = $1 AND songid = $2
        LIMIT 1
        `,
        [accountId, object.id]
      );
      break;

    case 'album':
      result = await query(
        `
        SELECT 1 FROM account_album
        WHERE accountid = $1 AND albumid = $2
        LIMIT 1
        `,
        [accountId, object.id]
      );
      break;

    case 'artist':
      result = await query(
        `
        SELECT 1 FROM account_artist
        WHERE accountid = $1 AND artistid = $2
        LIMIT 1
        `,
        [accountId, object.id]
      );
      break;

    case 'podcast':
      result = await query(
        `
        SELECT 1 FROM account_podcast
        WHERE accountid = $1 AND podcastid = $2
        LIMIT 1
        `,
        [accountId, object.id]
      );
      break;
    case 'playlist':
      result = await query(
        `
        SELECT 1 FROM account_playlist
        WHERE accountid = $1 AND playlistid = $2
        LIMIT 1
        `,
        [accountId, object.id]
      );
      break;

    default:
      console.log("unable to check unknown type in favourites:", object?.type);
      return false;
  }
  if (result?.rowCount) {
    return result?.rowCount > 0;
  }
  return false;
}
export async function removeFromFavourites(accountId: number, object: any): Promise<void> {
  switch (object?.type.toLowerCase()) {
    case 'song':
      await query(
        `
        DELETE FROM account_song
        WHERE accountid = $1 AND songid = $2
        `,
        [accountId, object.id]
      );
      break;

    case 'album':
      await query(
        `
        DELETE FROM account_album
        WHERE accountid = $1 AND albumid = $2
        `,
        [accountId, object.id]
      );
      break;

    case 'artist':
      await query(
        `
        DELETE FROM account_artist
        WHERE accountid = $1 AND artistid = $2
        `,
        [accountId, object.id]
      );
      break;

    case 'podcast':
      await query(
        `
        DELETE FROM account_podcast
        WHERE accountid = $1 AND podcastid = $2
        `,
        [accountId, object.id]
      );
      break;
    case 'playlist':
      await query(
        `
        DELETE FROM account_playlist
        WHERE accountid = $1 AND playlistid = $2
        `,
        [accountId, object.id]
      );
      break;

    default:
      console.log("unable to remove unknown type from favourites:", object?.type);
  }
  console.log("datahandler removed item from favourites");
}
