'use client';
import { useEffect, useState } from 'react';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await api.get('/influencer/campaigns', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCampaigns(res.data.data);
      } catch (err) {
        console.error('Failed to fetch campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <InfluencerLayout>
      <h2 className="text-2xl font-bold mb-6">My Campaigns</h2>

      {campaigns.length === 0 ? (
        <p>No campaigns found yet.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="p-3">Brand</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deliverables</th>
                <th className="p-3">Start</th>
                <th className="p-3">End</th>
                <th className="p-3">Quote</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((req) => (
                <tr key={req.id} className="border-t text-sm hover:bg-gray-50">
                  <td className="p-3">{req.Brand?.company_name}</td>
                  <td className="p-3">{req.Brand?.email}</td>
                  <td className="p-3">{req.Campaign?.campaign_status}</td>
                  <td className="p-3">{req.Campaign?.deliverables || '-'}</td>
                  <td className="p-3">{req.Campaign?.start_date?.slice(0, 10)}</td>
                  <td className="p-3">{req.Campaign?.end_date?.slice(0, 10)}</td>
                  <td className="p-3">₹{req.Campaign?.quotation_amount || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </InfluencerLayout>
  );
}
