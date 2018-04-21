export const getAlbum = id =>
  fetch(`https://api.spotify.com/v1/albums/${id}`);

export const getAlbumTracks = () => {}
