
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Search, MapPin, Navigation, Clock, Star, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FieldFinder = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [bookingFields, setBookingFields] = useState<number[]>([]);
  const [bookedFields, setBookedFields] = useState<number[]>([]);

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

  // Mock fields with distances (would be calculated from user location in real app)
  const availableFields = [
    {
      name: "MIT Recreation Center",
      sport: "Basketball",
      available: "2:00 PM - 4:00 PM",
      status: "Available",
      location: "Cambridge, MA",
      distance: locationEnabled ? "0.3 miles" : "Unknown",
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
      distance: locationEnabled ? "0.7 miles" : "Unknown",
      rating: 4.6,
      features: ["Grass Field", "Lighting", "Bleachers"]
    },
    {
      name: "Harvard Tennis Courts",
      sport: "Tennis",
      available: "10:00 AM - 12:00 PM",
      status: "Busy",
      location: "Cambridge, MA",
      distance: locationEnabled ? "1.2 miles" : "Unknown",
      rating: 4.9,
      features: ["Hard Court", "Net", "Water Fountain"]
    },
    {
      name: "Boston University Gym",
      sport: "Volleyball",
      available: "7:00 PM - 9:00 PM",
      status: "Available",
      location: "Boston, MA",
      distance: locationEnabled ? "2.1 miles" : "Unknown",
      rating: 4.5,
      features: ["Indoor Court", "Professional Net", "Heating"]
    },
    {
      name: "Northeastern Aquatic Center",
      sport: "Swimming",
      available: "5:00 AM - 10:00 PM",
      status: "Available",
      location: "Boston, MA",
      distance: locationEnabled ? "2.8 miles" : "Unknown",
      rating: 4.7,
      features: ["Olympic Pool", "Diving Boards", "Locker Rooms"]
    }
  ];

  const sortedFields = locationEnabled 
    ? [...availableFields].sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    : availableFields;

  const requestLocation = () => {
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
          alert("Please enable location access to find nearby fields");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Available Fields</h2>
        <div className="flex space-x-2">
          {!locationEnabled && (
            <Button variant="outline" onClick={requestLocation} className="hover-scale">
              <Navigation className="h-4 w-4 mr-2" />
              Enable Location
            </Button>
          )}
          <Button variant="outline" className="hover-scale">
            <Search className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="hover-scale">
            <Calendar className="h-4 w-4 mr-2" />
            Book Field
          </Button>
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
          <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{field.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={field.status === "Available" ? "default" : "secondary"}
                    className={field.status === "Available" ? "bg-green-500" : "bg-yellow-500"}
                  >
                    {field.status}
                  </Badge>
                  {locationEnabled && (
                    <Badge variant="outline" className="text-blue-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      {field.distance}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{field.sport}</Badge>
                <span className="text-sm text-gray-500">{field.location}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{field.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold text-blue-600 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Available Time
                </div>
                <div className="text-lg">{field.available}</div>
              </div>
              
              <div>
                <div className="font-semibold mb-2">Features</div>
                <div className="flex flex-wrap gap-1">
                  {field.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 hover-scale" 
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
                <Button variant="outline" className="hover-scale">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Booking Section */}
      <Card className="hover-scale">
        <CardHeader>
          <CardTitle>Quick Booking by Sport</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Basketball</div>
              <div className="text-xs text-gray-500">8 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Soccer</div>
              <div className="text-xs text-gray-500">3 fields nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Tennis</div>
              <div className="text-xs text-gray-500">12 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Volleyball</div>
              <div className="text-xs text-gray-500">5 courts nearby</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Swimming</div>
              <div className="text-xs text-gray-500">2 pools nearby</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldFinder;
