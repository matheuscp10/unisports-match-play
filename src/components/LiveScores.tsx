
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flag, Eye, Bell, Share2, Clock, TrendingUp } from "lucide-react";
import MatchDetails from "./MatchDetails";
import SportFilters from "./SportFilters";

const LiveScores = () => {
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
    setFollowedMatches(prev => 
      prev.includes(matchId) 
        ? prev.filter(id => id !== matchId)
        : [...prev, matchId]
    );
  };

  const MatchCard = ({ match, showScore = true }: { match: any, showScore?: boolean }) => (
    <Card className="hover-scale transition-all duration-300 hover:shadow-lg bg-black/50 border-green-700/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Badge 
              variant={match.status === "Live" ? "default" : "secondary"}
              className={match.status === "Live" ? "bg-red-500 animate-pulse text-white" : "bg-green-800 text-white"}
            >
              {match.sport}
            </Badge>
            <span className="text-sm text-gray-300">{match.time}</span>
            {match.league && (
              <Badge variant="outline" className="text-xs border-green-700/50 text-green-300">{match.league}</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {match.quarter && (
              <Badge variant="outline" className="border-green-700/50 text-green-300">{match.quarter}</Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFollow(match.id)}
              className={followedMatches.includes(match.id) ? "text-green-400" : "text-gray-400 hover:text-green-400"}
            >
              <Bell className={`h-4 w-4 ${followedMatches.includes(match.id) ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-right">
            <div className="font-semibold text-lg text-white">{match.team1}</div>
          </div>
          
          <div className="text-center">
            {showScore ? (
              <div className="text-3xl font-bold text-green-400">
                {match.score1} - {match.score2}
              </div>
            ) : (
              <div className="text-lg font-semibold text-gray-400">vs</div>
            )}
          </div>
          
          <div className="text-left">
            <div className="font-semibold text-lg text-white">{match.team2}</div>
          </div>
        </div>

        {match.venue && (
          <div className="mt-3 text-center text-sm text-gray-400">
            📍 {match.venue}
          </div>
        )}

        <div className="flex justify-center gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="border-green-700/50 text-green-300 hover:bg-green-800/20">
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-green-700/50">
              <MatchDetails match={match} />
            </DialogContent>
          </Dialog>
          
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-green-400">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 bg-black/30 rounded-lg p-6 border border-green-700/40">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Live Scores</h2>
        <Badge variant="secondary" className="animate-pulse bg-red-500/20 text-red-400 border-red-500/50">
          <Flag className="h-3 w-3 mr-1" />
          {filteredLiveMatches.length} Live
        </Badge>
      </div>

      <SportFilters onFiltersChange={handleFiltersChange} />

      {activeFilters.country && (
        <div className="text-center text-sm text-gray-300 mt-4">
          Showing results for {activeFilters.sport && `${activeFilters.sport} in `}
          {activeFilters.university ? activeFilters.university : activeFilters.country}
        </div>
      )}

      <Tabs defaultValue="live" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/50 border border-green-700/50">
          <TabsTrigger value="live" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-green-300">
            <Flag className="h-4 w-4" />
            Live ({filteredLiveMatches.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-green-300">
            <Clock className="h-4 w-4" />
            Upcoming ({filteredUpcomingMatches.length})
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-green-300">
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
            <div className="text-center text-gray-400 py-8">
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
            <div className="text-center text-gray-400 py-8">
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
            <div className="text-center text-gray-400 py-8">
              No recent results found for the selected filters.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LiveScores;
