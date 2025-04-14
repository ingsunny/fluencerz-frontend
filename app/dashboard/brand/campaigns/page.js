'use client';
import { useEffect, useState } from 'react';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/brand/campaigns', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCampaigns(res.data.data); // use .data for actual array
      } catch (err) {
        console.error('Error fetching campaigns:', err);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <BrandLayout>
      <div>
        <h2 className="text-xl font-bold mb-6">My Campaigns</h2>

        {campaigns.length === 0 ? (
          <p className="text-gray-500">No campaigns found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-gray-100 text-left text-sm">
                  <th className="p-3">Influencer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Quote</th>
                  <th className="p-3">Deliverables</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                  <th className="p-3">Performance</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="border-t hover:bg-gray-50 text-sm">
                    <td className="p-3">{camp.collab_request?.Influencer?.full_name}</td>
                    <td className="p-3 capitalize">{camp.campaign_status}</td>
                    <td className="p-3">${camp.quotation_amount}</td>
                    <td className="p-3">{camp.deliverables || '-'}</td>
                    <td className="p-3">{formatDate(camp.start_date)}</td>
                    <td className="p-3">{formatDate(camp.end_date)}</td>
                    <td className="p-3">{camp.performance_metrics ? JSON.stringify(camp.performance_metrics) : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </BrandLayout>
  );

  function formatDate(date) {
    return date ? new Date(date).toLocaleDateString() : '-';
  }
}
