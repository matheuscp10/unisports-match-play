
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Calendar } from "lucide-react";

interface SearchModalProps {
  children: React.ReactNode;
}

const SearchModal = ({ children }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  const sports = ["Basketball", "Soccer", "Tennis", "Volleyball", "Baseball", "Swimming"];
  const recentSearches = ["MIT vs Harvard Basketball", "Stanford Soccer Field", "UCLA Tennis Courts"];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search UniSports
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search for teams, players, matches, or fields..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Sports</h4>
            <div className="flex flex-wrap gap-2">
              {sports.map((sport) => (
                <Badge
                  key={sport}
                  variant={selectedSport === sport ? "default" : "outline"}
                  className="cursor-pointer hover:bg-blue-100"
                  onClick={() => setSelectedSport(selectedSport === sport ? "" : sport)}
                >
                  {sport}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Recent Searches</h4>
            <div className="space-y-1">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left p-2 rounded hover:bg-gray-100 text-sm"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button variant="outline" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              Find Nearby
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
