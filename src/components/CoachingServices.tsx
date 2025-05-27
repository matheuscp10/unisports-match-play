
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Crown, MessageCircle, User, Bot, Dumbbell, Apple, Clock, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CoachingServices = () => {
  const { toast } = useToast();
  const [hasSubscription, setHasSubscription] = useState(false);
  const [chatMessages, setChatMessages] = useState<{trainer: any[], nutritionist: any[]}>({
    trainer: [
      { type: 'coach', message: 'Hello! I\'m your personal trainer. Ready to crush your fitness goals?', time: '2 min ago' }
    ],
    nutritionist: [
      { type: 'coach', message: 'Hi there! I\'m your nutritionist. Let\'s create a meal plan that fuels your success!', time: '5 min ago' }
    ]
  });
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState<'trainer' | 'nutritionist'>('trainer');

  const handleSubscribe = () => {
    setHasSubscription(true);
    toast({
      title: "Welcome to Premium Coaching! 🎉",
      description: "You now have access to expert trainers and nutritionists.",
      duration: 3000,
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = { type: 'user', message: newMessage, time: 'now' };
    setChatMessages(prev => ({
      ...prev,
      [activeChat]: [...prev[activeChat], userMessage]
    }));

    // Simulate response
    setTimeout(() => {
      const responses = {
        trainer: hasSubscription 
          ? "Great question! Based on your goals, I recommend a 3-day split focusing on compound movements. Let me create a custom workout plan for you."
          : "I'm an AI trainer. For basic advice: Try 3 sets of 10 push-ups, squats, and planks. Upgrade for personalized plans!",
        nutritionist: hasSubscription
          ? "Perfect! I'll design a meal plan with your dietary preferences. What's your current weight and target goal?"
          : "AI Nutritionist here! Quick tip: Aim for 0.8g protein per lb bodyweight. Upgrade for custom meal plans and recipes!"
      };

      const response = { type: 'coach', message: responses[activeChat], time: 'now' };
      setChatMessages(prev => ({
        ...prev,
        [activeChat]: [...prev[activeChat], response]
      }));
    }, 1500);

    setNewMessage('');
  };

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <Card className="bg-black/40 border-green-800/40">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-400" />
              Premium Coaching
            </div>
            <Badge 
              className={hasSubscription ? "bg-green-700 text-white" : "bg-gray-600 text-gray-300"}
            >
              {hasSubscription ? "Active" : "Free Plan"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!hasSubscription ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-400">Free Plan (AI)</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• AI Trainer & Nutritionist</li>
                    <li>• Basic workout suggestions</li>
                    <li>• General nutrition tips</li>
                    <li>• Limited chat responses</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-400">Premium Plan</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Real Human Experts</li>
                    <li>• Personalized workout plans</li>
                    <li>• Custom meal plans & recipes</li>
                    <li>• Unlimited chat support</li>
                    <li>• Progress tracking</li>
                  </ul>
                </div>
              </div>
              <Button 
                onClick={handleSubscribe}
                className="bg-green-700 hover:bg-green-600 text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Premium - $29.99/month
              </Button>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-green-400 text-lg font-semibold">Premium Coaching Active</div>
              <div className="text-gray-300 text-sm">You have access to expert trainers and nutritionists</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coaching Tabs */}
      <Tabs value={activeChat} onValueChange={(value: any) => setActiveChat(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-green-800/40">
          <TabsTrigger 
            value="trainer" 
            className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400"
          >
            <Dumbbell className="h-4 w-4" />
            {hasSubscription ? "Personal Trainer" : "AI Trainer"}
          </TabsTrigger>
          <TabsTrigger 
            value="nutritionist" 
            className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white text-green-400"
          >
            <Apple className="h-4 w-4" />
            {hasSubscription ? "Nutritionist" : "AI Nutritionist"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trainer">
          <Card className="bg-black/40 border-green-800/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {hasSubscription ? <User className="h-5 w-5 text-green-400" /> : <Bot className="h-5 w-5 text-blue-400" />}
                {hasSubscription ? "Expert Personal Trainer" : "AI Personal Trainer"}
                {hasSubscription && <Star className="h-4 w-4 text-yellow-400" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto space-y-3 bg-black/20 rounded-lg p-4 border border-green-800/20">
                  {chatMessages.trainer.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs rounded-lg p-3 ${
                        msg.type === 'user' 
                          ? 'bg-green-700 text-white' 
                          : hasSubscription 
                            ? 'bg-gray-700 text-white border border-green-800/40'
                            : 'bg-blue-900/50 text-blue-200 border border-blue-800/40'
                      }`}>
                        <div className="text-sm">{msg.message}</div>
                        <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={hasSubscription ? "Ask your trainer anything..." : "Ask for basic fitness tips..."}
                    className="flex-1 bg-black/20 border border-green-800/40 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-700 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutritionist">
          <Card className="bg-black/40 border-green-800/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                {hasSubscription ? <User className="h-5 w-5 text-green-400" /> : <Bot className="h-5 w-5 text-blue-400" />}
                {hasSubscription ? "Expert Nutritionist" : "AI Nutritionist"}
                {hasSubscription && <Star className="h-4 w-4 text-yellow-400" />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto space-y-3 bg-black/20 rounded-lg p-4 border border-green-800/20">
                  {chatMessages.nutritionist.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs rounded-lg p-3 ${
                        msg.type === 'user' 
                          ? 'bg-green-700 text-white' 
                          : hasSubscription 
                            ? 'bg-gray-700 text-white border border-green-800/40'
                            : 'bg-blue-900/50 text-blue-200 border border-blue-800/40'
                      }`}>
                        <div className="text-sm">{msg.message}</div>
                        <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={hasSubscription ? "Ask about nutrition plans..." : "Ask for basic nutrition tips..."}
                    className="flex-1 bg-black/20 border border-green-800/40 rounded-lg px-3 py-2 text-white placeholder-gray-400"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="bg-green-700 hover:bg-green-600 text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sample Plans (Premium Feature) */}
      {hasSubscription && (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-black/40 border-green-800/40">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-green-400" />
                Latest Workout Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-400" />
                  <span className="text-sm">45 min upper body focus</span>
                </div>
                <ul className="text-sm space-y-1 ml-6">
                  <li>• Bench Press: 4x8-10</li>
                  <li>• Pull-ups: 3x6-8</li>
                  <li>• Shoulder Press: 3x10-12</li>
                  <li>• Bicep Curls: 3x12-15</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-800/40">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Apple className="h-5 w-5 text-green-400" />
                Today's Meal Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-gray-300">
                <div className="text-sm">
                  <strong>Breakfast:</strong> Protein oatmeal with berries
                </div>
                <div className="text-sm">
                  <strong>Lunch:</strong> Grilled chicken salad
                </div>
                <div className="text-sm">
                  <strong>Dinner:</strong> Salmon with quinoa and vegetables
                </div>
                <div className="text-sm">
                  <strong>Snack:</strong> Greek yogurt with almonds
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CoachingServices;
