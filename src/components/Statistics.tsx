
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Statistics = () => {
  const topPlayers = [
    {
      name: "Alex Johnson",
      university: "MIT",
      sport: "Basketball",
      stats: "24.5 PPG",
      rank: 1
    },
    {
      name: "Sarah Chen",
      university: "Stanford", 
      sport: "Soccer",
      stats: "12 Goals",
      rank: 2
    },
    {
      name: "Mike Rodriguez",
      university: "UCLA",
      sport: "Tennis",
      stats: "18-2 Record",
      rank: 3
    },
    {
      name: "Emma Wilson",
      university: "Harvard",
      sport: "Volleyball",
      stats: "3.8 Kills/Set",
      rank: 4
    }
  ];

  const teamStandings = [
    {
      team: "MIT Eagles",
      sport: "Basketball",
      wins: 18,
      losses: 3,
      winRate: "85.7%"
    },
    {
      team: "Stanford Cardinals",
      sport: "Soccer", 
      wins: 15,
      losses: 4,
      winRate: "78.9%"
    },
    {
      team: "UCLA Bruins",
      sport: "Volleyball",
      wins: 22,
      losses: 2,
      winRate: "91.7%"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Statistics</h2>
        <Button variant="outline" className="hover-scale">
          <Search className="h-4 w-4 mr-2" />
          Advanced Stats
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Players */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Top Players
              <Badge variant="secondary">This Week</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPlayers.map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {player.rank}
                  </div>
                  <div>
                    <div className="font-semibold">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.university}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">{player.stats}</div>
                  <div className="text-xs text-gray-500">{player.sport}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Standings */}
        <Card className="hover-scale">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Team Standings
              <Badge variant="secondary">Current Season</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teamStandings.map((team, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <div className="font-semibold">{team.team}</div>
                  <div className="text-sm text-gray-500">{team.sport}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{team.winRate}</div>
                  <div className="text-xs text-gray-500">{team.wins}W - {team.losses}L</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center hover-scale">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">340</div>
            <div className="text-sm text-gray-500">Games Played</div>
          </CardContent>
        </Card>
        <Card className="text-center hover-scale">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">67</div>
            <div className="text-sm text-gray-500">Tournaments</div>
          </CardContent>
        </Card>
        <Card className="text-center hover-scale">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">1,234</div>
            <div className="text-sm text-gray-500">Athletes</div>
          </CardContent>
        </Card>
        <Card className="text-center hover-scale">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">23</div>
            <div className="text-sm text-gray-500">Universities</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
