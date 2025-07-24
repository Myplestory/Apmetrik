import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [progress, setProgress] = useState([35]);

  return (
    <div className="bg-player-bg border-t border-border p-4">
      <div className="flex items-center justify-between gap-4">
        {/* Current Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 max-w-xs">
          <div className="w-14 h-14 bg-gradient-card rounded-lg flex items-center justify-center shadow-card">
            <div className="w-8 h-8 bg-primary rounded opacity-30"></div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">Current Track</p>
            <p className="text-xs text-muted-foreground truncate">Artist Name</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="w-10 h-10 rounded-full bg-gradient-primary hover:shadow-glow transition-all duration-200"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full text-xs text-muted-foreground">
            <span>2:15</span>
            <Slider 
              value={progress} 
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span>4:32</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 min-w-0 flex-1 max-w-xs justify-end">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider 
            value={volume} 
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
}