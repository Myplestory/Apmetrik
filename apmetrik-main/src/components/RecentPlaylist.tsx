import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, MoreHorizontal, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Playlist {
  id: string;
  name: string;
  trackCount: number;
  platform: 'spotify' | 'youtube' | 'soundcloud';
  lastPlayed: string;
  imageUrl?: string;
}

const mockPlaylists: Playlist[] = [
  { id: '1', name: 'Focus Flow', trackCount: 42, platform: 'spotify', lastPlayed: '2 hours ago' },
  { id: '2', name: 'Chill Vibes', trackCount: 28, platform: 'youtube', lastPlayed: '1 day ago' },
  { id: '3', name: 'Work Beats', trackCount: 35, platform: 'soundcloud', lastPlayed: '3 days ago' },
  { id: '4', name: 'Study Session', trackCount: 67, platform: 'spotify', lastPlayed: '1 week ago' },
];

const platformColors = {
  spotify: 'bg-[#1DB954]',
  youtube: 'bg-[#FF0000]', 
  soundcloud: 'bg-[#FF5500]'
};

export function RecentPlaylist() {
  return (
    <Card className="bg-card-hover border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Playlists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockPlaylists.map((playlist) => (
          <div 
            key={playlist.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary-hover transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-card rounded-lg flex items-center justify-center shadow-card">
                <Music className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{playlist.name}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{playlist.trackCount} tracks</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${platformColors[playlist.platform]}`} />
                    <span className="capitalize">{playlist.platform}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{playlist.lastPlayed}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}