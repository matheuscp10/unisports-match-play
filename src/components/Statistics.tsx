
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, User, Award } from "lucide-react";
import LeagueStatistics from "./LeagueStatistics";
import PlayerStats from "./PlayerStats";

const Statistics = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Statistics</h2>
      </div>

      <Tabs defaultValue="leagues" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leagues" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            League Stats
          </TabsTrigger>
          <TabsTrigger value="player" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            My Stats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leagues">
          <LeagueStatistics />
        </TabsContent>
        
        <TabsContent value="player">
          <PlayerStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
