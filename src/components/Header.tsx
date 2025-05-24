import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";

const Header = () => {
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
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Live Scores
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Statistics
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Fields
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors story-link">
              Players
            </a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="hover-scale">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hover-scale">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
