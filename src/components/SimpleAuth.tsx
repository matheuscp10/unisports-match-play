
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { User, LogOut } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  university: string;
  followedMatches: number[];
}

const SimpleAuth = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

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
    }
  }, []);

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
    localStorage.removeItem('currentUser');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      duration: 3000,
    });
  };

  if (isLoggedIn && user) {
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
          onClick={handleLogout}
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
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
