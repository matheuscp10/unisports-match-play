
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, TrendingUp } from "lucide-react";

const LeagueStatistics = () => {
  const universityLeagues = [
    {
      league: "Eastern Conference",
      teams: [
        { name: "MIT Eagles", wins: 18, losses: 3, points: 54, lastMatch: "W 78-72" },
        { name: "Harvard Crimson", wins: 16, losses: 5, points: 48, lastMatch: "L 72-78" },
        { name: "Yale Bulldogs", wins: 14, losses: 7, points: 42, lastMatch: "W 85-80" },
        { name: "Princeton Tigers", wins: 12, losses: 9, points: 36, lastMatch: "W 90-87" },
        { name: "Columbia Lions", wins: 8, losses: 13, points: 24, lastMatch: "L 65-70" }
      ]
    },
    {
      league: "Western Conference", 
      teams: [
        { name: "Stanford Cardinals", wins: 19, losses: 2, points: 57, lastMatch: "W 92-85" },
        { name: "UCLA Bruins", wins: 17, losses: 4, points: 51, lastMatch: "W 88-82" },
        { name: "USC Trojans", wins: 15, losses: 6, points: 45, lastMatch: "L 75-80" },
        { name: "Berkeley Bears", wins: 11, losses: 10, points: 33, lastMatch: "W 77-73" },
        { name: "Oregon Ducks", wins: 6, losses: 15, points: 18, lastMatch: "L 60-85" }
      ]
    }
  ];

  const nationalCup = {
    currentRound: "Quarter Finals",
    matches: [
      { team1: "Stanford Cardinals", team2: "MIT Eagles", date: "March 15", venue: "Madison Square Garden" },
      { team1: "UCLA Bruins", team2: "Harvard Crimson", date: "March 15", venue: "United Center" },
      { team1: "Duke Blue Devils", team2: "North Carolina", date: "March 16", venue: "Staples Center" },
      { team1: "Kentucky Wildcats", team2: "Kansas Jayhawks", date: "March 16", venue: "TD Garden" }
    ],
    pastResults: [
      { round: "Round of 16", team1: "Stanford Cardinals", score1: 89, team2: "Villanova Wildcats", score2: 76 },
      { round: "Round of 16", team1: "MIT Eagles", score1: 82, team2: "Georgetown Hoyas", score2: 78 },
      { round: "Round of 16", team1: "UCLA Bruins", score1: 91, team2: "Syracuse Orange", score2: 85 },
      { round: "Round of 16", team1: "Harvard Crimson", score1: 79, team2: "Marquette Eagles", score2: 74 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">League Statistics</h2>
        <Badge variant="secondary" className="animate-pulse">
          <Trophy className="h-3 w-3 mr-1" />
          Season 2024
        </Badge>
      </div>

      <Tabs defaultValue="leagues" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leagues">University Leagues</TabsTrigger>
          <TabsTrigger value="national">National Cup</TabsTrigger>
        </TabsList>

        <TabsContent value="leagues" className="space-y-6">
          {universityLeagues.map((conference, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-blue-600" />
                  {conference.league}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Team</TableHead>
                      <TableHead>W</TableHead>
                      <TableHead>L</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Last Match</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {conference.teams.map((team, teamIndex) => (
                      <TableRow key={teamIndex}>
                        <TableCell className="font-bold">{teamIndex + 1}</TableCell>
                        <TableCell className="font-semibold">{team.name}</TableCell>
                        <TableCell className="text-green-600">{team.wins}</TableCell>
                        <TableCell className="text-red-600">{team.losses}</TableCell>
                        <TableCell className="font-bold text-blue-600">{team.points}</TableCell>
                        <TableCell>
                          <Badge variant={team.lastMatch.startsWith('W') ? 'default' : 'secondary'}>
                            {team.lastMatch}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="national" className="space-y-6">
          <Card className="hover-scale">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                National University Cup - {nationalCup.currentRound}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-lg">Upcoming Matches</h3>
              {nationalCup.matches.map((match, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-lg font-semibold">{match.team1}</div>
                    <div className="text-gray-500">vs</div>
                    <div className="text-lg font-semibold">{match.team2}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{match.date}</div>
                    <div className="text-sm text-gray-500">{match.venue}</div>
                  </div>
                </div>
              ))}
              
              <h3 className="font-semibold text-lg mt-6">Recent Results</h3>
              {nationalCup.pastResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{result.round}</Badge>
                    <div className="font-semibold">{result.team1}</div>
                    <div className="text-2xl font-bold text-blue-600">{result.score1} - {result.score2}</div>
                    <div className="font-semibold">{result.team2}</div>
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
