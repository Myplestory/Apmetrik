import { useState, useCallback } from 'react';

export interface Platform {
  id: string;
  name: string;
  isConnected: boolean;
  username?: string;
  avatar?: string;
  playlists: number;
  lastSync?: Date;
}

export interface SyncStatus {
  isActive: boolean;
  platform?: string;
  progress: number;
  message: string;
}

export const usePlatformSync = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([
    {
      id: 'spotify',
      name: 'Spotify',
      isConnected: true,
      username: 'user123',
      playlists: 47,
      lastSync: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: 'youtube',
      name: 'YouTube Music',
      isConnected: false,
      playlists: 0,
    },
    {
      id: 'soundcloud',
      name: 'SoundCloud',
      isConnected: false,
      playlists: 0,
    },
    {
      id: 'apple',
      name: 'Apple Music',
      isConnected: false,
      playlists: 0,
    },
  ]);

  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isActive: false,
    progress: 0,
    message: 'Ready to sync',
  });

  const connectPlatform = useCallback(async (platformId: string) => {
    // Simulate connection process
    setSyncStatus({
      isActive: true,
      platform: platformId,
      progress: 0,
      message: 'Connecting...',
    });

    // Simulate authentication and setup
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setSyncStatus(prev => ({
        ...prev,
        progress: i,
        message: i < 50 ? 'Authenticating...' : i < 80 ? 'Syncing playlists...' : 'Finalizing...',
      }));
    }

    setPlatforms(prev =>
      prev.map(p =>
        p.id === platformId
          ? {
              ...p,
              isConnected: true,
              username: `user_${platformId}`,
              playlists: Math.floor(Math.random() * 50) + 1,
              lastSync: new Date(),
            }
          : p
      )
    );

    setSyncStatus({
      isActive: false,
      progress: 100,
      message: 'Connected successfully!',
    });

    // Reset message after delay
    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, message: 'Ready to sync' }));
    }, 3000);
  }, []);

  const disconnectPlatform = useCallback((platformId: string) => {
    setPlatforms(prev =>
      prev.map(p =>
        p.id === platformId
          ? {
              ...p,
              isConnected: false,
              username: undefined,
              avatar: undefined,
              playlists: 0,
              lastSync: undefined,
            }
          : p
      )
    );
  }, []);

  const syncPlaylists = useCallback(async (fromPlatform: string, toPlatform: string) => {
    setSyncStatus({
      isActive: true,
      platform: `${fromPlatform}->${toPlatform}`,
      progress: 0,
      message: 'Starting sync...',
    });

    const steps = [
      'Fetching playlists...',
      'Converting track formats...',
      'Matching songs...',
      'Creating playlists...',
      'Syncing complete!',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSyncStatus(prev => ({
        ...prev,
        progress: ((i + 1) / steps.length) * 100,
        message: steps[i],
      }));
    }

    // Update last sync time for both platforms
    setPlatforms(prev =>
      prev.map(p =>
        p.id === fromPlatform || p.id === toPlatform
          ? { ...p, lastSync: new Date() }
          : p
      )
    );

    setSyncStatus({
      isActive: false,
      progress: 100,
      message: 'Sync completed successfully!',
    });

    setTimeout(() => {
      setSyncStatus(prev => ({ ...prev, message: 'Ready to sync' }));
    }, 3000);
  }, []);

  return {
    platforms,
    syncStatus,
    connectPlatform,
    disconnectPlatform,
    syncPlaylists,
  };
};