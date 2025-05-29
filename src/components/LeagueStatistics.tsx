
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, TrendingUp } from "lucide-react";

interface LeagueStatisticsProps {
  activeFilters?: {
    country: string;
    university: string;
    sport: string;
  };
}

const LeagueStatistics = ({ activeFilters = { country: "", university: "", sport: "" } }: LeagueStatisticsProps) => {
  const universityLeagues = [
    {
      league: "Eastern Conference",
      sport: "Basketball",
      country: "United States",
      teams: [
        { name: "MIT Eagles", wins: 18, losses: 3, points: 54, lastMatch: "W 78-72", university: "MIT" },
        { name: "Harvard Crimson", wins: 16, losses: 5, points: 48, lastMatch: "L 72-78", university: "Harvard University" },
        { name: "Yale Bulldogs", wins: 14, losses: 7, points: 42, lastMatch: "W 85-80", university: "Yale University" },
        { name: "Princeton Tigers", wins: 12, losses: 9, points: 36, lastMatch: "W 90-87", university: "Princeton University" },
        { name: "Columbia Lions", wins: 8, losses: 13, points: 24, lastMatch: "L 65-70", university: "Columbia University" }
      ]
    },
    {
      league: "Western Conference", 
      sport: "Basketball",
      country: "United States",
      teams: [
        { name: "Stanford Cardinals", wins: 19, losses: 2, points: 57, lastMatch: "W 92-85", university: "Stanford University" },
        { name: "UCLA Bruins", wins: 17, losses: 4, points: 51, lastMatch: "W 88-82", university: "University of California - Los Angeles (UCLA)" },
        { name: "USC Trojans", wins: 15, losses: 6, points: 45, lastMatch: "L 75-80", university: "University of Southern California (USC)" },
        { name: "Berkeley Bears", wins: 11, losses: 10, points: 33, lastMatch: "W 77-73", university: "University of California - Berkeley" },
        { name: "Oregon Ducks", wins: 6, losses: 15, points: 18, lastMatch: "L 60-85", university: "University of Oregon" }
      ]
    },
    {
      league: "Premier League",
      sport: "Football (Soccer)",
      country: "United Kingdom",
      teams: [
        { name: "Oxford Blues", wins: 15, losses: 2, points: 45, lastMatch: "W 3-1", university: "University of Oxford" },
        { name: "Cambridge Light Blues", wins: 13, losses: 4, points: 39, lastMatch: "W 2-0", university: "University of Cambridge" },
        { name: "Imperial Lions", wins: 10, losses: 7, points: 30, lastMatch: "L 1-2", university: "Imperial College London" },
        { name: "UCL Bears", wins: 8, losses: 9, points: 24, lastMatch: "W 4-2", university: "University College London (UCL)" },
        { name: "King's Eagles", wins: 4, losses: 13, points: 12, lastMatch: "L 0-3", university: "King's College London" }
      ]
    },
    {
      league: "Canadian University Athletics",
      sport: "Tennis",
      country: "Canada",
      teams: [
        { name: "Toronto Varsity Blues", wins: 20, losses: 1, points: 60, lastMatch: "W 6-2", university: "University of Toronto" },
        { name: "McGill Redbirds", wins: 17, losses: 4, points: 51, lastMatch: "W 6-4", university: "McGill University" },
        { name: "UBC Thunderbirds", wins: 14, losses: 7, points: 42, lastMatch: "L 4-6", university: "University of British Columbia" },
        { name: "Alberta Golden Bears", wins: 9, losses: 12, points: 27, lastMatch: "W 6-3", university: "University of Alberta" },
        { name: "McMaster Marauders", wins: 5, losses: 16, points: 15, lastMatch: "L 2-6", university: "McMaster University" }
      ]
    }
  ];

  const nationalCup = {
    currentRound: "Quarter Finals",
    sport: "Basketball",
    matches: [
      { team1: "Stanford Cardinals", team2: "MIT Eagles", date: "March 15", venue: "Madison Square Garden", country: "United States" },
      { team1: "UCLA Bruins", team2: "Harvard Crimson", date: "March 15", venue: "United Center", country: "United States" },
      { team1: "Duke Blue Devils", team2: "North Carolina", date: "March 16", venue: "Staples Center", country: "United States" },
      { team1: "Kentucky Wildcats", team2: "Kansas Jayhawks", date: "March 16", venue: "TD Garden", country: "United States" }
    ],
    pastResults: [
      { round: "Round of 16", team1: "Stanford Cardinals", score1: 89, team2: "Villanova Wildcats", score2: 76, country: "United States" },
      { round: "Round of 16", team1: "MIT Eagles", score1: 82, team2: "Georgetown Hoyas", score2: 78, country: "United States" },
      { round: "Round of 16", team1: "UCLA Bruins", score1: 91, team2: "Syracuse Orange", score2: 85, country: "United States" },
      { round: "Round of 16", team1: "Harvard Crimson", score1: 79, team2: "Marquette Eagles", score2: 74, country: "United States" }
    ]
  };

  const filterLeagues = () => {
    return universityLeagues.filter(league => {
      const sportMatch = !activeFilters.sport || league.sport === activeFilters.sport;
      const countryMatch = !activeFilters.country || league.country === activeFilters.country;
      
      if (!sportMatch || !countryMatch) return false;
      
      if (activeFilters.university) {
        return league.teams.some(team => team.university === activeFilters.university);
      }
      
      return true;
    }).map(league => ({
      ...league,
      teams: activeFilters.university 
        ? league.teams.filter(team => team.university === activeFilters.university)
        : league.teams
    }));
  };

  const filteredLeagues = filterLeagues();
  const showNationalCup = !activeFilters.sport || nationalCup.sport === activeFilters.sport;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">League Statistics</h2>
        <Badge variant="secondary" className="animate-pulse bg-green-800/30 text-green-300 border-green-700/50">
          <Trophy className="h-3 w-3 mr-1" />
          Season 2024
        </Badge>
      </div>

      <Tabs defaultValue="leagues" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50 border border-green-700/50">
          <TabsTrigger value="leagues" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-green-300">University Leagues</TabsTrigger>
          <TabsTrigger value="national" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-green-300">National Cup</TabsTrigger>
        </TabsList>

        <TabsContent value="leagues" className="space-y-6">
          {filteredLeagues.length > 0 ? (
            filteredLeagues.map((conference, index) => (
              <Card key={index} className="hover-scale bg-black/50 border-green-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Medal className="h-5 w-5 text-green-400" />
                    {conference.league} - {conference.sport}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-700/50">
                        <TableHead className="text-gray-300">Rank</TableHead>
                        <TableHead className="text-gray-300">Team</TableHead>
                        <TableHead className="text-gray-300">W</TableHead>
                        <TableHead className="text-gray-300">L</TableHead>
                        <TableHead className="text-gray-300">Points</TableHead>
                        <TableHead className="text-gray-300">Last Match</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conference.teams.map((team, teamIndex) => (
                        <TableRow key={teamIndex} className="border-green-700/50">
                          <TableCell className="font-bold text-white">{teamIndex + 1}</TableCell>
                          <TableCell className="font-semibold text-white">{team.name}</TableCell>
                          <TableCell className="text-green-400">{team.wins}</TableCell>
                          <TableCell className="text-red-400">{team.losses}</TableCell>
                          <TableCell className="font-bold text-green-400">{team.points}</TableCell>
                          <TableCell>
                            <Badge variant={team.lastMatch.startsWith('W') ? 'default' : 'secondary'} className={team.lastMatch.startsWith('W') ? 'bg-green-800 text-white' : 'bg-red-800/50 text-red-300'}>
                              {team.lastMatch}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No league data found for the selected filters.
            </div>
          )}
        </TabsContent>

        <TabsContent value="national" className="space-y-6">
          {showNationalCup ? (
            <Card className="hover-scale bg-black/50 border-green-700/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  National University Cup - {nationalCup.currentRound}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg text-white">Upcoming Matches</h3>
                {nationalCup.matches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-900/20 rounded-lg border border-green-700/50">
                    <div className="flex items-center space-x-4">
                      <div className="text-lg font-semibold text-white">{match.team1}</div>
                      <div className="text-gray-400">vs</div>
                      <div className="text-lg font-semibold text-white">{match.team2}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">{match.date}</div>
                      <div className="text-sm text-gray-400">{match.venue}</div>
                    </div>
                  </div>
                ))}
                
                <h3 className="font-semibold text-lg mt-6 text-white">Recent Results</h3>
                {nationalCup.pastResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-green-900/30 rounded-lg border border-green-700/50">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="border-green-700/50 text-green-300">{result.round}</Badge>
                      <div className="font-semibold text-white">{result.team1}</div>
                      <div className="text-2xl font-bold text-green-400">{result.score1} - {result.score2}</div>
                      <div className="font-semibold text-white">{result.team2}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No national cup data found for the selected sport.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeagueStatistics;
