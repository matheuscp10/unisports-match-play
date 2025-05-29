
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy } from "lucide-react";
import LeagueStatistics from "./LeagueStatistics";
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
    <div className="space-y-8 bg-white/95 rounded-lg p-6 border border-green-700/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">Sports Hub</h2>
      </div>

      <Tabs defaultValue="league-stats" className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-gray-100 border border-green-700/50">
          <TabsTrigger value="league-stats" className="flex items-center gap-2 data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
            <Trophy className="h-4 w-4" />
            League Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="league-stats" className="space-y-6">
          <SportFilters onFiltersChange={handleFiltersChange} />
          <LeagueStatistics activeFilters={activeFilters} />
          {activeFilters.country && (
            <div className="text-center text-sm text-black font-medium mt-4 bg-white/80 p-2 rounded">
              Showing results for {activeFilters.sport && `${activeFilters.sport} in `}
              {activeFilters.university ? activeFilters.university : activeFilters.country}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
