
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut, Trophy, Calendar, Star } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface User {
  id: string;
  email: string;
  name: string;
  university: string;
  followedMatches: number[];
  playerProfile?: {
    sport: string;
    level: string;
    availability: string;
  };
}

interface SimpleAuthProps {
  onAuthChange: (user: User | null) => void;
}

const SimpleAuth = ({ onAuthChange }: SimpleAuthProps) => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Sample account
  const sampleAccount = {
    id: "1",
    email: "student@university.edu",
    password: "password123",
    name: "John Smith",
    university: "MIT",
    followedMatches: [1, 3, 5]
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsLoggedIn(true);
      onAuthChange(userData);
    }
  }, [onAuthChange]);

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        duration: 3000,
      });
      return;
    }

    setIsLogging(true);

    // Simulate login delay
    setTimeout(() => {
      if (email === sampleAccount.email && password === sampleAccount.password) {
        const userData = {
          id: sampleAccount.id,
          email: sampleAccount.email,
          name: sampleAccount.name,
          university: sampleAccount.university,
          followedMatches: sampleAccount.followedMatches
        };
        
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        onAuthChange(userData);
        
        toast({
          title: "Login Successful! 🎉",
          description: `Welcome back, ${sampleAccount.name}!`,
          duration: 4000,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try: student@university.edu / password123",
          duration: 5000,
        });
      }
      
      setIsLogging(false);
      setEmail("");
      setPassword("");
    }, 1500);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setShowProfile(false);
    localStorage.removeItem('currentUser');
    onAuthChange(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      duration: 3000,
    });
  };

  if (isLoggedIn && user) {
    if (showProfile) {
      return (
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => setShowProfile(false)}
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              ← Back
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-red-300 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <User className="h-6 w-6 mr-2" />
                My Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                  <TabsTrigger value="personal" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
                    <Trophy className="h-4 w-4 mr-1" />
                    My Stats
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-green-800 data-[state=active]:text-white text-black">
                    <Calendar className="h-4 w-4 mr-1" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Name</label>
                      <div className="text-lg text-black">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Email</label>
                      <div className="text-lg text-black">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">University</label>
                      <div className="text-lg text-black">{user.university}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-2">Followed Matches</label>
                      <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                        {user.followedMatches.length} Matches
                      </Badge>
                    </div>
                  </div>

                  {user.playerProfile && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-black mb-3">Player Profile</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <span className="text-sm font-medium text-black">Sport:</span>
                          <div className="text-black">{user.playerProfile.sport}</div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-black">Level:</span>
                          <div className="text-black">{user.playerProfile.level}</div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-black">Availability:</span>
                          <div className="text-black">{user.playerProfile.availability}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-black">12</div>
                        <div className="text-sm text-gray-600">Games Played</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-black">8</div>
                        <div className="text-sm text-gray-600">Wins</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4 text-center">
                        <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-black">4.2</div>
                        <div className="text-sm text-gray-600">Rating</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-black">Basketball vs Stanford</div>
                        <div className="text-sm text-gray-600">Yesterday, 7:00 PM</div>
                      </div>
                      <Badge className="bg-green-700 text-white">Won</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-black">Tennis Singles</div>
                        <div className="text-sm text-gray-600">2 days ago, 3:00 PM</div>
                      </div>
                      <Badge variant="outline" className="border-red-600 text-red-600">Lost</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-black">Soccer Practice</div>
                        <div className="text-sm text-gray-600">3 days ago, 5:00 PM</div>
                      </div>
                      <Badge variant="outline" className="border-blue-600 text-blue-600">Practice</Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-green-600" />
          <div className="text-sm">
            <div className="font-semibold text-black">{user.name}</div>
            <div className="text-gray-600">{user.university}</div>
          </div>
        </div>
        <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
          {user.followedMatches.length} Followed
        </Badge>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowProfile(true)}
          className="border-green-600 text-green-600 hover:bg-green-50"
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white border-green-200">
      <CardHeader>
        <CardTitle className="text-center text-black">Login to Your Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800 font-medium">Sample Account:</div>
          <div className="text-xs text-blue-600 mt-1">
            Email: student@university.edu<br />
            Password: password123
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-black mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border-green-200"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-black mb-2">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border-green-200"
          />
        </div>
        
        <Button
          onClick={handleLogin}
          disabled={isLogging}
          className="w-full bg-green-700 hover:bg-green-800 text-white"
        >
          {isLogging ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SimpleAuth;
