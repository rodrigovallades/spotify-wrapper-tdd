// getAlbum
// getAlbumTracks
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import { getAlbum, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

describe.only('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke tests', () => {
    it('should exist a getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should exist a getAlbumTracks', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {
    it('should call fetch', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been
        .calledOnce
    });

    it('should fetch the correct endpoint', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been
        .calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy')
    });

    it('should receive correct response from Promise', () => {
      promise.resolves({ album: 'name' });
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be
        .eql({ album: 'name' });
    });
  });
});
