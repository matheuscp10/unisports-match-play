
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Bell, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FollowedTeams = () => {
  const { toast } = useToast();

  const followedTeams = [
    {
      name: "MIT Engineers",
      sport: "Basketball",
      league: "NESCAC",
      record: "12-3",
      nextGame: "vs Harvard - Tomorrow 7:00 PM",
      status: "Win Streak (5)"
    },
    {
      name: "Stanford Cardinal",
      sport: "Soccer",
      league: "Pac-12",
      record: "8-2-1",
      nextGame: "vs UCLA - Saturday 3:00 PM",
      status: "Conference Leaders"
    },
    {
      name: "Harvard Crimson",
      sport: "Tennis",
      league: "Ivy League",
      record: "15-1",
      nextGame: "vs Yale - Friday 2:00 PM",
      status: "Undefeated at Home"
    }
  ];

  const handleUnfollow = (teamName: string) => {
    toast({
      title: "Team Unfollowed",
      description: `You will no longer receive updates for ${teamName}`,
      duration: 3000,
    });
  };

  const handleViewStats = (teamName: string) => {
    toast({
      title: "Team Statistics",
      description: `Opening detailed statistics for ${teamName}`,
      duration: 3000,
    });
  };

  return (
    <Card className="bg-white/95 border border-green-700/40 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Heart className="h-5 w-5 text-red-500" />
          Teams I Follow
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {followedTeams.map((team, index) => (
          <Card key={index} className="border border-green-200 hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-bold text-black">{team.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                      {team.sport}
                    </Badge>
                    <span>{team.league}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{team.record}</div>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                    {team.status}
                  </Badge>
                </div>
              </div>
              
              <div className="mb-3 p-2 bg-gray-50 rounded text-sm">
                <div className="flex items-center gap-1 text-black">
                  <Bell className="h-3 w-3" />
                  <span className="font-medium">Next Game:</span>
                </div>
                <div className="text-gray-700">{team.nextGame}</div>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-green-700 border-green-600 hover:bg-green-50"
                  onClick={() => handleViewStats(team.name)}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Stats
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => handleUnfollow(team.name)}
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Unfollow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {followedTeams.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>You haven't followed any teams yet.</p>
            <p className="text-sm">Follow teams from match details to see them here!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowedTeams;
