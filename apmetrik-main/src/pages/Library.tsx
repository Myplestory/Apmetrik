import { useState } from "react";
import { Search, Filter, Grid3X3, List, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SongCard } from "@/components/SongCard";
import { AlbumCard } from "@/components/AlbumCard";
import { ArtistCard } from "@/components/ArtistCard";

const mockSongs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", album: "A Night at the Opera", duration: "5:55", platform: "Spotify" },
  { id: 2, title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:07", platform: "YouTube" },
  { id: 3, title: "Hotel California", artist: "Eagles", album: "Hotel California", duration: "6:30", platform: "SoundCloud" },
];

const mockAlbums = [
  { id: 1, title: "Abbey Road", artist: "The Beatles", year: 1969, cover: "/placeholder.svg" },
  { id: 2, title: "Dark Side of the Moon", artist: "Pink Floyd", year: 1973, cover: "/placeholder.svg" },
  { id: 3, title: "Nevermind", artist: "Nirvana", year: 1991, cover: "/placeholder.svg" },
];

const mockArtists = [
  { id: 1, name: "The Beatles", followers: "31.2M", cover: "/placeholder.svg" },
  { id: 2, name: "Queen", followers: "45.1M", cover: "/placeholder.svg" },
  { id: 3, name: "Pink Floyd", followers: "28.9M", cover: "/placeholder.svg" },
];

export default function Library() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Your Library</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Download All
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search your library..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="songs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="songs">Songs</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>

        <TabsContent value="songs" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{mockSongs.length} songs</p>
            <div className="flex gap-2">
              <Badge variant="outline">Spotify: 1</Badge>
              <Badge variant="outline">YouTube: 1</Badge>
              <Badge variant="outline">SoundCloud: 1</Badge>
            </div>
          </div>
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
            {mockSongs.map((song) => (
              <SongCard key={song.id} song={song} viewMode={viewMode} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="albums" className="space-y-4">
          <p className="text-sm text-muted-foreground">{mockAlbums.length} albums</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="artists" className="space-y-4">
          <p className="text-sm text-muted-foreground">{mockArtists.length} artists</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="playlists" className="space-y-4">
          <p className="text-sm text-muted-foreground">0 playlists</p>
          <Card className="p-8 text-center">
            <CardContent>
              <p className="text-muted-foreground">No playlists found. Create your first playlist!</p>
              <Button className="mt-4">Create Playlist</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}