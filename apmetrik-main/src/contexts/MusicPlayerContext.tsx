import React, { createContext, useContext, ReactNode } from 'react';
import { useMusicPlayer, Track, PlaylistState } from '@/hooks/useMusicPlayer';
import { mockTracks } from '@/data/mockData';

interface MusicPlayerContextType extends PlaylistState {
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  playTrack: (track: Track, index: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  setPlaylist: (tracks: Track[]) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const useMusicPlayerContext = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error('useMusicPlayerContext must be used within a MusicPlayerProvider');
  }
  return context;
};

interface MusicPlayerProviderProps {
  children: ReactNode;
}

export const MusicPlayerProvider: React.FC<MusicPlayerProviderProps> = ({ children }) => {
  const musicPlayer = useMusicPlayer();

  // Initialize with mock data
  React.useEffect(() => {
    musicPlayer.setPlaylist(mockTracks);
    if (mockTracks.length > 0) {
      musicPlayer.playTrack(mockTracks[0], 0);
    }
  }, []);

  return (
    <MusicPlayerContext.Provider value={musicPlayer}>
      {children}
    </MusicPlayerContext.Provider>
  );
};