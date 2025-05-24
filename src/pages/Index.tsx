
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, User, Search, Flag, Volleyball } from "lucide-react";
import Header from "@/components/Header";
import LiveScores from "@/components/LiveScores";
import Statistics from "@/components/Statistics";
import FieldFinder from "@/components/FieldFinder";
import Matchmaking from "@/components/Matchmaking";

const Index = () => {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Uni<span className="text-green-300">Sports</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            Your ultimate university sports companion - stats, fields, and teammates all in one place
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="hover-scale">
              <Volleyball className="mr-2 h-5 w-5" />
              Find Players
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover-scale">
              <Calendar className="mr-2 h-5 w-5" />
              Book Field
            </Button>
          </div>
        </div>
      </section>

      {/* Main Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white shadow-lg">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Flag className="h-4 w-4" />
              Live Scores
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="fields" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fields
            </TabsTrigger>
            <TabsTrigger value="matchmaking" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Find Players
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="animate-fade-in">
            <LiveScores />
          </TabsContent>
          
          <TabsContent value="stats" className="animate-fade-in">
            <Statistics />
          </TabsContent>
          
          <TabsContent value="fields" className="animate-fade-in">
            <FieldFinder />
          </TabsContent>
          
          <TabsContent value="matchmaking" className="animate-fade-in">
            <Matchmaking />
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Stats Footer */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="hover-scale">
              <div className="text-3xl font-bold text-green-400">2,847</div>
              <div className="text-gray-300">Active Players</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl font-bold text-blue-400">156</div>
              <div className="text-gray-300">Available Fields</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl font-bold text-yellow-400">89</div>
              <div className="text-gray-300">Live Matches</div>
            </div>
            <div className="hover-scale">
              <div className="text-3xl font-bold text-purple-400">23</div>
              <div className="text-gray-300">Universities</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
