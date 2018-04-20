import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Spotify wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {
    it('should call fetch', () => {
      const artist = search();
      expect(fetchedStub).to.have.been
        .calledOnce;
    });

    it('should fetch the correct endpoint', () => {
      context('passing one type', () => {
        const artist = search('Queen', 'artist');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist');

        const album = search('Queen', 'album');
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Queen&type=album');
      });

      context('passing more than one type', () => {
        const artist = search('Queen', ['artist', 'album']);
        expect(fetchedStub).to.have.been
          .calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist,album');
      });
    });

    it('should return JSON data from promise', () => {
      promise.resolves({ body: 'json' });
      const artist = search('Queen', 'artist');
      expect(artist.resolveValue).to.be
        .eql({ body: 'json' });
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch', () => {
      const albums = searchAlbums('Queen');
      expect(fetchedStub).to.have.been
        .calledOnce;
    });

    it('should fetch albums on the endpoint', () => {
      const albums = searchAlbums('Queen');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Queen&type=album');
    });
  });

  describe('searchArtists', () => {
    it('should call fetch', () => {
      const artist = searchArtists('Queen');
      expect(fetchedStub).to.have.been
        .calledOnce;
    });

    it('should fetch artist on the endpoint', () => {
      const artist = searchArtists('Queen');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Queen&type=artist');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch', () => {
      const tracks = searchTracks('Queen');
      expect(fetchedStub).to.have.been
        .calledOnce;
    });

    it('should fetch tracks on the endpoint', () => {
      const tracks = searchTracks('Queen');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Queen&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch', () => {
      const playlists = searchPlaylists('Queen');
      expect(fetchedStub).to.have.been
        .calledOnce;
    });

    it('should fetch playlists on the endpoint', () => {
      const playlists = searchPlaylists('Queen');
      expect(fetchedStub).to.have.been
        .calledWith('https://api.spotify.com/v1/search?q=Queen&type=playlist');
    });
  });
});
