import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, Eye, Bell, Share2, Clock, TrendingUp } from "lucide-react";
import MatchDetails from "./MatchDetails";
import SportFilters from "./SportFilters";
import { useToast } from "@/hooks/use-toast";

const LiveScores = () => {
  const { toast } = useToast();
  const [followedMatches, setFollowedMatches] = useState<number[]>([]);
  const [activeFilters, setActiveFilters] = useState({
    country: "",
    university: "",
    sport: ""
  });

  const handleFiltersChange = (filters: { country: string; university: string; sport: string }) => {
    setActiveFilters(filters);
  };

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
      venue: "MIT Gymnasium",
      country: "United States",
      university: "MIT"
    },
    {
      id: 2,
      sport: "Football (Soccer)",
      team1: "Stanford Cardinals",
      team2: "Berkeley Bears",
      score1: 2,
      score2: 1,
      status: "Live",
      time: "67'",
      quarter: "2nd Half",
      league: "Western Conference",
      venue: "Stanford Stadium",
      country: "United States",
      university: "Stanford University"
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
      venue: "Pauley Pavilion",
      country: "United States",
      university: "University of California - Los Angeles (UCLA)"
    },
    {
      id: 8,
      sport: "Tennis",
      team1: "Oxford Blues",
      team2: "Cambridge Light Blues",
      score1: 6,
      score2: 4,
      status: "Live",
      time: "Set 2",
      quarter: "2nd Set",
      league: "Varsity Match",
      venue: "All England Club",
      country: "United Kingdom",
      university: "University of Oxford"
    },
    {
      id: 9,
      sport: "Rugby",
      team1: "Toronto Varsity Blues",
      team2: "McGill Redbirds",
      score1: 14,
      score2: 10,
      status: "Live",
      time: "65'",
      quarter: "2nd Half",
      league: "Canadian University Rugby",
      venue: "Varsity Stadium",
      country: "Canada",
      university: "University of Toronto"
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
      venue: "Duke Tennis Center",
      country: "United States",
      university: "Duke University"
    },
    {
      id: 5,
      sport: "Basketball",
      team1: "Yale Bulldogs",
      team2: "Princeton Tigers",
      status: "Tomorrow",
      time: "7:00 PM",
      league: "Ivy League",
      venue: "Jadwin Gymnasium",
      country: "United States",
      university: "Yale University"
    },
    {
      id: 10,
      sport: "Swimming",
      team1: "Melbourne Uni",
      team2: "Sydney Uni",
      status: "Tomorrow",
      time: "2:00 PM",
      league: "Australian University Games",
      venue: "Melbourne Aquatic Centre",
      country: "Australia",
      university: "University of Melbourne"
    }
  ];

  const recentResults = [
    {
      id: 6,
      sport: "Football (Soccer)",
      team1: "Columbia Lions",
      team2: "Cornell Big Red",
      score1: 3,
      score2: 1,
      status: "Final",
      time: "Yesterday",
      league: "Ivy League",
      country: "United States",
      university: "Columbia University"
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
      league: "Big Ten",
      country: "United States",
      university: "Northwestern University"
    },
    {
      id: 11,
      sport: "Track & Field",
      team1: "Imperial College",
      team2: "King's College London",
      score1: 85,
      score2: 73,
      status: "Final",
      time: "3 days ago",
      league: "London University Athletics",
      country: "United Kingdom",
      university: "Imperial College London"
    }
  ];

  const filterMatches = (matches: any[]) => {
    return matches.filter(match => {
      const sportMatch = !activeFilters.sport || match.sport === activeFilters.sport;
      const countryMatch = !activeFilters.country || match.country === activeFilters.country;
      const universityMatch = !activeFilters.university || match.university === activeFilters.university;
      return sportMatch && countryMatch && universityMatch;
    });
  };

  const filteredLiveMatches = filterMatches(liveMatches);
  const filteredUpcomingMatches = filterMatches(upcomingMatches);
  const filteredRecentResults = filterMatches(recentResults);

  const toggleFollow = (matchId: number) => {
    const isCurrentlyFollowed = followedMatches.includes(matchId);
    
    if (isCurrentlyFollowed) {
      setFollowedMatches(prev => prev.filter(id => id !== matchId));
      // Save to localStorage
      const updatedFollowed = followedMatches.filter(id => id !== matchId);
      localStorage.setItem('followedMatches', JSON.stringify(updatedFollowed));
      
      toast({
        title: "Match Unfollowed",
        description: "You will no longer receive notifications for this match.",
        duration: 3000,
      });
    } else {
      setFollowedMatches(prev => [...prev, matchId]);
      // Save to localStorage
      const updatedFollowed = [...followedMatches, matchId];
      localStorage.setItem('followedMatches', JSON.stringify(updatedFollowed));
      
      toast({
        title: "Match Followed! 🔔",
        description: "You'll receive notifications about this match.",
        duration: 3000,
      });
    }
  };

  const MatchCard = ({ match, showScore = true }: { match: any, showScore?: boolean }) => (
    <Card className="hover-scale transition-all duration-300 hover:shadow-lg bg-white border-green-700/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Badge 
              variant={match.status === "Live" ? "default" : "secondary"}
              className={match.status === "Live" ? "bg-red-500 animate-pulse text-white" : "bg-green-800 text-white"}
            >
              {match.sport}
            </Badge>
            <span className="text-sm text-black font-medium">{match.time}</span>
            {match.league && (
              <Badge variant="outline" className="text-xs border-green-700/50 text-green-700 bg-green-50">{match.league}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {match.quarter && (
              <Badge variant="outline" className="border-green-700/50 text-green-700 bg-green-50">{match.quarter}</Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFollow(match.id)}
              className={followedMatches.includes(match.id) ? "text-green-600 hover:text-green-700" : "text-gray-600 hover:text-green-600"}
            >
              <Bell className={`h-4 w-4 ${followedMatches.includes(match.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-right">
            <div className="font-semibold text-lg text-black">{match.team1}</div>
          </div>
          
          <div className="text-center">
            {showScore ? (
              <div className="text-3xl font-bold text-green-600">
                {match.score1} - {match.score2}
              </div>
            ) : (
              <div className="text-lg font-semibold text-gray-600">vs</div>
            )}
          </div>
          
          <div className="text-left">
            <div className="font-semibold text-lg text-black">{match.team2}</div>
          </div>
        </div>

        {match.venue && (
          <div className="mt-3 text-center text-sm text-gray-700 font-medium">
            📍 {match.venue}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-green-700/50 text-green-700 hover:bg-green-50">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-green-700/50">
              <MatchDetails match={match} />
            </DialogContent>
          </Dialog>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-green-600">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 bg-white/95 rounded-lg p-6 border border-green-700/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">Live Scores</h2>
        <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-600 border-red-300">
          <Flag className="h-3 w-3 mr-1" />
          {filteredLiveMatches.length} Live
        </Badge>
      </div>

      <SportFilters onFiltersChange={handleFiltersChange} />

      {activeFilters.country && (
        <div className="text-center text-sm text-black font-medium mt-4 bg-white/80 p-2 rounded border border-green-200">
          Showing results for {activeFilters.sport && `${activeFilters.sport} in `}
          {activeFilters.university ? activeFilters.university : activeFilters.country}
        </div>
      )}

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 border border-green-700/50">
          <TabsTrigger value="live" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Flag className="h-4 w-4" />
            Live ({filteredLiveMatches.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Clock className="h-4 w-4" />
            Upcoming ({filteredUpcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <TrendingUp className="h-4 w-4" />
            Results ({filteredRecentResults.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4">
          {filteredLiveMatches.length > 0 ? (
            filteredLiveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="text-center text-black py-8 bg-white/80 rounded border border-green-200">
              No live matches found for the selected filters.
            </div>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {filteredUpcomingMatches.length > 0 ? (
            filteredUpcomingMatches.map((match) => (
              <MatchCard key={match.id} match={match} showScore={false} />
            ))
          ) : (
            <div className="text-center text-black py-8 bg-white/80 rounded border border-green-200">
              No upcoming matches found for the selected filters.
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {filteredRecentResults.length > 0 ? (
            filteredRecentResults.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))
          ) : (
            <div className="text-center text-black py-8 bg-white/80 rounded border border-green-200">
              No recent results found for the selected filters.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveScores;
