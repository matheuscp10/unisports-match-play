
import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";
import LeagueStatistics from "./LeagueStatistics";
import SportFilters from "./SportFilters";

interface StatisticsProps {
  searchedSport?: string;
}

const Statistics = ({ searchedSport }: StatisticsProps) => {
  const [activeFilters, setActiveFilters] = useState({
    country: "",
    university: "",
    sport: ""
  });

  // Update filters when a sport is searched from header
  useEffect(() => {
    console.log("Statistics received searchedSport:", searchedSport);
    if (searchedSport) {
      setActiveFilters(prev => ({
        ...prev,
        sport: searchedSport
      }));
    }
  }, [searchedSport]);

  const handleFiltersChange = (filters: { country: string; university: string; sport: string }) => {
    console.log("Filters changed:", filters);
    setActiveFilters(filters);
  };

  return (
    <div className="space-y-8 bg-white/95 rounded-lg p-6 border border-green-700/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black flex items-center gap-2">
          <Trophy className="h-8 w-8 text-green-600" />
          League Statistics
        </h2>
        {searchedSport && (
          <div className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full border border-green-200">
            Filtered by: {searchedSport}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <SportFilters onFiltersChange={handleFiltersChange} activeFilters={activeFilters} />
        <LeagueStatistics activeFilters={activeFilters} />
        {(activeFilters.country || activeFilters.university || activeFilters.sport) && (
          <div className="text-center text-sm text-black font-medium mt-4 bg-white/80 p-2 rounded">
            Showing results for {activeFilters.sport && `${activeFilters.sport}`}
            {activeFilters.sport && (activeFilters.university || activeFilters.country) && " in "}
            {activeFilters.university ? activeFilters.university : activeFilters.country}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
