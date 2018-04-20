export const search = (query, type) =>
  fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`);

export const searchAlbums = query =>
  search(query, 'album');

export const searchTracks = query =>
  search(query, 'track');

export const searchArtists = query =>
  search(query, 'artist');

export const searchPlaylists = query =>
  search(query, 'playlist');
