import Notification, { INotification } from '../models/Notification';

export async function getUserNotifications(userId: string): Promise<INotification[]> {
  return Notification.find({ user: userId }).sort({ createdAt: -1 });
}

export async function markAsRead(notificationId: string, userId: string): Promise<INotification | null> {
  return Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { read: true },
    { new: true }
  );
}

export async function markAllAsRead(userId: string): Promise<void> {
  await Notification.updateMany({ user: userId, read: false }, { read: true });
}

export async function getUnreadCount(userId: string): Promise<number> {
  return Notification.countDocuments({ user: userId, read: false });
}

export async function createNotification(
  userId: string,
  message: string,
  type: INotification['type']
): Promise<INotification> {
  return Notification.create({ user: userId, message, type });
}
