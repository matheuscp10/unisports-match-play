
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Flag, Eye, Bell, Share2 } from "lucide-react";
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
      quarter: "Q4"
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
      quarter: "2nd Half"
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
      quarter: "3rd Set"
    },
    {
      id: 4,
      sport: "Tennis",
      team1: "Duke Blue Devils",
      team2: "UNC Tar Heels",
      score1: 6,
      score2: 4,
      status: "Finished",
      time: "Final",
      quarter: "Set 2"
    }
  ];

  const toggleFollow = (matchId: number) => {
    setFollowedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Live Scores</h2>
        <Badge variant="secondary" className="animate-pulse">
          <Flag className="h-3 w-3 mr-1" />
          {liveMatches.filter(m => m.status === "Live").length} Live
        </Badge>
      </div>

      <div className="grid gap-4">
        {liveMatches.map((match) => (
          <Card key={match.id} className="hover-scale transition-all duration-300 hover:shadow-lg">
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
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{match.quarter}</Badge>
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
                  <div className="text-3xl font-bold text-blue-600">
                    {match.score1} - {match.score2}
                  </div>
                </div>
                
                <div className="text-left">
                  <div className="font-semibold text-lg">{match.team2}</div>
                </div>
              </div>

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
        ))}
      </div>
    </div>
  );
};

export default LiveScores;
