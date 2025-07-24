import { useState } from "react";
import { Plus, Search, Music, Users, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreatePlaylistForm } from "@/components/CreatePlaylistForm";

const mockPlaylists = [
  {
    id: 1,
    name: "Chill Vibes",
    description: "Perfect for relaxing and unwinding",
    songCount: 42,
    duration: "2h 18m",
    isPublic: true,
    cover: "/placeholder.svg",
    platforms: ["Spotify", "YouTube"],
    lastUpdated: "2 days ago"
  },
  {
    id: 2,
    name: "Workout Mix",
    description: "High energy tracks for the gym",
    songCount: 28,
    duration: "1h 45m",
    isPublic: false,
    cover: "/placeholder.svg",
    platforms: ["Spotify", "SoundCloud"],
    lastUpdated: "1 week ago"
  },
  {
    id: 3,
    name: "Study Focus",
    description: "Instrumental music for concentration",
    songCount: 35,
    duration: "2h 32m",
    isPublic: true,
    cover: "/placeholder.svg",
    platforms: ["YouTube", "SoundCloud"],
    lastUpdated: "3 days ago"
  }
];

export default function Playlists() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredPlaylists = mockPlaylists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    playlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Playlists</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4" />
              Create Playlist
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Playlist</DialogTitle>
            </DialogHeader>
            <CreatePlaylistForm onClose={() => setIsCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search playlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaylists.map((playlist) => (
          <Card key={playlist.id} className="group hover:shadow-glow transition-all duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={playlist.cover} />
                    <AvatarFallback>
                      <Music className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {playlist.name}
                    </CardTitle>
                    <div className="flex items-center gap-1 mt-1">
                      {playlist.isPublic ? (
                        <Globe className="w-3 h-3 text-muted-foreground" />
                      ) : (
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {playlist.isPublic ? "Public" : "Private"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {playlist.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{playlist.songCount} songs</span>
                <span>{playlist.duration}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {playlist.platforms.map((platform) => (
                    <Badge key={platform} variant="outline" className="text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  {playlist.lastUpdated}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlaylists.length === 0 && (
        <Card className="p-8 text-center">
          <CardContent>
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "No playlists match your search." : "No playlists yet. Create your first one!"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="w-4 h-4" />
                Create Playlist
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}