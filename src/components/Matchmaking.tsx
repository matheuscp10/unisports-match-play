
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, User, Volleyball } from "lucide-react";

const Matchmaking = () => {
  const activePlayers = [
    {
      name: "Sarah Martinez",
      university: "MIT",
      sport: "Tennis",
      level: "Intermediate",
      availability: "Today 3-5 PM",
      looking: "Singles match"
    },
    {
      name: "David Kim",
      university: "Stanford",
      sport: "Basketball",
      level: "Advanced",
      availability: "Tomorrow 6-8 PM",
      looking: "Pick-up game"
    },
    {
      name: "Emma Johnson",
      university: "UCLA",
      sport: "Soccer",
      level: "Beginner",
      availability: "Weekend mornings",
      looking: "Practice partner"
    },
    {
      name: "Alex Chen",
      university: "Harvard",
      sport: "Volleyball",
      level: "Intermediate",
      availability: "Evenings",
      looking: "Team formation"
    }
  ];

  const activeGroups = [
    {
      name: "MIT Morning Runners",
      sport: "Running",
      members: 12,
      nextEvent: "Tomorrow 7 AM",
      location: "Charles River"
    },
    {
      name: "Stanford Soccer Club",
      sport: "Soccer",
      members: 24,
      nextEvent: "Saturday 2 PM", 
      location: "Main Field"
    },
    {
      name: "Harvard Tennis League",
      sport: "Tennis",
      members: 8,
      nextEvent: "Sunday 10 AM",
      location: "Tennis Courts"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Find Players</h2>
        <Button className="hover-scale">
          <User className="h-4 w-4 mr-2" />
          Create Profile
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Individual Players */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <User className="h-5 w-5 mr-2" />
            Looking for Partners
          </h3>
          
          {activePlayers.map((player, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg">{player.name}</div>
                    <div className="text-sm text-gray-500">{player.university}</div>
                  </div>
                  <Badge variant="outline">{player.level}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sport:</span>
                    <Badge>{player.sport}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Available:</span>
                    <span className="text-sm text-blue-600">{player.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Looking for:</span>
                    <span className="text-sm">{player.looking}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 hover-scale">
                  Connect
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Groups & Teams */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Active Groups
          </h3>
          
          {activeGroups.map((group, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg">{group.name}</div>
                    <div className="text-sm text-gray-500">{group.members} members</div>
                  </div>
                  <Badge>{group.sport}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Next Event:</span>
                    <span className="text-sm text-blue-600">{group.nextEvent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Location:</span>
                    <span className="text-sm">{group.location}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 hover-scale">
                  Join Group
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Your Own Section */}
      <Card className="hover-scale">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Volleyball className="h-5 w-5 mr-2" />
            Start Your Own Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex-col hover-scale">
              <div className="font-semibold">Quick Match</div>
              <div className="text-xs text-gray-500">Find players now</div>
            </Button>
            <Button variant="outline" className="h-24 flex-col hover-scale">
              <div className="font-semibold">Schedule Game</div>
              <div className="text-xs text-gray-500">Plan for later</div>
            </Button>
            <Button variant="outline" className="h-24 flex-col hover-scale">
              <div className="font-semibold">Create Team</div>
              <div className="text-xs text-gray-500">Form a regular group</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Matchmaking;
