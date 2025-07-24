import { useState } from "react";
import { Calendar, TrendingUp, Music, Clock, Headphones, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardCard } from "@/components/DashboardCard";
import { GenreChart } from "@/components/GenreChart";
import { ListeningTimeChart } from "@/components/ListeningTimeChart";
import { FocusMeter } from "@/components/FocusMeter";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d");

  const stats = [
    {
      title: "Total Listening Time",
      value: "47.2h",
      description: "This week",
      icon: Clock,
      trend: { value: 12, isPositive: true }
    },
    {
      title: "Songs Played",
      value: "324",
      description: "Tracks completed",
      icon: Music,
      trend: { value: 8, isPositive: true }
    },
    {
      title: "Focus Score",
      value: "87%",
      description: "Average this week",
      icon: Target,
      trend: { value: 5, isPositive: true }
    },
    {
      title: "Active Sessions",
      value: "23",
      description: "Study/work sessions",
      icon: Headphones,
      trend: { value: 3, isPositive: false }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="genres">Genres</TabsTrigger>
          <TabsTrigger value="listening">Listening</TabsTrigger>
          <TabsTrigger value="focus">Focus</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Listening Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ListeningTimeChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Top Genres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GenreChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "2 hours ago", action: "Completed focus session", duration: "45 minutes", score: "92%" },
                  { time: "5 hours ago", action: "Synced playlist to Spotify", playlist: "Study Mix" },
                  { time: "1 day ago", action: "Added 12 songs to library", platform: "YouTube" },
                  { time: "2 days ago", action: "Created new playlist", playlist: "Workout Beats" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.duration && `${activity.duration} • ${activity.score}`}
                      {activity.playlist && activity.playlist}
                      {activity.platform && activity.platform}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genres">
          <Card>
            <CardHeader>
              <CardTitle>Genre Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <GenreChart detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="listening">
          <Card>
            <CardHeader>
              <CardTitle>Listening Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <ListeningTimeChart detailed />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="focus">
          <Card>
            <CardHeader>
              <CardTitle>Focus Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <FocusMeter />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}