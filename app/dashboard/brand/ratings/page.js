'use client';
import { useEffect, useState } from 'react';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandRatingsPage() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchRatings = async () => {
      try {
        const res = await api.get('/brand/rating', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCampaigns(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRatings();
  }, []);

  const submitRating = async (campaignId, value, review) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/brand/addRating',
        { campaign_id: campaignId, rating_value: value, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Rating submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit rating');
    }
  };

  return (
    <BrandLayout>
      <h2 className="text-2xl font-bold mb-6">Rate Influencers</h2>

      <div className="grid grid-cols-1 gap-6">
        {campaigns.map((camp) => (
          <RatingCard key={camp.id} campaign={camp} onSubmit={submitRating} />
        ))}
      </div>
    </BrandLayout>
  );
}

function RatingCard({ campaign, onSubmit }) {
  const [value, setValue] = useState(campaign.Rating?.rating_value || 0);
  const [review, setReview] = useState(campaign.Rating?.review || '');

  const handleSubmit = () => {
    if (value === 0) return alert('Please select a rating.');
    onSubmit(campaign.id, value, review);
  };

  const influencer = campaign.collab_request?.Influencer;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold">{influencer?.full_name}</h3>
      <p className="text-sm text-gray-500 mb-2">{influencer?.email}</p>

      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setValue(star)}
            className={`text-2xl cursor-pointer ${star <= value ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Write feedback (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full border p-2 rounded text-sm"
        rows={2}
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Rating
      </button>
    </div>
  );
}
