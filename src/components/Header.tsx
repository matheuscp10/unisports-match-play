import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Search, Menu, LogOut, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchModal from "./SearchModal";
import SignInModal from "./SignInModal";
import ProfileModal from "./ProfileModal";
import NotificationCenter from "./NotificationCenter";

interface HeaderProps {
  onSearchSport?: (sport: string) => void;
}

const Header = ({ onSearchSport }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUserName(userData.name);
    }

    // Listen for login events
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setIsLoggedIn(true);
        setUserName(userData.name);
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('userLogin', handleStorageChange);
    window.addEventListener('userLogout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    localStorage.removeItem('currentUser');
    
    // Dispatch custom event for logout
    window.dispatchEvent(new Event('userLogout'));
  };

  const handleSearchSport = (sport: string) => {
    console.log("Header received sport search:", sport);
    if (onSearchSport) {
      onSearchSport(sport);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent tracking-wide">
              UniSports
            </span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#live" className="text-black hover:text-blue-600 transition-colors font-normal">
              Live Scores
            </a>
            <a href="#stats" className="text-black hover:text-blue-600 transition-colors font-normal">
              Statistics
            </a>
            <a href="#fields" className="text-black hover:text-blue-600 transition-colors font-normal">
              Fields
            </a>
            <a href="#matchmaking" className="text-black hover:text-blue-600 transition-colors font-normal">
              Players
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <SearchModal onSearchSport={handleSearchSport}>
            <Button variant="ghost" size="sm" className="hover-scale text-black hover:text-blue-600">
              <Search className="h-4 w-4" />
            </Button>
          </SearchModal>
          
          {isLoggedIn ? (
            <>
              <NotificationCenter />
              
              <ProfileModal>
                <Button variant="ghost" className="flex items-center space-x-2 hover-scale text-black hover:text-blue-600">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500 text-white text-sm">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-black">{userName}</span>
                </Button>
              </ProfileModal>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-black hover:text-blue-600">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <SignInModal>
              <Button variant="outline" size="sm" className="hover-scale text-black border-black hover:bg-black hover:text-white">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </SignInModal>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-black hover:text-blue-600">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col space-y-4 mt-8">
                <a href="#live" className="text-black hover:text-blue-600 transition-colors">
                  Live Scores
                </a>
                <a href="#stats" className="text-black hover:text-blue-600 transition-colors">
                  Statistics
                </a>
                <a href="#fields" className="text-black hover:text-blue-600 transition-colors">
                  Fields
                </a>
                <a href="#matchmaking" className="text-black hover:text-blue-600 transition-colors">
                  Players
                </a>
                {!isLoggedIn && (
                  <SignInModal>
                    <Button variant="outline" className="mt-4">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </SignInModal>
                )}
                {isLoggedIn && (
                  <Button variant="outline" onClick={handleLogout} className="mt-4 text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
