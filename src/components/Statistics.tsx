
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, User, Calendar, Crown } from "lucide-react";
import LeagueStatistics from "./LeagueStatistics";
import PlayerStats from "./PlayerStats";
import MyBookings from "./MyBookings";
import CoachingServices from "./CoachingServices";

const Statistics = () => {
  return (
    <div className="space-y-8 bg-black/20 rounded-lg p-6 border border-green-800/30">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Statistics</h2>
      </div>

      <Tabs defaultValue="leagues" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-green-800/40">
          <TabsTrigger value="leagues" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <Trophy className="h-4 w-4" />
            League Stats
          </TabsTrigger>
          <TabsTrigger value="player" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <User className="h-4 w-4" />
            My Stats
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <Calendar className="h-4 w-4" />
            My Bookings
          </TabsTrigger>
          <TabsTrigger value="coaching" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <Crown className="h-4 w-4" />
            Coaching
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leagues">
          <LeagueStatistics />
        </TabsContent>
        
        <TabsContent value="player">
          <PlayerStats />
        </TabsContent>
        
        <TabsContent value="bookings">
          <MyBookings />
        </TabsContent>
        
        <TabsContent value="coaching">
          <CoachingServices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
