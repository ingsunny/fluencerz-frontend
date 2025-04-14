'use client';
import { useEffect, useState } from 'react';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandRequestsPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/brand/dashboard/requests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data.data); // Extract the actual array
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <BrandLayout>
      <div>
        <h2 className="text-xl font-bold mb-4">My Collaboration Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-500">No requests sent yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-3">Influencer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Admin Response</th>
                  <th className="p-3">Your Message</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-t hover:bg-gray-50 text-sm">
                    <td className="p-3">{req.Influencer?.full_name}</td>
                    <td className="p-3">{req.Influencer?.email}</td>
                    <td className="p-3 capitalize">{req.status}</td>
                    <td className="p-3">{req.admin_response || '-'}</td>
                    <td className="p-3">{req.request_message}</td>
                    <td className="p-3">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </BrandLayout>
  );
}
