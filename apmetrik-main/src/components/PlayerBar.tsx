import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useMusicPlayerContext } from "@/contexts/MusicPlayerContext";

export function PlayerBar() {
  const { 
    currentTrack, 
    isPlaying, 
    volume, 
    progress, 
    togglePlayPause, 
    setVolume: setPlayerVolume, 
    setProgress: setPlayerProgress,
    nextTrack,
    previousTrack 
  } = useMusicPlayerContext();

  return (
    <div className="bg-player-bg border-t p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Current Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 max-w-xs pl-4">
          <div className="w-14 h-14 bg-gradient-card rounded-lg flex items-center justify-center shadow-card overflow-hidden">
            {currentTrack?.coverUrl ? (
              <img src={currentTrack.coverUrl} alt={currentTrack.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 bg-primary rounded opacity-30"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {currentTrack?.title || "No track selected"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack?.artist || "Unknown artist"}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={previousTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="w-10 h-10 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-200"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={nextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <span>{Math.floor(progress / 60)}:{(progress % 60).toString().padStart(2, '0')}</span>
            <Slider 
              value={[progress]} 
              onValueChange={(value) => setPlayerProgress(value[0])}
              max={currentTrack?.duration || 100}
              step={1}
              className="flex-1"
            />
            <span>{currentTrack ? Math.floor(currentTrack.duration / 60) : 0}:{currentTrack ? (currentTrack.duration % 60).toString().padStart(2, '0') : '00'}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 min-w-0 flex-1 max-w-xs justify-end pr-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider 
            value={[volume]} 
            onValueChange={(value) => setPlayerVolume(value[0])}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      </div>
    </div>
  );
}