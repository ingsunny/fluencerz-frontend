'use client';
import { useEffect, useState } from 'react';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';

export default function InfluencerNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/influencer/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.patch(`/influencer/notifications/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications(); // Refresh after marking
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <InfluencerLayout>
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`p-4 rounded shadow-sm ${
                note.is_read ? 'bg-white' : 'bg-yellow-50 border-l-4 border-yellow-400'
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm">{note.message}</p>
                {!note.is_read && (
                  <button
                    onClick={() => markAsRead(note.id)}
                    className="text-blue-600 text-xs underline hover:text-blue-800"
                  >
                    Mark as read
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </InfluencerLayout>
  );
}
