import { useState, useCallback } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  platform: 'spotify' | 'youtube' | 'soundcloud' | 'local';
}

export interface PlaylistState {
  tracks: Track[];
  currentTrack: Track | null;
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  progress: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
}

export const useMusicPlayer = () => {
  const [state, setState] = useState<PlaylistState>({
    tracks: [],
    currentTrack: null,
    currentIndex: -1,
    isPlaying: false,
    volume: 80,
    progress: 0,
    isShuffled: false,
    repeatMode: 'none',
  });

  const play = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: true }));
  }, []);

  const pause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlayPause = useCallback(() => {
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume: Math.max(0, Math.min(100, volume)) }));
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState(prev => ({ ...prev, progress: Math.max(0, Math.min(100, progress)) }));
  }, []);

  const playTrack = useCallback((track: Track, index: number) => {
    setState(prev => ({
      ...prev,
      currentTrack: track,
      currentIndex: index,
      isPlaying: true,
      progress: 0,
    }));
  }, []);

  const nextTrack = useCallback(() => {
    setState(prev => {
      if (prev.tracks.length === 0) return prev;
      
      let nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.tracks.length) {
        nextIndex = prev.repeatMode === 'all' ? 0 : prev.currentIndex;
      }
      
      if (nextIndex !== prev.currentIndex) {
        return {
          ...prev,
          currentIndex: nextIndex,
          currentTrack: prev.tracks[nextIndex],
          progress: 0,
        };
      }
      
      return prev;
    });
  }, []);

  const previousTrack = useCallback(() => {
    setState(prev => {
      if (prev.tracks.length === 0) return prev;
      
      let prevIndex = prev.currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = prev.repeatMode === 'all' ? prev.tracks.length - 1 : 0;
      }
      
      return {
        ...prev,
        currentIndex: prevIndex,
        currentTrack: prev.tracks[prevIndex],
        progress: 0,
      };
    });
  }, []);

  const toggleShuffle = useCallback(() => {
    setState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setState(prev => ({
      ...prev,
      repeatMode: prev.repeatMode === 'none' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'none',
    }));
  }, []);

  const setPlaylist = useCallback((tracks: Track[]) => {
    setState(prev => ({ ...prev, tracks }));
  }, []);

  return {
    ...state,
    play,
    pause,
    togglePlayPause,
    setVolume,
    setProgress,
    playTrack,
    nextTrack,
    previousTrack,
    toggleShuffle,
    toggleRepeat,
    setPlaylist,
  };
};