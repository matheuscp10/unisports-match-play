
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Calendar, Crown, Heart } from "lucide-react";
import PlayerStats from "./PlayerStats";
import MyBookings from "./MyBookings";
import CoachingServices from "./CoachingServices";
import FollowedTeams from "./FollowedTeams";

const PersonalDashboard = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 border border-green-700/50">
          <TabsTrigger value="stats" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <User className="h-4 w-4" />
            My Stats
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Heart className="h-4 w-4" />
            My Teams
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Calendar className="h-4 w-4" />
            My Bookings
          </TabsTrigger>
          <TabsTrigger value="coaching" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Crown className="h-4 w-4" />
            Coaching
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stats">
          <PlayerStats />
        </TabsContent>
        
        <TabsContent value="teams">
          <FollowedTeams />
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
