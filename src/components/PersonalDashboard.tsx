
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, Crown } from "lucide-react";
import PlayerStats from "./PlayerStats";
import MyBookings from "./MyBookings";
import CoachingServices from "./CoachingServices";

const PersonalDashboard = () => {
  return (
    <div className="space-y-8 bg-black/20 rounded-lg p-6 border border-green-800/30">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Personal Dashboard</h2>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-green-800/40">
          <TabsTrigger value="stats" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
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

        <TabsContent value="stats">
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

export default PersonalDashboard;
