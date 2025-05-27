
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, School } from "lucide-react";

interface SportFiltersProps {
  onFiltersChange: (filters: { country: string; university: string; sport: string }) => void;
}

const SportFilters = ({ onFiltersChange }: SportFiltersProps) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Brazil"
  ];

  const universities = {
    "United States": [
      "University of California - Los Angeles (UCLA)",
      "Stanford University",
      "University of Southern California (USC)",
      "Harvard University",
      "Duke University",
      "University of Michigan",
      "University of Texas at Austin",
      "University of Florida"
    ],
    "United Kingdom": [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London (UCL)",
      "King's College London",
      "University of Edinburgh"
    ],
    "Canada": [
      "University of Toronto",
      "McGill University",
      "University of British Columbia",
      "University of Alberta",
      "McMaster University"
    ],
    "Australia": [
      "University of Melbourne",
      "University of Sydney",
      "Australian National University",
      "University of Queensland",
      "Monash University"
    ]
  };

  const sports = [
    "Basketball",
    "Football (Soccer)",
    "American Football",
    "Tennis",
    "Swimming",
    "Track & Field",
    "Baseball",
    "Volleyball",
    "Hockey",
    "Rugby"
  ];

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedUniversity(""); // Reset university when country changes
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      country: selectedCountry,
      university: selectedUniversity,
      sport: selectedSport
    });
  };

  const handleClearFilters = () => {
    setSelectedCountry("");
    setSelectedUniversity("");
    setSelectedSport("");
    onFiltersChange({
      country: "",
      university: "",
      sport: ""
    });
  };

  return (
    <Card className="bg-black/40 border-green-800/40 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Filter className="h-5 w-5 text-green-400" />
          Filter Sports Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Country
            </label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="bg-black/20 border-green-800/40 text-white">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <School className="h-4 w-4" />
              University
            </label>
            <Select 
              value={selectedUniversity} 
              onValueChange={setSelectedUniversity}
              disabled={!selectedCountry}
            >
              <SelectTrigger className="bg-black/20 border-green-800/40 text-white">
                <SelectValue placeholder="Select university" />
              </SelectTrigger>
              <SelectContent>
                {selectedCountry && universities[selectedCountry as keyof typeof universities]?.map((university) => (
                  <SelectItem key={university} value={university}>
                    {university}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Sport</label>
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="bg-black/20 border-green-800/40 text-white">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleApplyFilters}
            className="bg-green-700 hover:bg-green-600 text-white"
            disabled={!selectedCountry && !selectedUniversity && !selectedSport}
          >
            Apply Filters
          </Button>
          <Button 
            onClick={handleClearFilters}
            variant="outline"
            className="border-green-800/40 text-green-400 hover:bg-green-800/20"
          >
            Clear All
          </Button>
        </div>

        {(selectedCountry || selectedUniversity || selectedSport) && (
          <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-800/40">
            <div className="text-sm text-green-400">
              Active filters: {[selectedCountry, selectedUniversity, selectedSport].filter(Boolean).join(", ")}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SportFilters;
