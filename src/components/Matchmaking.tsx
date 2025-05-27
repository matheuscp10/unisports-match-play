
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, User, Volleyball, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Matchmaking = () => {
  const { toast } = useToast();
  const [connectingPlayers, setConnectingPlayers] = useState<number[]>([]);
  const [connectedPlayers, setConnectedPlayers] = useState<number[]>([]);
  const [joiningGroups, setJoiningGroups] = useState<number[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);

  const handleConnectPlayer = (index: number, playerName: string) => {
    setConnectingPlayers(prev => [...prev, index]);
    
    // Simulate connection delay
    setTimeout(() => {
      setConnectingPlayers(prev => prev.filter(id => id !== index));
      setConnectedPlayers(prev => [...prev, index]);
      
      toast({
        title: "Connected Successfully! 🎾",
        description: `You're now connected with ${playerName}. Ready to play!`,
        duration: 3000,
      });
    }, 1500);
  };

  const handleJoinGroup = (index: number, groupName: string) => {
    setJoiningGroups(prev => [...prev, index]);
    
    // Simulate join delay
    setTimeout(() => {
      setJoiningGroups(prev => prev.filter(id => id !== index));
      setJoinedGroups(prev => [...prev, index]);
      
      toast({
        title: "Joined Group! 🏃‍♂️",
        description: `Welcome to ${groupName}. Check your schedule for upcoming events!`,
        duration: 3000,
      });
    }, 1000);
  };

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
    <div className="space-y-8 bg-black/20 rounded-lg p-6 border border-green-800/30">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">Find Players</h2>
        <Button className="hover-scale bg-green-700 hover:bg-green-600 text-white border-green-600">
          <User className="h-4 w-4 mr-2" />
          Create Profile
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Individual Players */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-green-400">
            <User className="h-5 w-5 mr-2" />
            Looking for Partners
          </h3>
          
          {activePlayers.map((player, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 bg-black/40 border-green-800/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg text-white">{player.name}</div>
                    <div className="text-sm text-gray-400">{player.university}</div>
                  </div>
                  <Badge variant="outline" className="border-green-600 text-green-400">{player.level}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Sport:</span>
                    <Badge className="bg-green-700 text-white">{player.sport}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Available:</span>
                    <span className="text-sm text-green-400">{player.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Looking for:</span>
                    <span className="text-sm text-gray-300">{player.looking}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 hover-scale bg-green-700 hover:bg-green-600 text-white"
                  onClick={() => handleConnectPlayer(index, player.name)}
                  disabled={connectingPlayers.includes(index) || connectedPlayers.includes(index)}
                >
                  {connectingPlayers.includes(index) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Connecting...
                    </>
                  ) : connectedPlayers.includes(index) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Connected
                    </>
                  ) : (
                    "Connect"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Groups & Teams */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-green-400">
            <Users className="h-5 w-5 mr-2" />
            Active Groups
          </h3>
          
          {activeGroups.map((group, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 bg-black/40 border-green-800/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg text-white">{group.name}</div>
                    <div className="text-sm text-gray-400">{group.members} members</div>
                  </div>
                  <Badge className="bg-green-700 text-white">{group.sport}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Next Event:</span>
                    <span className="text-sm text-green-400">{group.nextEvent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Location:</span>
                    <span className="text-sm text-gray-300">{group.location}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4 hover-scale bg-green-700 hover:bg-green-600 text-white"
                  onClick={() => handleJoinGroup(index, group.name)}
                  disabled={joiningGroups.includes(index) || joinedGroups.includes(index)}
                >
                  {joiningGroups.includes(index) ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Joining...
                    </>
                  ) : joinedGroups.includes(index) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Joined
                    </>
                  ) : (
                    "Join Group"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Your Own Section */}
      <Card className="hover-scale bg-black/40 border-green-800/40">
        <CardHeader>
          <CardTitle className="flex items-center text-green-400">
            <Volleyball className="h-5 w-5 mr-2" />
            Start Your Own Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-24 flex-col hover-scale border-green-600 text-green-400 hover:bg-green-700/20">
              <div className="font-semibold">Quick Match</div>
              <div className="text-xs text-gray-400">Find players now</div>
            </Button>
            <Button variant="outline" className="h-24 flex-col hover-scale border-green-600 text-green-400 hover:bg-green-700/20">
              <div className="font-semibold">Schedule Game</div>
              <div className="text-xs text-gray-400">Plan for later</div>
            </Button>
            <Button variant="outline" className="h-24 flex-col hover-scale border-green-600 text-green-400 hover:bg-green-700/20">
              <div className="font-semibold">Create Team</div>
              <div className="text-xs text-gray-400">Form a regular group</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Matchmaking;
