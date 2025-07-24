import { Play, Pause, UserPlus, UserCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Artist {
  id: number;
  name: string;
  followers: string;
  cover: string;
}

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer text-center">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="relative">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={artist.cover} className="object-cover" />
              <AvatarFallback className="text-xl font-bold">
                {artist.name.split(' ').map(n => n.charAt(0)).join('')}
              </AvatarFallback>
            </Avatar>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {artist.name}
            </h3>
            <p className="text-sm text-muted-foreground">{artist.followers} followers</p>
          </div>
          
          <Button
            variant={isFollowing ? "secondary" : "outline"}
            size="sm"
            onClick={() => setIsFollowing(!isFollowing)}
            className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {isFollowing ? (
              <>
                <UserCheck className="w-4 h-4 mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Follow
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}