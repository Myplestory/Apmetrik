import { Play, Pause, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
  cover: string;
}

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="relative">
            <Avatar className="w-full h-auto aspect-square">
              <AvatarImage src={album.cover} className="object-cover" />
              <AvatarFallback className="text-2xl font-bold">
                {album.title.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          </div>
          
          <div className="space-y-1">
            <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {album.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
            <p className="text-xs text-muted-foreground">{album.year}</p>
          </div>
          
          <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Play Album</DropdownMenuItem>
                <DropdownMenuItem>Add to Queue</DropdownMenuItem>
                <DropdownMenuItem>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem>View Artist</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}