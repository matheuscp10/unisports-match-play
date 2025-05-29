
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Search, Menu, LogOut, Settings, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SearchModal from "./SearchModal";
import SignInModal from "./SignInModal";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName] = useState("John Doe");

  const handleLogout = () => {
    setIsLoggedIn(false);
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
          
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="sm" className="hover-scale">
                <Bell className="h-4 w-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 hover-scale">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white text-sm">
                        {userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
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
              <Button variant="outline" size="sm" className="hover-scale">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </SignInModal>
          )}

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
                {!isLoggedIn && (
                  <SignInModal>
                    <Button variant="outline" className="mt-4">
                      <User className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </SignInModal>
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
