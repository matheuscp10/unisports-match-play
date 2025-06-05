
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, MapPin, Users, Trophy, TrendingUp, Calendar, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MatchDetailsProps {
  match: {
    id: number;
    sport: string;
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    status: string;
    time: string;
    quarter: string;
  };
}

const MatchDetails = ({ match }: MatchDetailsProps) => {
  const { toast } = useToast();

  const handleViewStatistics = () => {
    toast({
      title: "Statistics Opened",
      description: `Viewing detailed statistics for ${match.team1} vs ${match.team2}`,
    });
    console.log(`Opening statistics for match: ${match.team1} vs ${match.team2}`);
  };

  const handleFollowTeam = () => {
    toast({
      title: "Team Followed",
      description: `You are now following updates for ${match.team1} and ${match.team2}`,
    });
    console.log(`Following teams: ${match.team1} and ${match.team2}`);
  };

  const handleShareMatch = () => {
    const shareUrl = `${window.location.origin}/?match=${match.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link Copied! 🔗",
        description: "Match link has been copied to your clipboard. Share it with friends!",
        duration: 3000,
      });
    }).catch(() => {
      toast({
        title: "Share Match",
        description: `Share this match: ${match.team1} vs ${match.team2}`,
        duration: 5000,
      });
    });
  };

  const playerStats = [
    { name: "John Smith", team: match.team1, points: 24, assists: 8, rebounds: 6 },
    { name: "Mike Johnson", team: match.team1, points: 18, assists: 4, rebounds: 12 },
    { name: "Alex Brown", team: match.team2, points: 22, assists: 6, rebounds: 5 },
    { name: "Chris Wilson", team: match.team2, points: 16, assists: 10, rebounds: 3 },
  ];

  const teamStats = [
    { stat: "Field Goals", team1: "28/45 (62%)", team2: "25/48 (52%)" },
    { stat: "3-Point", team1: "12/20 (60%)", team2: "8/25 (32%)" },
    { stat: "Free Throws", team1: "10/12 (83%)", team2: "14/18 (78%)" },
    { stat: "Rebounds", team1: "32", team2: "29" },
  ];

  return (
    <Card className="w-full max-w-4xl bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-black">
            <Trophy className="h-5 w-5" />
            Match Details
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleShareMatch}
              className="text-white bg-black border-black hover:bg-gray-800"
            >
              <Share className="h-4 w-4" />
            </Button>
            <Badge variant={match.status === "Live" ? "destructive" : "secondary"} className="text-black">
              {match.status}
            </Badge>
            <Badge variant="outline" className="text-black border-black">{match.sport}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Score Section */}
        <div className="text-center space-y-4">
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-right">
              <h3 className="text-xl font-bold text-black">{match.team1}</h3>
              <p className="text-sm text-gray-600">Home</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">
                {match.score1} - {match.score2}
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-black mt-2">
                <Clock className="h-4 w-4" />
                {match.time} • {match.quarter}
              </div>
            </div>
            
            <div className="text-left">
              <h3 className="text-xl font-bold text-black">{match.team2}</h3>
              <p className="text-sm text-gray-600">Away</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4 text-sm text-black">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              University Stadium
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              3,247 spectators
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Today, 7:30 PM
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <Tabs defaultValue="team-stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger value="team-stats" className="text-black data-[state=active]:bg-green-800 data-[state=active]:text-white">Team Stats</TabsTrigger>
            <TabsTrigger value="player-stats" className="text-black data-[state=active]:bg-green-800 data-[state=active]:text-white">Player Stats</TabsTrigger>
            <TabsTrigger value="timeline" className="text-black data-[state=active]:bg-green-800 data-[state=active]:text-white">Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="team-stats" className="space-y-4">
            <div className="space-y-3">
              {teamStats.map((stat, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 items-center p-3 bg-gray-50 rounded">
                  <div className="text-right font-medium text-black">{stat.team1}</div>
                  <div className="text-center text-sm text-black">{stat.stat}</div>
                  <div className="text-left font-medium text-black">{stat.team2}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="player-stats" className="space-y-4">
            <div className="space-y-3">
              {playerStats.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-black">{player.name}</div>
                    <div className="text-sm text-gray-600">{player.team}</div>
                  </div>
                  <div className="flex gap-4 text-sm text-black">
                    <span>{player.points} PTS</span>
                    <span>{player.assists} AST</span>
                    <span>{player.rebounds} REB</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-black">Goal! {match.team1}</div>
                  <div className="text-sm text-gray-600">18:45 - John Smith scores</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-black">Timeout</div>
                  <div className="text-sm text-gray-600">15:30 - {match.team2} calls timeout</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium text-black">Foul</div>
                  <div className="text-sm text-gray-600">12:15 - Personal foul on Alex Brown</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            className="flex-1 text-white bg-green-700 border-green-600 hover:bg-green-800"
            onClick={handleViewStatistics}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            View Statistics
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-white bg-green-700 border-green-600 hover:bg-green-800"
            onClick={handleFollowTeam}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Follow Team
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchDetails;
