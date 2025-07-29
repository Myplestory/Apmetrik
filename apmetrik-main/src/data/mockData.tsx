import { Track } from '@/hooks/useMusicPlayer';

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    duration: 244,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    platform: 'spotify',
  },
  {
    id: '2',
    title: 'Strobe',
    artist: 'Deadmau5',
    album: 'For Lack of a Better Name',
    duration: 634,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    platform: 'youtube',
  },
  {
    id: '3',
    title: 'Resonance',
    artist: 'HOME',
    album: 'Odyssey',
    duration: 214,
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    platform: 'soundcloud',
  },
  {
    id: '4',
    title: 'One More Time',
    artist: 'Daft Punk',
    album: 'Discovery',
    duration: 320,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    platform: 'spotify',
  },
  {
    id: '5',
    title: 'Breathe Me',
    artist: 'Sia',
    album: 'Colour the Small One',
    duration: 270,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    platform: 'local',
  },
];

export const mockPlaylists = [
  {
    id: '1',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    tracks: 24,
    duration: 4500,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    platform: 'spotify',
    isPublic: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Workout Mix',
    description: 'High energy tracks',
    tracks: 32,
    duration: 6240,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    platform: 'youtube',
    isPublic: false,
    createdAt: new Date('2024-02-03'),
  },
  {
    id: '3',
    name: 'Focus Deep',
    description: 'Ambient sounds for concentration',
    tracks: 18,
    duration: 7200,
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    platform: 'soundcloud',
    isPublic: true,
    createdAt: new Date('2024-02-10'),
  },
];

export const mockArtists = [
  {
    id: '1',
    name: 'M83',
    followers: 1250000,
    monthlyListeners: 2400000,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    genres: ['Electronic', 'Ambient', 'Synthwave'],
    topTracks: 5,
  },
  {
    id: '2',
    name: 'Deadmau5',
    followers: 3200000,
    monthlyListeners: 5600000,
    imageUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=200&h=200&fit=crop',
    genres: ['Electronic', 'Progressive House', 'Techno'],
    topTracks: 8,
  },
  {
    id: '3',
    name: 'HOME',
    followers: 890000,
    monthlyListeners: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
    genres: ['Synthwave', 'Ambient', 'Electronic'],
    topTracks: 3,
  },
];

export const mockAlbums = [
  {
    id: '1',
    title: 'Hurry Up, We\'re Dreaming',
    artist: 'M83',
    year: 2011,
    tracks: 22,
    duration: 4620,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    genre: 'Electronic',
    platform: 'spotify',
  },
  {
    id: '2',
    title: 'For Lack of a Better Name',
    artist: 'Deadmau5',
    year: 2009,
    tracks: 8,
    duration: 3180,
    coverUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop',
    genre: 'Progressive House',
    platform: 'youtube',
  },
  {
    id: '3',
    title: 'Odyssey',
    artist: 'HOME',
    year: 2014,
    tracks: 12,
    duration: 2940,
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=300&fit=crop',
    genre: 'Synthwave',
    platform: 'soundcloud',
  },
];

export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
};