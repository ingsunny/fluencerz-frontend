'use client';
import { useEffect, useState } from 'react';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';

export default function LastCollabPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchLastCollab = async () => {
      try {
        const res = await api.get('/influencer/last-collab', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong.');
      }
    };

    fetchLastCollab();
  }, []);

  return (
    <InfluencerLayout>
      <h2 className="text-2xl font-bold mb-6">Last Collaboration</h2>

      {error && <p className="text-red-600">{error}</p>}

      {!error && data && (
        <div className="bg-white rounded shadow p-6 space-y-4 text-sm">
          <div>
            <strong>Brand:</strong> {data.Brand.company_name} ({data.Brand.email})
          </div>
          <div>
            <strong>Status:</strong> {data.Campaign.campaign_status}
          </div>
          <div>
            <strong>Start - End:</strong> {data.Campaign.start_date.slice(0, 10)} to{' '}
            {data.Campaign.end_date.slice(0, 10)}
          </div>
          <div>
            <strong>Deliverables:</strong> {data.Campaign.deliverables || 'N/A'}
          </div>
          <div>
            <strong>Quotation:</strong> ₹{data.Campaign.quotation_amount || 'N/A'}
          </div>

          {data.Campaign.Rating ? (
            <>
              <hr className="my-2" />
              <div className="text-blue-600 font-semibold">💬 Feedback</div>
              <div>
                <strong>Rated By:</strong> {data.Campaign.Rating.rated_by}
              </div>
              <div>
                <strong>Rating:</strong> {data.Campaign.Rating.rating_value} ⭐
              </div>
              <div>
                <strong>Review:</strong> {data.Campaign.Rating.review || 'No review text'}
              </div>
            </>
          ) : (
            <div className="text-yellow-500">No rating has been added yet.</div>
          )}
        </div>
      )}
    </InfluencerLayout>
  );
}
