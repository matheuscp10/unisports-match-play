import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, Users, X, Navigation, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import ChatModal from "./ChatModal";

const MyBookings = () => {
  const { toast } = useToast();
  const [cancellingBookings, setCancellingBookings] = useState<number[]>([]);
  const [chatModal, setChatModal] = useState<{ isOpen: boolean; playerName: string }>({
    isOpen: false,
    playerName: ''
  });

  // Mock booked fields data - now as state so we can remove items
  const [bookedFields, setBookedFields] = useState([
    {
      id: 1,
      fieldName: "MIT Recreation Center",
      sport: "Basketball",
      date: "Today",
      time: "2:00 PM - 4:00 PM",
      location: "Cambridge, MA",
      status: "Confirmed",
      price: "$25/hour"
    },
    {
      id: 2,
      fieldName: "Charles River Fields",
      sport: "Soccer",
      date: "Tomorrow",
      time: "6:00 PM - 8:00 PM",
      location: "Cambridge, MA",
      status: "Confirmed",
      price: "$30/hour"
    },
    {
      id: 3,
      fieldName: "Harvard Tennis Courts",
      sport: "Tennis",
      date: "Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Cambridge, MA",
      status: "Pending",
      price: "$20/hour"
    }
  ]);

  // Mock scheduled matches data - now as state so we can remove items
  const [scheduledMatches, setScheduledMatches] = useState([
    {
      id: 4,
      opponent: "Sarah Martinez",
      sport: "Tennis",
      date: "Today",
      time: "3:00 PM",
      location: "MIT Tennis Courts",
      type: "Singles",
      status: "Confirmed"
    },
    {
      id: 5,
      teamName: "Stanford Soccer Club",
      sport: "Soccer",
      date: "Saturday",
      time: "2:00 PM",
      location: "Main Field",
      type: "Team Match",
      status: "Confirmed"
    },
    {
      id: 6,
      opponent: "David Kim",
      sport: "Basketball",
      date: "Sunday",
      time: "7:00 PM",
      location: "BU Gym",
      type: "Pick-up Game",
      status: "Pending"
    }
  ]);

  const handleCancelBooking = (id: number, type: string, name: string) => {
    setCancellingBookings(prev => [...prev, id]);
    
    setTimeout(() => {
      setCancellingBookings(prev => prev.filter(bookingId => bookingId !== id));
      
      // Actually remove the item from the appropriate list
      if (type === "field booking") {
        setBookedFields(prev => prev.filter(field => field.id !== id));
      } else {
        setScheduledMatches(prev => prev.filter(match => match.id !== id));
      }
      
      toast({
        title: "Booking Cancelled 🚫",
        description: `Your ${type.toLowerCase()} "${name}" has been cancelled and removed.`,
        duration: 3000,
      });
    }, 1500);
  };

  const handleViewLocation = (locationName: string) => {
    // Open Google Maps with the location
    const encodedLocation = encodeURIComponent(locationName);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(mapsUrl, '_blank');
    
    toast({
      title: "Opening Location 📍",
      description: `Opening ${locationName} in Google Maps`,
      duration: 2000,
    });
  };

  const handleGetDirections = (locationName: string) => {
    // Open Google Maps directions
    const encodedLocation = encodeURIComponent(locationName);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedLocation}`;
    window.open(directionsUrl, '_blank');
    
    toast({
      title: "Getting Directions 🗺️",
      description: `Opening directions to ${locationName}`,
      duration: 2000,
    });
  };

  const handleMessagePlayer = (playerName: string) => {
    setChatModal({ isOpen: true, playerName });
  };

  return (
    <div className="space-y-8">
      {/* Booked Fields Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-green-400" />
          My Booked Fields
        </h3>
        
        {bookedFields.length === 0 ? (
          <Card className="bg-black/40 border-green-800/40">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400">No field bookings yet</div>
              <div className="text-sm text-gray-500 mt-2">Book a field to see it here</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {bookedFields.map((booking) => (
              <Card key={booking.id} className="hover-scale bg-black/40 border-green-800/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-xl text-white">{booking.fieldName}</div>
                      <div className="text-sm text-gray-400">{booking.location}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={booking.status === "Confirmed" ? "border-green-600 text-green-400" : "border-yellow-600 text-yellow-400"}
                      >
                        {booking.status}
                      </Badge>
                      <Badge className="bg-green-700 text-white">{booking.sport}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="h-4 w-4 text-green-400" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="font-semibold text-green-400">{booking.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-600 text-green-400 hover:bg-green-700/20"
                      onClick={() => handleViewLocation(booking.location)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View Location
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-600 text-green-400 hover:bg-green-700/20"
                      onClick={() => handleGetDirections(booking.location)}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-600 text-red-400 hover:bg-red-700/20 ml-auto"
                      onClick={() => handleCancelBooking(booking.id, "field booking", booking.fieldName)}
                      disabled={cancellingBookings.includes(booking.id)}
                    >
                      {cancellingBookings.includes(booking.id) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400 mr-2"></div>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Scheduled Matches Section */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          <Users className="h-6 w-6 text-green-400" />
          My Scheduled Matches
        </h3>
        
        {scheduledMatches.length === 0 ? (
          <Card className="bg-black/40 border-green-800/40">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400">No scheduled matches yet</div>
              <div className="text-sm text-gray-500 mt-2">Connect with players to see matches here</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {scheduledMatches.map((match) => (
              <Card key={match.id} className="hover-scale bg-black/40 border-green-800/40">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-semibold text-xl text-white">
                        {match.opponent ? `vs ${match.opponent}` : match.teamName}
                      </div>
                      <div className="text-sm text-gray-400">{match.location}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={match.status === "Confirmed" ? "border-green-600 text-green-400" : "border-yellow-600 text-yellow-400"}
                      >
                        {match.status}
                      </Badge>
                      <Badge className="bg-green-700 text-white">{match.sport}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="h-4 w-4 text-green-400" />
                      <span>{match.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="h-4 w-4 text-green-400" />
                      <span>{match.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400">{match.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-600 text-green-400 hover:bg-green-700/20"
                      onClick={() => handleViewLocation(match.location)}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View Location
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-600 text-green-400 hover:bg-green-700/20"
                      onClick={() => handleMessagePlayer(match.opponent || match.teamName || "Team")}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message {match.opponent ? "Player" : "Team"}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-600 text-red-400 hover:bg-red-700/20 ml-auto"
                      onClick={() => handleCancelBooking(match.id, "match", match.opponent || match.teamName || "match")}
                      disabled={cancellingBookings.includes(match.id)}
                    >
                      {cancellingBookings.includes(match.id) ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-400 mr-2"></div>
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <ChatModal 
        isOpen={chatModal.isOpen}
        onClose={() => setChatModal({ isOpen: false, playerName: '' })}
        playerName={chatModal.playerName}
      />
    </div>
  );
};

export default MyBookings;
