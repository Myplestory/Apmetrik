import { oauth2 } from 'electron-oauth2';

const config = {
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  authorizationUrl: 'https://accounts.spotify.com/authorize',
  tokenUrl: 'https://accounts.spotify.com/api/token',
  useBasicAuthorizationHeader: true,
  redirectUri: 'http://127.0.0.1:4370/callback',
};

const windowParams = {
  alwaysOnTop: true,
  autoHideMenuBar: true,
  webPreferences: { nodeIntegration: false },
};

const spotifyOAuth = oauth2(config, windowParams);

export async function authenticateSpotify() {
  const tokenConfig = {
    scope: [
      'user-read-private',
      'user-read-email',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-modify-private',
      'user-library-read',
      'user-library-modify',
      'streaming',
      'user-read-playback-state',
      'user-modify-playback-state'
    ].join(' ')
  };

  try {
    const token = await spotifyOAuth.getAccessToken(tokenConfig);
    return token;
  } catch (err) {
    console.error('Spotify OAuth failed:', err);
    return null;
  }
}
