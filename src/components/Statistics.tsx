
import { useState } from "react";
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
        <h2 className="text-3xl font-bold text-black flex items-center gap-2">
          <Trophy className="h-8 w-8 text-green-600" />
          League Statistics
        </h2>
      </div>

      <div className="space-y-6">
        <SportFilters onFiltersChange={handleFiltersChange} />
        <LeagueStatistics activeFilters={activeFilters} />
        {activeFilters.country && (
          <div className="text-center text-sm text-black font-medium mt-4 bg-white/80 p-2 rounded">
            Showing results for {activeFilters.sport && `${activeFilters.sport} in `}
            {activeFilters.university ? activeFilters.university : activeFilters.country}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
