import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Music } from "lucide-react";

interface PlatformConnectionProps {
  platform: string;
  connected: boolean;
  description: string;
}

const platformIcons: Record<string, any> = {
  "Spotify": Music,
  "YouTube Music": Music,
  "SoundCloud": Music,
  "Apple Music": Music
};

const platformColors: Record<string, string> = {
  "Spotify": "text-green-500",
  "YouTube Music": "text-red-500",
  "SoundCloud": "text-orange-500",
  "Apple Music": "text-gray-500"
};

export function PlatformConnection({ platform, connected: initialConnected, description }: PlatformConnectionProps) {
  const [connected, setConnected] = useState(initialConnected);
  const [isLoading, setIsLoading] = useState(false);

  const Icon = platformIcons[platform] || Music;
  const iconColor = platformColors[platform] || "text-muted-foreground";

  const handleConnect = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setConnected(!connected);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 ${iconColor}`} />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{platform}</h3>
            {connected && <Badge variant="secondary" className="text-xs">Connected</Badge>}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {connected && (
          <Switch
            checked={true}
            onCheckedChange={() => {}}
            disabled={isLoading}
          />
        )}
        <Button
          variant={connected ? "outline" : "default"}
          onClick={handleConnect}
          disabled={isLoading}
        >
          {isLoading ? "..." : connected ? "Disconnect" : "Connect"}
        </Button>
      </div>
    </div>
  );
}