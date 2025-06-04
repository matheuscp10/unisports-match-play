import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Search, MapPin, Navigation, Clock, Star, Check, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const FieldFinder = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [bookingFields, setBookingFields] = useState<number[]>([]);
  const [bookedFields, setBookedFields] = useState<number[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [maxRange, setMaxRange] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationEnabled(true);
        },
        (error) => {
          console.log("Location access denied:", error);
          setLocationEnabled(false);
        }
      );
    }
  }, []);

  const handleBookField = (index: number, fieldName: string, time: string) => {
    setBookingFields(prev => [...prev, index]);
    
    // Simulate booking delay
    setTimeout(() => {
      setBookingFields(prev => prev.filter(id => id !== index));
      setBookedFields(prev => [...prev, index]);
      
      toast({
        title: "Field Booked Successfully! 🏟️",
        description: `${fieldName} is reserved for ${time}. Ready to play!`,
        duration: 4000,
      });
    }, 2000);
  };

  const handleFilterApply = () => {
    const activeFilters = [];
    if (selectedSport) activeFilters.push(selectedSport);
    if (selectedLocation) activeFilters.push(selectedLocation);
    if (maxRange) activeFilters.push(`within ${maxRange} miles`);
    if (selectedCountry) activeFilters.push(selectedCountry);
    
    toast({
      title: "Filters Applied! 🔍",
      description: `Showing fields ${activeFilters.length > 0 ? `filtered by: ${activeFilters.join(', ')}` : 'with all criteria'}`,
      duration: 3000,
    });
  };

  const openGoogleMaps = (fieldName: string, venue: string) => {
    const query = encodeURIComponent(`${fieldName} ${venue}`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Mock fields with distances (would be calculated from user location in real app)
  const availableFields = [
    {
      name: "MIT Recreation Center",
      sport: "Basketball",
      available: "2:00 PM - 4:00 PM",
      status: "Available",
      location: "Cambridge, MA",
      country: "USA",
      distance: locationEnabled ? "0.3 miles" : "Unknown",
      distanceValue: 0.3,
      rating: 4.8,
      features: ["Indoor Court", "Sound System", "Scoreboard"],
      coords: { lat: 42.3601, lng: -71.0942 }
    },
    {
      name: "Charles River Fields",
      sport: "Soccer",
      available: "6:00 PM - 8:00 PM",
      status: "Available",
      location: "Cambridge, MA", 
      country: "USA",
      distance: locationEnabled ? "0.7 miles" : "Unknown",
      distanceValue: 0.7,
      rating: 4.6,
      features: ["Grass Field", "Lighting", "Bleachers"]
    },
    {
      name: "Harvard Tennis Courts",
      sport: "Tennis",
      available: "10:00 AM - 12:00 PM",
      status: "Busy",
      location: "Cambridge, MA",
      country: "USA",
      distance: locationEnabled ? "1.2 miles" : "Unknown",
      distanceValue: 1.2,
      rating: 4.9,
      features: ["Hard Court", "Net", "Water Fountain"]
    },
    {
      name: "Boston University Gym",
      sport: "Volleyball",
      available: "7:00 PM - 9:00 PM",
      status: "Available",
      location: "Boston, MA",
      country: "USA",
      distance: locationEnabled ? "2.1 miles" : "Unknown",
      distanceValue: 2.1,
      rating: 4.5,
      features: ["Indoor Court", "Professional Net", "Heating"]
    },
    {
      name: "Northeastern Aquatic Center",
      sport: "Swimming",
      available: "5:00 AM - 10:00 PM",
      status: "Available",
      location: "Boston, MA",
      country: "USA",
      distance: locationEnabled ? "2.8 miles" : "Unknown",
      distanceValue: 2.8,
      rating: 4.7,
      features: ["Olympic Pool", "Diving Boards", "Locker Rooms"]
    }
  ];

  const filteredFields = availableFields.filter(field => {
    const sportMatch = selectedSport === "all" || !selectedSport || field.sport === selectedSport;
    const locationMatch = selectedLocation === "all" || !selectedLocation || field.location.includes(selectedLocation);
    const countryMatch = selectedCountry === "all" || !selectedCountry || field.country === selectedCountry;
    const rangeMatch = !maxRange || !locationEnabled || field.distanceValue <= parseFloat(maxRange);
    return sportMatch && locationMatch && countryMatch && rangeMatch;
  });

  const sortedFields = locationEnabled 
    ? [...filteredFields].sort((a, b) => a.distanceValue - b.distanceValue)
    : filteredFields;

  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationEnabled(true);
          toast({
            title: "Location Enabled! 📍",
            description: "Now showing fields sorted by distance",
            duration: 3000,
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Please enable location access to find nearby fields",
            duration: 3000,
          });
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser",
        duration: 3000,
      });
    }
  };

  return (
    <div className="space-y-6 bg-white/95 rounded-lg p-6 border border-green-700/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">Available Fields</h2>
        <div className="flex space-x-2">
          {!locationEnabled && (
            <Button variant="outline" onClick={requestLocation} className="hover-scale border-green-600 text-green-700 hover:bg-green-50">
              <Navigation className="h-4 w-4 mr-2" />
              Enable Location
            </Button>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover-scale border-green-600 text-green-700 hover:bg-green-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogTitle className="text-black">Filter Fields</DialogTitle>
              <DialogDescription className="text-gray-600">
                Select your preferences to find the perfect field
              </DialogDescription>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Sport</label>
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Soccer">Soccer</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Volleyball">Volleyball</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Cambridge">Cambridge, MA</SelectItem>
                      <SelectItem value="Boston">Boston, MA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {locationEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Max Distance (miles)</label>
                    <Input
                      type="number"
                      placeholder="Enter max distance"
                      value={maxRange}
                      onChange={(e) => setMaxRange(e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                )}
                <Button onClick={handleFilterApply} className="w-full bg-green-700 hover:bg-green-800 text-white">
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {locationEnabled && (
        <Card className="bg-green-50 border-green-200 hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-700">
              <MapPin className="h-5 w-5" />
              <span className="font-semibold">Location enabled - showing fields nearest to you</span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {sortedFields.map((field, index) => (
          <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg bg-white border-green-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-black">{field.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={field.status === "Available" ? "default" : "secondary"}
                    className={field.status === "Available" ? "bg-green-600 text-white" : "bg-yellow-100 text-yellow-700"}
                  >
                    {field.status}
                  </Badge>
                  {locationEnabled && (
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      <MapPin className="h-3 w-3 mr-1" />
                      {field.distance}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">{field.sport}</Badge>
                <span className="text-sm text-gray-600">{field.location}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold text-black">{field.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold text-blue-600 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available Time
                </div>
                <div className="text-lg text-black">{field.available}</div>
              </div>
              
              <div>
                <div className="font-semibold mb-2 text-black">Features</div>
                <div className="flex flex-wrap gap-1">
                  {field.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 hover-scale bg-green-700 hover:bg-green-800 text-white" 
                  disabled={field.status !== "Available" || bookingFields.includes(index) || bookedFields.includes(index)}
                  onClick={() => field.status === "Available" && handleBookField(index, field.name, field.available)}
                >
                  {bookingFields.includes(index) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Booking...
                    </>
                  ) : bookedFields.includes(index) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Booked
                    </>
                  ) : field.status === "Available" ? (
                    "Book Now"
                  ) : (
                    "Join Waitlist"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="hover-scale border-green-600 text-green-700 hover:bg-green-50"
                  onClick={() => openGoogleMaps(field.name, field.location)}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Booking Section */}
      <Card className="hover-scale bg-white border-green-200">
        <CardHeader>
          <CardTitle className="text-black">Quick Booking by Sport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-scale border-green-200 text-black hover:bg-green-50">
              <div className="font-semibold">Basketball</div>
              <div className="text-xs text-gray-600">8 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale border-green-200 text-black hover:bg-green-50">
              <div className="font-semibold">Soccer</div>
              <div className="text-xs text-gray-600">3 fields nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale border-green-200 text-black hover:bg-green-50">
              <div className="font-semibold">Tennis</div>
              <div className="text-xs text-gray-600">12 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale border-green-200 text-black hover:bg-green-50">
              <div className="font-semibold">Volleyball</div>
              <div className="text-xs text-gray-600">5 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale border-green-200 text-black hover:bg-green-50">
              <div className="font-semibold">Swimming</div>
              <div className="text-xs text-gray-600">2 pools nearby</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldFinder;
