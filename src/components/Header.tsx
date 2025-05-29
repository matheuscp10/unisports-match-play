
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchModal from "./SearchModal";
import SimpleAuth from "./SimpleAuth";

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

const Header = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is already logged in on component mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthChange = (user: User | null) => {
    setCurrentUser(user);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <img 
              src="/src/assets/unisports-logo.png" 
              alt="UniSports Logo" 
              className="h-12 w-auto"
            />
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#live" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Live Scores
            </a>
            <a href="#stats" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Statistics
            </a>
            <a href="#fields" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Fields
            </a>
            <a href="#matchmaking" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Players
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <SearchModal>
            <Button variant="ghost" size="sm" className="hover-scale">
              <Search className="h-4 w-4" />
            </Button>
          </SearchModal>
          
          <SimpleAuth onAuthChange={handleAuthChange} />

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#live" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Live Scores
                </a>
                <a href="#stats" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Statistics
                </a>
                <a href="#fields" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Fields
                </a>
                <a href="#matchmaking" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Players
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
