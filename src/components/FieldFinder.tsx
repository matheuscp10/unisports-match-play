
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

const FieldFinder = () => {
  const availableFields = [
    {
      name: "MIT Recreation Center",
      sport: "Basketball",
      available: "2:00 PM - 4:00 PM",
      status: "Available",
      location: "Cambridge, MA",
      features: ["Indoor Court", "Sound System", "Scoreboard"]
    },
    {
      name: "Stanford Soccer Field",
      sport: "Soccer",
      available: "6:00 PM - 8:00 PM",
      status: "Available",
      location: "Stanford, CA", 
      features: ["Grass Field", "Lighting", "Bleachers"]
    },
    {
      name: "UCLA Tennis Courts",
      sport: "Tennis",
      available: "10:00 AM - 12:00 PM",
      status: "Busy",
      location: "Los Angeles, CA",
      features: ["Hard Court", "Net", "Water Fountain"]
    },
    {
      name: "Harvard Volleyball Gym",
      sport: "Volleyball",
      available: "7:00 PM - 9:00 PM",
      status: "Available",
      location: "Cambridge, MA",
      features: ["Indoor Court", "Professional Net", "Heating"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Available Fields</h2>
        <div className="flex space-x-2">
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

      <div className="grid md:grid-cols-2 gap-6">
        {availableFields.map((field, index) => (
          <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{field.name}</CardTitle>
                <Badge 
                  variant={field.status === "Available" ? "default" : "secondary"}
                  className={field.status === "Available" ? "bg-green-500" : "bg-yellow-500"}
                >
                  {field.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{field.sport}</Badge>
                <span className="text-sm text-gray-500">{field.location}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold text-blue-600">Available Time</div>
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
              
              <Button 
                className="w-full hover-scale" 
                disabled={field.status !== "Available"}
              >
                {field.status === "Available" ? "Book Now" : "Join Waitlist"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Booking Section */}
      <Card className="hover-scale">
        <CardHeader>
          <CardTitle>Quick Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Basketball</div>
              <div className="text-xs text-gray-500">8 courts available</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Soccer</div>
              <div className="text-xs text-gray-500">3 fields available</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Tennis</div>
              <div className="text-xs text-gray-500">12 courts available</div>
            </Button>
            <Button variant="outline" className="h-20 flex-col hover-scale">
              <div className="font-semibold">Volleyball</div>
              <div className="text-xs text-gray-500">5 courts available</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldFinder;
