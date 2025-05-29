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

  const nationalCups = {
    "Basketball": {
      currentRound: "Quarter Finals",
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
    },
    "Football (Soccer)": {
      currentRound: "Semi Finals",
      matches: [
        { team1: "Oxford Blues", team2: "Cambridge Light Blues", date: "April 20", venue: "Wembley Stadium", country: "United Kingdom" },
        { team1: "Imperial Lions", team2: "UCL Bears", date: "April 20", venue: "Old Trafford", country: "United Kingdom" }
      ],
      pastResults: [
        { round: "Quarter Finals", team1: "Oxford Blues", score1: 2, team2: "King's Eagles", score2: 0, country: "United Kingdom" },
        { round: "Quarter Finals", team1: "Cambridge Light Blues", score1: 3, team2: "Edinburgh Scots", score2: 1, country: "United Kingdom" }
      ]
    },
    "Tennis": {
      currentRound: "Finals",
      matches: [
        { team1: "Toronto Varsity Blues", team2: "McGill Redbirds", date: "May 15", venue: "Rogers Cup Centre", country: "Canada" }
      ],
      pastResults: [
        { round: "Semi Finals", team1: "Toronto Varsity Blues", score1: 6, team2: "UBC Thunderbirds", score2: 3, country: "Canada" },
        { round: "Semi Finals", team1: "McGill Redbirds", score1: 6, team2: "Alberta Golden Bears", score2: 2, country: "Canada" }
      ]
    },
    "Volleyball": {
      currentRound: "Quarter Finals",
      matches: [
        { team1: "UCLA Bruins", team2: "USC Trojans", date: "March 25", venue: "Pauley Pavilion", country: "United States" },
        { team1: "Stanford Cardinals", team2: "Berkeley Bears", date: "March 25", venue: "Maples Pavilion", country: "United States" }
      ],
      pastResults: [
        { round: "Round of 16", team1: "UCLA Bruins", score1: 3, team2: "Oregon Ducks", score2: 1, country: "United States" },
        { round: "Round of 16", team1: "USC Trojans", score1: 3, team2: "Arizona Wildcats", score2: 0, country: "United States" }
      ]
    }
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
  const currentNationalCup = activeFilters.sport && nationalCups[activeFilters.sport as keyof typeof nationalCups] 
    ? nationalCups[activeFilters.sport as keyof typeof nationalCups] 
    : nationalCups["Basketball"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">League Statistics</h2>
        <Badge variant="secondary" className="animate-pulse bg-green-100 text-green-700 border-green-300">
          <Trophy className="h-3 w-3 mr-1" />
          Season 2024
        </Badge>
      </div>

      <Tabs defaultValue="leagues" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100 border border-green-700/50">
          <TabsTrigger value="leagues" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">University Leagues</TabsTrigger>
          <TabsTrigger value="national" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">National Cup</TabsTrigger>
        </TabsList>

        <TabsContent value="leagues" className="space-y-6">
          {filteredLeagues.length > 0 ? (
            filteredLeagues.map((conference, index) => (
              <Card key={index} className="hover-scale bg-white border-green-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <Medal className="h-5 w-5 text-green-600" />
                    {conference.league} - {conference.sport}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-green-200">
                        <TableHead className="text-black font-semibold">Rank</TableHead>
                        <TableHead className="text-black font-semibold">Team</TableHead>
                        <TableHead className="text-black font-semibold">W</TableHead>
                        <TableHead className="text-black font-semibold">L</TableHead>
                        <TableHead className="text-black font-semibold">Points</TableHead>
                        <TableHead className="text-black font-semibold">Last Match</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {conference.teams.map((team, teamIndex) => (
                        <TableRow key={teamIndex} className="border-green-100">
                          <TableCell className="font-bold text-black">{teamIndex + 1}</TableCell>
                          <TableCell className="font-semibold text-black">{team.name}</TableCell>
                          <TableCell className="text-green-600 font-semibold">{team.wins}</TableCell>
                          <TableCell className="text-red-600 font-semibold">{team.losses}</TableCell>
                          <TableCell className="font-bold text-green-600">{team.points}</TableCell>
                          <TableCell>
                            <Badge variant={team.lastMatch.startsWith('W') ? 'default' : 'secondary'} className={team.lastMatch.startsWith('W') ? 'bg-green-600 text-white' : 'bg-red-100 text-red-700'}>
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
            <div className="text-center text-black py-8 bg-white/80 rounded border border-green-200">
              No league data found for the selected filters.
            </div>
          )}
        </TabsContent>

        <TabsContent value="national" className="space-y-6">
          <Card className="hover-scale bg-white border-green-700/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Trophy className="h-5 w-5 text-yellow-500" />
                National University Cup - {activeFilters.sport || "Basketball"} - {currentNationalCup.currentRound}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg text-black">Upcoming Matches</h3>
              {currentNationalCup.matches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold text-black">{match.team1}</div>
                    <div className="text-gray-600">vs</div>
                    <div className="text-lg font-semibold text-black">{match.team2}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-black">{match.date}</div>
                    <div className="text-sm text-gray-700">{match.venue}</div>
                  </div>
                </div>
              ))}
              
              <h3 className="font-semibold text-lg mt-6 text-black">Recent Results</h3>
              {currentNationalCup.pastResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="border-green-700/50 text-green-700 bg-green-50">{result.round}</Badge>
                    <div className="font-semibold text-black">{result.team1}</div>
                    <div className="text-2xl font-bold text-green-600">{result.score1} - {result.score2}</div>
                    <div className="font-semibold text-black">{result.team2}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeagueStatistics;
