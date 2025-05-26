
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, Award, Calendar, Target } from "lucide-react";

const PlayerStats = () => {
  const [playerData] = useState({
    name: "Alex Johnson",
    university: "MIT",
    sport: "Basketball",
    position: "Point Guard",
    year: "Junior",
    stats: {
      season: {
        gamesPlayed: 21,
        pointsPerGame: 24.5,
        assistsPerGame: 8.2,
        reboundsPerGame: 5.1,
        fieldGoalPercentage: 47.8,
        threePointPercentage: 38.9,
        freeThrowPercentage: 86.4
      },
      career: {
        totalGames: 63,
        totalPoints: 1456,
        totalAssists: 487,
        totalRebounds: 312,
        averagePoints: 23.1,
        averageAssists: 7.7,
        averageRebounds: 4.9
      }
    },
    achievements: [
      { title: "Conference Player of the Month", date: "February 2024", icon: "🏆" },
      { title: "Triple-Double vs Harvard", date: "January 2024", icon: "⭐" },
      { title: "50-Point Game vs Yale", date: "December 2023", icon: "🔥" },
      { title: "Team Captain", date: "September 2023", icon: "👑" }
    ],
    recentGames: [
      { opponent: "Harvard", score: "78-72", playerStats: "28 PTS, 12 AST, 6 REB", result: "W" },
      { opponent: "Yale", score: "85-80", playerStats: "22 PTS, 9 AST, 4 REB", result: "W" },
      { opponent: "Princeton", score: "90-87", playerStats: "31 PTS, 7 AST, 8 REB", result: "W" },
      { opponent: "Columbia", score: "65-70", playerStats: "18 PTS, 11 AST, 3 REB", result: "L" },
      { opponent: "Brown", score: "92-85", playerStats: "26 PTS, 8 AST, 7 REB", result: "W" }
    ]
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">My Stats</h2>
        <Badge variant="secondary">
          <Target className="h-3 w-3 mr-1" />
          {playerData.sport}
        </Badge>
      </div>

      {/* Player Profile */}
      <Card className="hover-scale">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {playerData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">{playerData.name}</h3>
              <div className="flex items-center space-x-2 text-gray-600">
                <span>{playerData.university}</span>
                <span>•</span>
                <span>{playerData.position}</span>
                <span>•</span>
                <span>{playerData.year}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="season" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="season">Season Stats</TabsTrigger>
          <TabsTrigger value="career">Career Stats</TabsTrigger>
          <TabsTrigger value="games">Recent Games</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="season" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600">{playerData.stats.season.pointsPerGame}</div>
                <div className="text-sm text-gray-500">PPG</div>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600">{playerData.stats.season.assistsPerGame}</div>
                <div className="text-sm text-gray-500">APG</div>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600">{playerData.stats.season.reboundsPerGame}</div>
                <div className="text-sm text-gray-500">RPG</div>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-orange-600">{playerData.stats.season.fieldGoalPercentage}%</div>
                <div className="text-sm text-gray-500">FG%</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Shooting Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Three-Point %:</span>
                <span className="font-bold text-blue-600">{playerData.stats.season.threePointPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Free Throw %:</span>
                <span className="font-bold text-green-600">{playerData.stats.season.freeThrowPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span>Games Played:</span>
                <span className="font-bold">{playerData.stats.season.gamesPlayed}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="career" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600">{playerData.stats.career.totalPoints}</div>
                <div className="text-sm text-gray-500">Total Points</div>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600">{playerData.stats.career.totalAssists}</div>
                <div className="text-sm text-gray-500">Total Assists</div>
              </CardContent>
            </Card>
            <Card className="text-center hover-scale">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-purple-600">{playerData.stats.career.totalRebounds}</div>
                <div className="text-sm text-gray-500">Total Rebounds</div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle>Career Averages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Points per Game:</span>
                <span className="font-bold text-blue-600">{playerData.stats.career.averagePoints}</span>
              </div>
              <div className="flex justify-between">
                <span>Assists per Game:</span>
                <span className="font-bold text-green-600">{playerData.stats.career.averageAssists}</span>
              </div>
              <div className="flex justify-between">
                <span>Rebounds per Game:</span>
                <span className="font-bold text-purple-600">{playerData.stats.career.averageRebounds}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Games:</span>
                <span className="font-bold">{playerData.stats.career.totalGames}</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="games" className="space-y-4">
          {playerData.recentGames.map((game, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Badge variant={game.result === 'W' ? 'default' : 'secondary'}>
                      {game.result}
                    </Badge>
                    <div>
                      <div className="font-semibold">vs {game.opponent}</div>
                      <div className="text-sm text-gray-500">{game.score}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{game.playerStats}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {playerData.achievements.map((achievement, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <div className="font-semibold text-lg">{achievement.title}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {achievement.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlayerStats;
