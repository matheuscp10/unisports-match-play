
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Calendar, Users, MapPin, Trophy, Info, Share, Link } from "lucide-react";

interface Notification {
  id: string;
  type: 'match' | 'booking' | 'general' | 'toast';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  isToast?: boolean;
  shareable?: boolean;
}

// Global notification state
let globalNotifications: Notification[] = [
  {
    id: '1',
    type: 'match',
    title: 'Match Confirmed',
    message: 'Your tennis match with Sarah Martinez is confirmed for today at 3:00 PM',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    shareable: true
  },
  {
    id: '2',
    type: 'booking',
    title: 'Field Booked',
    message: 'MIT Recreation Center basketball court booked for today 2:00 PM - 4:00 PM',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    shareable: true
  },
  {
    id: '3',
    type: 'match',
    title: 'New Player Request',
    message: 'David Kim wants to schedule a basketball game with you',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    shareable: true
  },
  {
    id: '4',
    type: 'general',
    title: 'Tournament Alert',
    message: 'Spring Tennis Tournament registration is now open!',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: false,
    shareable: true
  }
];

let notificationUpdateListeners: (() => void)[] = [];

// Global function to add toast notifications
export const addToastNotification = (title: string, description: string) => {
  const newNotification: Notification = {
    id: Date.now().toString(),
    type: 'toast',
    title: title,
    message: description,
    timestamp: new Date(),
    read: false,
    isToast: true
  };
  
  globalNotifications = [newNotification, ...globalNotifications];
  notificationUpdateListeners.forEach(listener => listener());
  
  // Auto-remove toast notifications after 5 seconds
  setTimeout(() => {
    globalNotifications = globalNotifications.filter(n => n.id !== newNotification.id);
    notificationUpdateListeners.forEach(listener => listener());
  }, 5000);
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(globalNotifications);

  useEffect(() => {
    const updateNotifications = () => {
      setNotifications([...globalNotifications]);
    };
    
    notificationUpdateListeners.push(updateNotifications);
    
    return () => {
      notificationUpdateListeners = notificationUpdateListeners.filter(l => l !== updateNotifications);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    globalNotifications = globalNotifications.map(notification => 
      notification.id === id 
        ? { ...notification, read: true }
        : notification
    );
    setNotifications([...globalNotifications]);
  };

  const removeNotification = (id: string) => {
    globalNotifications = globalNotifications.filter(n => n.id !== id);
    setNotifications([...globalNotifications]);
    
    // Add toast notification for removal
    addToastNotification("Notification Cleared 🗑️", "Notification has been removed");
  };

  const clearAllNotifications = () => {
    globalNotifications = [];
    setNotifications([]);
    addToastNotification("All Cleared! ✨", "All notifications have been cleared");
  };

  const shareNotification = async (notification: Notification) => {
    try {
      const shareUrl = `${window.location.origin}?notification=${encodeURIComponent(JSON.stringify({
        title: notification.title,
        message: notification.message,
        type: notification.type
      }))}`;
      
      if (navigator.share) {
        await navigator.share({
          title: notification.title,
          text: notification.message,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        addToastNotification("Link Copied! 🔗", "Shareable link copied to clipboard");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      addToastNotification("Share Failed", "Could not create shareable link");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <Users className="h-4 w-4 text-green-400" />;
      case 'booking':
        return <MapPin className="h-4 w-4 text-blue-400" />;
      case 'general':
        return <Trophy className="h-4 w-4 text-yellow-400" />;
      case 'toast':
        return <Info className="h-4 w-4 text-purple-400" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="hover-scale relative text-black hover:text-blue-600">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-black/95 border-green-800/40 text-white" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Notifications</h3>
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllNotifications}
                className="text-red-400 hover:text-red-300"
              >
                Clear All
              </Button>
            )}
          </div>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No notifications</p>
            </div>
          ) : (
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                      notification.read 
                        ? 'bg-gray-800/50 border-gray-700' 
                        : notification.isToast
                        ? 'bg-purple-900/20 border-purple-800/40'
                        : 'bg-green-900/20 border-green-800/40'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 flex-1">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-white">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className={`w-2 h-2 rounded-full ${notification.isToast ? 'bg-purple-400' : 'bg-green-400'}`}></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {notification.shareable && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareNotification(notification);
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-blue-400"
                          >
                            <Share className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="h-6 w-6 p-0 text-gray-400 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
