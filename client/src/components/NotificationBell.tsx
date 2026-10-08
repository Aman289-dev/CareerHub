import { useEffect, useRef, useState } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNotifications, fetchUnreadCount, markAsReadLocal, markAllAsReadLocal } from '@/store/slices/notificationsSlice';
import { markNotificationAsReadRequest, markAllNotificationsAsReadRequest } from '@/services/notificationService';
import type { Notification } from '@/types';

interface NotificationBellProps {
  className?: string;
}

export default function NotificationBell({ className }: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { items, unreadCount } = useAppSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsReadRequest(notificationId);
      dispatch(markAsReadLocal(notificationId));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsReadRequest();
      dispatch(markAllAsReadLocal());
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={cn('relative', className)}
      ref={dropdownRef}
      data-icod-id="src_components_notificationbell_tsx_70fd"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className="relative transition-all duration-200"
        data-icod-id="src_components_notificationbell_tsx_ead1"
      >
        <Bell
          className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'scale-110')}
          data-icod-id="src_components_notificationbell_tsx_4b4b"
        />
        {unreadCount > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 animate-pulse-glow items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground shadow-sm"
            data-icod-id="src_components_notificationbell_tsx_cc35"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>
      {isOpen && (
        <Card
          className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden shadow-floating z-50 animate-scale-in"
          data-icod-id="src_components_notificationbell_tsx_e01c"
        >
          <div
            className="flex items-center justify-between border-b border-border/60 p-3.5"
            data-icod-id="src_components_notificationbell_tsx_1263"
          >
            <h3
              className="font-bold font-display text-foreground"
              data-icod-id="src_components_notificationbell_tsx_5b72"
            >
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-medium text-primary hover:text-accent-foreground transition-colors duration-200"
                data-icod-id="src_components_notificationbell_tsx_ed81"
              >
                Mark all read
              </button>
            )}
          </div>

          <div
            className="max-h-80 overflow-y-auto"
            data-icod-id="src_components_notificationbell_tsx_be57"
          >
            {items.length === 0 ? (
              <div
                className="p-8 text-center text-sm text-muted-foreground"
                data-icod-id="src_components_notificationbell_tsx_629e"
              >
                No notifications yet
              </div>
            ) : (
              items.map((notification: Notification) => (
                <div
                  key={notification._id}
                  className={cn(
                    'flex items-start gap-3 border-b border-border/40 p-3.5 last:border-0 transition-colors duration-200 hover:bg-muted/40',
                    !notification.read && 'bg-accent/20'
                  )}
                  data-icod-id={`src_components_notificationbell_tsx_42fa_${notification._id}`}
                >
                  <div
                    className="flex-1 min-w-0"
                    data-icod-id={`src_components_notificationbell_tsx_ce37_${notification._id}`}
                  >
                    <p
                      className="text-sm text-foreground line-clamp-2 leading-relaxed"
                      data-icod-id={`src_components_notificationbell_tsx_aaec_${notification._id}`}
                    >
                      {notification.message}
                    </p>
                    <p
                      className="mt-1 text-xs text-muted-foreground"
                      data-icod-id={`src_components_notificationbell_tsx_ecf5_${notification._id}`}
                    >
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
                      aria-label="Mark as read"
                      data-icod-id={`src_components_notificationbell_tsx_b2fd_${notification._id}`}
                    >
                      <Check
                        className="h-4 w-4"
                        data-icod-id={`src_components_notificationbell_tsx_e96c_${notification._id}`}
                      />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
