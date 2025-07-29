import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scrollarea";
import { Play, Pause, MoreHorizontal, Heart } from "lucide-react";
import { Track } from "@/hooks/useMusicPlayer";
import { formatDuration } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TrackListProps {
  tracks: Track[];
  currentTrack?: Track | null;
  isPlaying?: boolean;
  onTrackSelect: (track: Track, index: number) => void;
  onTogglePlayPause: () => void;
}

export function TrackList({
  tracks,
  currentTrack,
  isPlaying = false,
  onTrackSelect,
  onTogglePlayPause,
}: TrackListProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-1">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          
          return (
            <div
              key={track.id}
              className="group flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => onTrackSelect(track, index)}
            >
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={track.coverUrl}
                  alt={track.album}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isCurrentTrack) {
                        onTogglePlayPause();
                      } else {
                        onTrackSelect(track, index);
                      }
                    }}
                  >
                    {isCurrentTrack && isPlaying ? (
                      <Pause className="h-3 w-3" />
                    ) : (
                      <Play className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate ${
                  isCurrentTrack ? 'text-primary' : 'text-foreground'
                }`}>
                  {track.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {track.artist}
                </p>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Heart className="h-3 w-3" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Add to playlist</DropdownMenuItem>
                    <DropdownMenuItem>Add to queue</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Go to artist</DropdownMenuItem>
                    <DropdownMenuItem>Go to album</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      Remove from library
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <span className="text-xs text-muted-foreground w-12 text-right">
                {formatDuration(track.duration)}
              </span>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}