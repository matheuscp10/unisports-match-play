
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, Eye, Bell, Share2, Clock, TrendingUp } from "lucide-react";
import MatchDetails from "./MatchDetails";

const LiveScores = () => {
  const [followedMatches, setFollowedMatches] = useState<number[]>([]);

  const liveMatches = [
    {
      id: 1,
      sport: "Basketball",
      team1: "MIT Eagles",
      team2: "Harvard Crimson",
      score1: 78,
      score2: 72,
      status: "Live",
      time: "18:45",
      quarter: "Q4",
      league: "Eastern Conference",
      venue: "MIT Gymnasium"
    },
    {
      id: 2,
      sport: "Soccer",
      team1: "Stanford Cardinals",
      team2: "Berkeley Bears",
      score1: 2,
      score2: 1,
      status: "Live",
      time: "67'",
      quarter: "2nd Half",
      league: "Western Conference",
      venue: "Stanford Stadium"
    },
    {
      id: 3,
      sport: "Volleyball",
      team1: "UCLA Bruins",
      team2: "USC Trojans",
      score1: 21,
      score2: 19,
      status: "Live",
      time: "Set 3",
      quarter: "3rd Set",
      league: "Pac-12",
      venue: "Pauley Pavilion"
    }
  ];

  const upcomingMatches = [
    {
      id: 4,
      sport: "Tennis",
      team1: "Duke Blue Devils",
      team2: "UNC Tar Heels",
      status: "Today",
      time: "4:00 PM",
      league: "ACC",
      venue: "Duke Tennis Center"
    },
    {
      id: 5,
      sport: "Basketball",
      team1: "Yale Bulldogs",
      team2: "Princeton Tigers",
      status: "Tomorrow",
      time: "7:00 PM",
      league: "Ivy League",
      venue: "Jadwin Gymnasium"
    }
  ];

  const recentResults = [
    {
      id: 6,
      sport: "Soccer",
      team1: "Columbia Lions",
      team2: "Cornell Big Red",
      score1: 3,
      score2: 1,
      status: "Final",
      time: "Yesterday",
      league: "Ivy League"
    },
    {
      id: 7,
      sport: "Volleyball",
      team1: "Northwestern Wildcats",
      team2: "Illinois Fighting Illini",
      score1: 25,
      score2: 23,
      status: "Final",
      time: "2 days ago",
      league: "Big Ten"
    }
  ];

  const toggleFollow = (matchId: number) => {
    setFollowedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const MatchCard = ({ match, showScore = true }: { match: any, showScore?: boolean }) => (
    <Card className="hover-scale transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Badge 
              variant={match.status === "Live" ? "default" : "secondary"}
              className={match.status === "Live" ? "bg-red-500 animate-pulse" : ""}
            >
              {match.sport}
            </Badge>
            <span className="text-sm text-gray-500">{match.time}</span>
            {match.league && (
              <Badge variant="outline" className="text-xs">{match.league}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {match.quarter && (
              <Badge variant="outline">{match.quarter}</Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFollow(match.id)}
              className={followedMatches.includes(match.id) ? "text-blue-600" : ""}
            >
              <Bell className={`h-4 w-4 ${followedMatches.includes(match.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-right">
            <div className="font-semibold text-lg">{match.team1}</div>
          </div>
          
          <div className="text-center">
            {showScore ? (
              <div className="text-3xl font-bold text-blue-600">
                {match.score1} - {match.score2}
              </div>
            ) : (
              <div className="text-lg font-semibold text-gray-600">vs</div>
            )}
          </div>
          
          <div className="text-left">
            <div className="font-semibold text-lg">{match.team2}</div>
          </div>
        </div>

        {match.venue && (
          <div className="mt-3 text-center text-sm text-gray-500">
            📍 {match.venue}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <MatchDetails match={match} />
            </DialogContent>
          </Dialog>
          
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Live Scores</h2>
        <Badge variant="secondary" className="animate-pulse">
          <Flag className="h-3 w-3 mr-1" />
          {liveMatches.length} Live
        </Badge>
      </div>

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="live" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            Live ({liveMatches.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Upcoming ({upcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {liveMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} showScore={false} />
          ))}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {recentResults.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveScores;
