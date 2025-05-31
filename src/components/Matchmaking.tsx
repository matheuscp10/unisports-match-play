import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, User, Volleyball, Check, Clock, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Matchmaking = () => {
  const { toast } = useToast();
  const [connectingPlayers, setConnectingPlayers] = useState<number[]>([]);
  const [connectedPlayers, setConnectedPlayers] = useState<number[]>([]);
  const [joiningGroups, setJoiningGroups] = useState<number[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isQuickMatching, setIsQuickMatching] = useState(false);
  const [isSchedulingGame, setIsSchedulingGame] = useState(false);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    university: "",
    sport: "",
    level: "",
    availability: ""
  });
  const [gameData, setGameData] = useState({
    sport: "",
    date: "",
    time: "",
    location: "",
    players: "",
    level: ""
  });
  const [teamData, setTeamData] = useState({
    name: "",
    sport: "",
    description: "",
    level: "",
    meetingSchedule: ""
  });

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

  const handleCreateProfile = () => {
    if (!profileData.name || !profileData.university || !profileData.sport) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to create your profile.",
        duration: 3000,
      });
      return;
    }

    setIsCreatingProfile(true);
    
    setTimeout(() => {
      setIsCreatingProfile(false);
      toast({
        title: "Profile Created Successfully! 🎉",
        description: `Welcome ${profileData.name}! Your profile is now active and ready to find matches.`,
        duration: 4000,
      });
      
      // Reset form
      setProfileData({
        name: "",
        university: "",
        sport: "",
        level: "",
        availability: ""
      });
    }, 2000);
  };

  const handleQuickMatch = () => {
    setIsQuickMatching(true);
    
    setTimeout(() => {
      setIsQuickMatching(false);
      toast({
        title: "Quick Match Found! 🎾",
        description: "You've been matched with Alex Chen for tennis. They'll contact you shortly!",
        duration: 4000,
      });
    }, 3000);
  };

  const handleScheduleGame = () => {
    if (!gameData.sport || !gameData.date || !gameData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in sport, date, and time to schedule your game.",
        duration: 3000,
      });
      return;
    }

    setIsSchedulingGame(true);
    
    setTimeout(() => {
      setIsSchedulingGame(false);
      toast({
        title: "Game Scheduled Successfully! 📅",
        description: `Your ${gameData.sport} game on ${gameData.date} at ${gameData.time} has been posted. Players will start joining soon!`,
        duration: 4000,
      });
      
      // Reset form
      setGameData({
        sport: "",
        date: "",
        time: "",
        location: "",
        players: "",
        level: ""
      });
    }, 2000);
  };

  const handleCreateTeam = () => {
    if (!teamData.name || !teamData.sport) {
      toast({
        title: "Missing Information",
        description: "Please provide team name and sport to create your team.",
        duration: 3000,
      });
      return;
    }

    setIsCreatingTeam(true);
    
    setTimeout(() => {
      setIsCreatingTeam(false);
      toast({
        title: "Team Created Successfully! 👥",
        description: `"${teamData.name}" team is now active! Share your team code: TC${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        duration: 4000,
      });
      
      // Reset form
      setTeamData({
        name: "",
        sport: "",
        description: "",
        level: "",
        meetingSchedule: ""
      });
    }, 2000);
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
    <div className="space-y-8 bg-white/95 rounded-lg p-6 border border-green-700/40 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-black">Find Players</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover-scale bg-green-700 hover:bg-green-600 text-white border-green-600">
              <User className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-w-md">
            <DialogTitle className="text-black">Create Your Player Profile</DialogTitle>
            <DialogDescription className="text-gray-600">
              Fill in your information to start connecting with other players
            </DialogDescription>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  placeholder="Enter your full name"
                  className="border-green-200"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-black mb-2">University *</label>
                <Select value={profileData.university} onValueChange={(value) => setProfileData({...profileData, university: value})}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Select your university" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MIT">MIT</SelectItem>
                    <SelectItem value="Harvard University">Harvard University</SelectItem>
                    <SelectItem value="Stanford University">Stanford University</SelectItem>
                    <SelectItem value="UCLA">UCLA</SelectItem>
                    <SelectItem value="Yale University">Yale University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Primary Sport *</label>
                <Select value={profileData.sport} onValueChange={(value) => setProfileData({...profileData, sport: value})}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Select your sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Tennis">Tennis</SelectItem>
                    <SelectItem value="Soccer">Soccer</SelectItem>
                    <SelectItem value="Volleyball">Volleyball</SelectItem>
                    <SelectItem value="Running">Running</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Skill Level</label>
                <Select value={profileData.level} onValueChange={(value) => setProfileData({...profileData, level: value})}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Availability</label>
                <Input
                  value={profileData.availability}
                  onChange={(e) => setProfileData({...profileData, availability: e.target.value})}
                  placeholder="e.g., Weekday evenings, Weekend mornings"
                  className="border-green-200"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateProfile}
                  disabled={isCreatingProfile}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                >
                  {isCreatingProfile ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Profile...
                    </>
                  ) : (
                    "Create Profile"
                  )}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Individual Players */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center text-green-600">
            <User className="h-5 w-5 mr-2" />
            Looking for Partners
          </h3>
          
          {activePlayers.map((player, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 bg-white border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg text-black">{player.name}</div>
                    <div className="text-sm text-gray-600">{player.university}</div>
                  </div>
                  <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">{player.level}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Sport:</span>
                    <Badge className="bg-green-700 text-white">{player.sport}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Available:</span>
                    <span className="text-sm text-green-600">{player.availability}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Looking for:</span>
                    <span className="text-sm text-black">{player.looking}</span>
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
          <h3 className="text-xl font-semibold flex items-center text-green-600">
            <Users className="h-5 w-5 mr-2" />
            Active Groups
          </h3>
          
          {activeGroups.map((group, index) => (
            <Card key={index} className="hover-scale transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20 bg-white border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg text-black">{group.name}</div>
                    <div className="text-sm text-gray-600">{group.members} members</div>
                  </div>
                  <Badge className="bg-green-700 text-white">{group.sport}</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Next Event:</span>
                    <span className="text-sm text-green-600">{group.nextEvent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">Location:</span>
                    <span className="text-sm text-black">{group.location}</span>
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
      <Card className="hover-scale bg-white border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <Volleyball className="h-5 w-5 mr-2" />
            Start Your Own Game
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col hover-scale border-green-600 text-green-600 hover:bg-green-50"
              onClick={handleQuickMatch}
              disabled={isQuickMatching}
            >
              {isQuickMatching ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mb-2"></div>
                  <div className="text-xs text-gray-600">Finding match...</div>
                </>
              ) : (
                <>
                  <div className="font-semibold">Quick Match</div>
                  <div className="text-xs text-gray-600">Find players now</div>
                </>
              )}
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col hover-scale border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Clock className="h-5 w-5 mb-1" />
                  <div className="font-semibold">Schedule Game</div>
                  <div className="text-xs text-gray-600">Plan for later</div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-md">
                <DialogTitle className="text-black">Schedule a Game</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Set up a game and let other players join
                </DialogDescription>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Sport *</label>
                    <Select value={gameData.sport} onValueChange={(value) => setGameData({...gameData, sport: value})}>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basketball">Basketball</SelectItem>
                        <SelectItem value="Tennis">Tennis</SelectItem>
                        <SelectItem value="Soccer">Soccer</SelectItem>
                        <SelectItem value="Volleyball">Volleyball</SelectItem>
                        <SelectItem value="Running">Running</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Date *</label>
                    <Input
                      type="date"
                      value={gameData.date}
                      onChange={(e) => setGameData({...gameData, date: e.target.value})}
                      className="border-green-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Time *</label>
                    <Input
                      type="time"
                      value={gameData.time}
                      onChange={(e) => setGameData({...gameData, time: e.target.value})}
                      className="border-green-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Location</label>
                    <Input
                      value={gameData.location}
                      onChange={(e) => setGameData({...gameData, location: e.target.value})}
                      placeholder="e.g., MIT Recreation Center"
                      className="border-green-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Number of Players</label>
                    <Select value={gameData.players} onValueChange={(value) => setGameData({...gameData, players: value})}>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="How many players needed?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 players</SelectItem>
                        <SelectItem value="4">4 players</SelectItem>
                        <SelectItem value="6">6 players</SelectItem>
                        <SelectItem value="8">8 players</SelectItem>
                        <SelectItem value="10">10 players</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Skill Level</label>
                    <Select value={gameData.level} onValueChange={(value) => setGameData({...gameData, level: value})}>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any">Any Level</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleScheduleGame}
                      disabled={isSchedulingGame}
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                    >
                      {isSchedulingGame ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Scheduling...
                        </>
                      ) : (
                        "Schedule Game"
                      )}
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-24 flex-col hover-scale border-green-600 text-green-600 hover:bg-green-50"
                >
                  <UserPlus className="h-5 w-5 mb-1" />
                  <div className="font-semibold">Create Team</div>
                  <div className="text-xs text-gray-600">Form a regular group</div>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white max-w-md">
                <DialogTitle className="text-black">Create a Team</DialogTitle>
                <DialogDescription className="text-gray-600">
                  Form a regular team for ongoing games and practices
                </DialogDescription>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Team Name *</label>
                    <Input
                      value={teamData.name}
                      onChange={(e) => setTeamData({...teamData, name: e.target.value})}
                      placeholder="Enter team name"
                      className="border-green-200"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Sport *</label>
                    <Select value={teamData.sport} onValueChange={(value) => setTeamData({...teamData, sport: value})}>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basketball">Basketball</SelectItem>
                        <SelectItem value="Tennis">Tennis</SelectItem>
                        <SelectItem value="Soccer">Soccer</SelectItem>
                        <SelectItem value="Volleyball">Volleyball</SelectItem>
                        <SelectItem value="Running">Running</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Description</label>
                    <Input
                      value={teamData.description}
                      onChange={(e) => setTeamData({...teamData, description: e.target.value})}
                      placeholder="Brief description of your team"
                      className="border-green-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Skill Level</label>
                    <Select value={teamData.level} onValueChange={(value) => setTeamData({...teamData, level: value})}>
                      <SelectTrigger className="border-green-200">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mixed">Mixed Levels</SelectItem>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Meeting Schedule</label>
                    <Input
                      value={teamData.meetingSchedule}
                      onChange={(e) => setTeamData({...teamData, meetingSchedule: e.target.value})}
                      placeholder="e.g., Tuesdays & Thursdays 6-8 PM"
                      className="border-green-200"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleCreateTeam}
                      disabled={isCreatingTeam}
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                    >
                      {isCreatingTeam ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Creating Team...
                        </>
                      ) : (
                        "Create Team"
                      )}
                    </Button>
                    <DialogClose asChild>
                      <Button variant="outline" className="flex-1">
                        Cancel
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Matchmaking;
