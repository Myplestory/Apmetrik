import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface SearchFilters {
  platforms: string[];
  genres: string[];
  duration: string;
}

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters: SearchFilters) => void;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search songs, artists, albums...",
  onSearch,
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    platforms: [],
    genres: [],
    duration: "",
  });

  const platforms = [
    { id: "spotify", name: "Spotify" },
    { id: "youtube", name: "YouTube Music" },
    { id: "soundcloud", name: "SoundCloud" },
    { id: "local", name: "Local Files" },
  ];

  const genres = [
    "Electronic", "Rock", "Pop", "Hip Hop", "Jazz", "Classical", 
    "Ambient", "Synthwave", "House", "Techno"
  ];

  const durations = [
    { id: "short", name: "Short (< 3 min)" },
    { id: "medium", name: "Medium (3-6 min)" },
    { id: "long", name: "Long (> 6 min)" },
  ];

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const clearSearch = () => {
    setQuery("");
    setFilters({ platforms: [], genres: [], duration: "" });
    onSearch("", { platforms: [], genres: [], duration: "" });
  };

  const updateFilter = (type: keyof SearchFilters, value: string, checked: boolean) => {
    setFilters(prev => {
      if (type === 'duration') {
        return { ...prev, duration: checked ? value : "" };
      } else {
        const currentArray = prev[type] as string[];
        return {
          ...prev,
          [type]: checked 
            ? [...currentArray, value]
            : currentArray.filter(item => item !== value)
        };
      }
    });
  };

  const activeFiltersCount = filters.platforms.length + filters.genres.length + (filters.duration ? 1 : 0);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Filter className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h4 className="font-medium">Search Filters</h4>
            
            <div>
              <Label className="text-sm font-medium">Platforms</Label>
              <div className="mt-2 space-y-2">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={platform.id}
                      checked={filters.platforms.includes(platform.id)}
                      onCheckedChange={(checked) => 
                        updateFilter('platforms', platform.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={platform.id} className="text-sm">
                      {platform.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Genres</Label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {genres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={filters.genres.includes(genre)}
                      onCheckedChange={(checked) => 
                        updateFilter('genres', genre, checked as boolean)
                      }
                    />
                    <Label htmlFor={genre} className="text-xs">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Duration</Label>
              <div className="mt-2 space-y-2">
                {durations.map((duration) => (
                  <div key={duration.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={duration.id}
                      checked={filters.duration === duration.id}
                      onCheckedChange={(checked) => 
                        updateFilter('duration', duration.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={duration.id} className="text-sm">
                      {duration.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSearch}
                className="flex-1"
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                onClick={handleSearch}
                className="flex-1"
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}