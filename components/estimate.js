import { useState } from 'react';
import axios from 'axios';

const InfluencerEstimator = () => {
  const [username, setUsername] = useState('');
  const [niche, setNiche] = useState('technology');
  const [contentType, setContentType] = useState('reel');
  const [usageRights, setUsageRights] = useState('ads');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEstimate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('https://estimator.fluencerz.com/estimate', {
        username,
        niche,
        content_type: contentType,
        usage_rights: usageRights
      });
      setResult(response.data);
    } catch (err) {
      setResult({ error: err.response?.data?.error || 'Something went wrong' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Influencer Pricing Estimator</h1>

      <label className="block mb-2 font-semibold">Instagram Username</label>
      <input
        className="w-full border p-2 rounded mb-4"
        type="text"
        placeholder="e.g. mahi7781"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="block mb-2 font-semibold">Niche</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      >
        {['finance', 'technology', 'health', 'beauty', 'fashion', 'luxury', 'gaming', 'parenting', 'food', 'home', 'travel', 'automotive', 'education', 'entertainment', 'pets', 'sustainability', 'art'].map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Content Type</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={contentType}
        onChange={(e) => setContentType(e.target.value)}
      >
        {['static', 'carousel', 'video', 'reel'].map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Usage Rights</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={usageRights}
        onChange={(e) => setUsageRights(e.target.value)}
      >
        {['organic', 'ads'].map(right => (
          <option key={right} value={right}>{right}</option>
        ))}
      </select>

      <button
        onClick={handleEstimate}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading || !username.trim()}
      >
        {loading ? 'Calculating...' : 'Estimate Pay'}
      </button>

      {result && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          {result.error ? (
            <p className="text-red-600">❌ {result.error}</p>
          ) : (
            <>
              <p><strong>Username:</strong> {result.username}</p>
              <p><strong>Full Name:</strong> {result.full_name}</p>
              <p><strong>Followers:</strong> {result.followers.toLocaleString()}</p>
              <p><strong>Engagement Rate:</strong> {result.engagement_rate}%</p>
              <p><strong>Average Likes:</strong> {result.avg_likes.toLocaleString()}</p>
              <p><strong>Average Comments:</strong> {result.avg_comments.toLocaleString()}</p>
              <p className="mt-2 text-lg font-bold">💰 Estimated Pay: ${result.estimated_pay.toLocaleString()}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default InfluencerEstimator;
