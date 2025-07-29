import { useState } from "react";
import { User, Shield, Palette, Volume2, Wifi, Download, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PlatformConnection } from "@/components/PlatformConnection";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSync: true,
    darkMode: true,
    focusMode: false,
    downloadQuality: "high",
    volume: [75],
    crossfade: [3]
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="platforms" className="flex items-center gap-2">
            <Wifi className="w-4 h-4" />
            Platforms
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Volume2 className="w-4 h-4" />
            Audio
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="musiclover42" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="user@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" defaultValue="Music Lover" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="overflow-y-auto scrollbar-hide max-h-[70vh] space-y-6 pr-2">
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <PlatformConnection 
                platform="Spotify" 
                connected={true} 
                description="Sync playlists and listen history"
              />
              <PlatformConnection 
                platform="YouTube Music" 
                connected={false} 
                description="Import playlists and discover music"
              />
              <PlatformConnection 
                platform="SoundCloud" 
                connected={true} 
                description="Access independent artists and tracks"
              />
              <PlatformConnection 
                platform="Apple Music" 
                connected={false} 
                description="Sync your Apple Music library"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-sync playlists</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync changes across platforms</p>
                </div>
                <Switch 
                  checked={settings.autoSync} 
                  onCheckedChange={(checked) => updateSetting('autoSync', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Sync frequency</Label>
                <Select defaultValue="hourly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Every hour</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audio Quality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Download Quality</Label>
                <Select value={settings.downloadQuality} onValueChange={(value) => updateSetting('downloadQuality', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low (96 kbps)</SelectItem>
                    <SelectItem value="medium">Medium (160 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                    <SelectItem value="lossless">Lossless (FLAC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Volume: {settings.volume[0]}%</Label>
                <Slider
                  value={settings.volume}
                  onValueChange={(value) => updateSetting('volume', value)}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <Label>Crossfade: {settings.crossfade[0]}s</Label>
                <Slider
                  value={settings.crossfade}
                  onValueChange={(value) => updateSetting('crossfade', value)}
                  max={12}
                  step={1}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Use dark theme</p>
                </div>
                <Switch 
                  checked={settings.darkMode} 
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-6 gap-2">
                  {['purple', 'blue', 'green', 'orange', 'red', 'pink'].map((color) => (
                    <div
                      key={color}
                      className={`w-8 h-8 rounded-full bg-${color}-500 cursor-pointer border-2 border-transparent hover:border-foreground`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Share listening activity</Label>
                  <p className="text-sm text-muted-foreground">Let others see what you're listening to</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Analytics collection</Label>
                  <p className="text-sm text-muted-foreground">Help improve the app with usage data</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about new features</p>
                </div>
                <Switch 
                  checked={settings.notifications} 
                  onCheckedChange={(checked) => updateSetting('notifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Sync completion alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when playlist sync is complete</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Focus session reminders</Label>
                  <p className="text-sm text-muted-foreground">Remind you to take breaks during long sessions</p>
                </div>
                <Switch 
                  checked={settings.focusMode} 
                  onCheckedChange={(checked) => updateSetting('focusMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}