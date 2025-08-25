import React, { createContext, useContext, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Fetch notifications
  const {
    data: notifications = [],
    isLoading: isLoadingNotifications,
    refetch: refetchNotifications,
  } = useQuery(
    ['notifications', user?.id],
    async () => {
      const response = await axios.get('/notifications');
      return response.data.notifications;
    },
    {
      enabled: isAuthenticated,
      refetchInterval: 30000, // Refetch every 30 seconds
    }
  );

  // Mark notification as read
  const markAsReadMutation = useMutation(
    async (notificationId) => {
      await axios.patch(`/notifications/${notificationId}/read`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications']);
      },
    }
  );

  // Mark all notifications as read
  const markAllAsReadMutation = useMutation(
    async () => {
      await axios.patch('/notifications/mark-all-read');
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications']);
      },
    }
  );

  // Delete notification
  const deleteNotificationMutation = useMutation(
    async (notificationId) => {
      await axios.delete(`/notifications/${notificationId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications']);
      },
    }
  );

  // WebSocket connection for real-time notifications
  useEffect(() => {
    if (isAuthenticated && user) {
      const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:5000';
      const ws = new WebSocket(`${wsUrl}?userId=${user.id}`);

      ws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        
        // Show toast notification
        toast.success(notification.message, {
          duration: 5000,
          icon: '🔔',
        });

        // Refetch notifications to update the list
        refetchNotifications();
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return () => {
        ws.close();
      };
    }
  }, [isAuthenticated, user, refetchNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (notificationId) => {
    markAsReadMutation.mutate(notificationId);
  };

  const markAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const deleteNotification = (notificationId) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  const value = {
    notifications,
    unreadCount,
    isLoadingNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refetchNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
