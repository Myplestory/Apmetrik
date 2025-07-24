import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PlayerBar } from "@/components/PlayerBar";
import { DashboardCard } from "@/components/DashboardCard";
import { RecentPlaylist } from "@/components/RecentPlaylist";
import { Music, Clock, Headphones, TrendingUp, Play, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import mockimage from "@/assets/cover.jpg";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-background-elevated border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back!</h1>
                <p className="text-sm text-muted-foreground">Ready to sync your music across platforms?</p>
              </div>
            </div>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-200">
              <Play className="h-4 w-4 mr-2" />
              Quick Sync
            </Button>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-auto">
            {/* Hero Section */}
            <div className="relative mb-8 rounded-2xl overflow-hidden">
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${mockimage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
                <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                  <h2 className="text-4xl font-bold text-foreground mb-2">
                    Your Music, <span className="text-transparent bg-clip-text bg-gradient-primary">Everywhere</span>
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4 max-w-md">
                    Seamlessly sync and manage your playlists across Spotify, YouTube, SoundCloud and more.
                  </p>
                  <div className="flex gap-3">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                      Start Syncing
                    </Button>
                    <Button size="lg" variant="secondary" className="hover:bg-secondary-hover">
                      View Analytics
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <DashboardCard
                title="Total Tracks"
                value="2,847"
                description="Across all platforms"
                icon={Music}
                trend={{ value: 12, isPositive: true }}
              />
              <DashboardCard
                title="Listen Time"
                value="47.2h"
                description="This week"
                icon={Clock}
                trend={{ value: 8, isPositive: true }}
              />
              <DashboardCard
                title="Active Sessions"
                value="3"
                description="Currently syncing"
                icon={Headphones}
              />
              <DashboardCard
                title="Focus Score"
                value="87%"
                description="Productivity metric"
                icon={TrendingUp}
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Playlists */}
              <div className="lg:col-span-2">
                <RecentPlaylist />
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="bg-card-hover border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="secondary" className="w-full justify-start hover:bg-secondary-hover">
                      <Music className="h-4 w-4 mr-3" />
                      Import Playlist
                    </Button>
                    <Button variant="secondary" className="w-full justify-start hover:bg-secondary-hover">
                      <Users className="h-4 w-4 mr-3" />
                      Share Collection
                    </Button>
                    <Button variant="secondary" className="w-full justify-start hover:bg-secondary-hover">
                      <TrendingUp className="h-4 w-4 mr-3" />
                      View Metrics
                    </Button>
                  </CardContent>
                </Card>

                {/* Platform Status */}
                <Card className="bg-card-hover border-border shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Platform Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'Spotify', status: 'Connected', color: 'bg-[#1DB954]' },
                      { name: 'YouTube Music', status: 'Connected', color: 'bg-[#FF0000]' },
                      { name: 'SoundCloud', status: 'Pending', color: 'bg-[#FF5500]' },
                    ].map((platform) => (
                      <div key={platform.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                          <span className="text-sm font-medium">{platform.name}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          platform.status === 'Connected' 
                            ? 'bg-success/20 text-success' 
                            : 'bg-warning/20 text-warning'
                        }`}>
                          {platform.status}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          {/* Player Bar */}
          <PlayerBar />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;