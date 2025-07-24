import { useState } from "react";
import { Play, Pause, RotateCcw, Target, Clock, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function FocusMeter() {
  const [isActive, setIsActive] = useState(false);
  const [currentScore, setCurrentScore] = useState(87);
  const [sessionTime, setSessionTime] = useState("00:45:32");

  const focusData = [
    { period: "Morning", score: 92, sessions: 3, time: "2h 15m" },
    { period: "Afternoon", score: 85, sessions: 2, time: "1h 30m" },
    { period: "Evening", score: 78, sessions: 1, time: "45m" },
  ];

  const weeklyProgress = [
    { day: "Mon", score: 88 },
    { day: "Tue", score: 92 },
    { day: "Wed", score: 85 },
    { day: "Thu", score: 90 },
    { day: "Fri", score: 87 },
    { day: "Sat", score: 82 },
    { day: "Sun", score: 89 },
  ];

  return (
    <div className="space-y-6">
      {/* Current Session */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Focus Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent transition-all duration-1000"
                style={{ 
                  transform: `rotate(${(currentScore / 100) * 360}deg)`,
                  borderTopColor: 'transparent'
                }}
              ></div>
              <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{currentScore}%</div>
                  <div className="text-xs text-muted-foreground">Focus</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-2xl font-mono text-foreground">{sessionTime}</div>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant={isActive ? "secondary" : "default"}
                  onClick={() => setIsActive(!isActive)}
                >
                  {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isActive ? "Pause" : "Start"} Session
                </Button>
                <Button variant="outline" size="icon">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Today's Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {focusData.map((period) => (
              <div key={period.period} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{period.period}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {period.time} • {period.sessions} sessions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={period.score >= 90 ? "default" : period.score >= 80 ? "secondary" : "outline"}>
                    {period.score}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Focus Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyProgress.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <div className="w-10 text-sm text-muted-foreground">{day.day}</div>
                <div className="flex-1">
                  <Progress value={day.score} className="h-2" />
                </div>
                <div className="w-12 text-sm text-right">{day.score}%</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Weekly Average</span>
              <span className="font-medium">87.6%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}