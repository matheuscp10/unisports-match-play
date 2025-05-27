
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, User } from "lucide-react";
import LeagueStatistics from "./LeagueStatistics";
import PersonalDashboard from "./PersonalDashboard";
import SportFilters from "./SportFilters";

const Statistics = () => {
  const [activeFilters, setActiveFilters] = useState({
    country: "",
    university: "",
    sport: ""
  });

  const handleFiltersChange = (filters: { country: string; university: string; sport: string }) => {
    setActiveFilters(filters);
  };

  return (
    <div className="space-y-8 bg-black/20 rounded-lg p-6 border border-green-800/30">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Sports Hub</h2>
      </div>

      <Tabs defaultValue="league-stats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-green-800/40">
          <TabsTrigger value="league-stats" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <Trophy className="h-4 w-4" />
            League Statistics
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400">
            <User className="h-4 w-4" />
            Personal Dashboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="league-stats" className="space-y-6">
          <SportFilters onFiltersChange={handleFiltersChange} />
          <LeagueStatistics />
          {activeFilters.country && (
            <div className="text-center text-sm text-gray-400 mt-4">
              Showing results for {activeFilters.sport && `${activeFilters.sport} in `}
              {activeFilters.university ? activeFilters.university : activeFilters.country}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="personal">
          <PersonalDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
