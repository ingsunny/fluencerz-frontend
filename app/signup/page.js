'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicListInput from '@/components/DynamicListInput';

export default function SignupPage() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    skype: '',
    niche: '',
    followers_count: '',
    engagement_rate: '',
    audience_age_group: '',
    total_reach: '',
    portfolio: '',
    portfolio_link: '',
  });
  const [platforms, setPlatforms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([
    { gender: 'male', percentage: '' },
    { gender: 'female', percentage: '' },
    { gender: 'other', percentage: '' },
  ]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const ageGroupOptions = ['13-17', '18-24', '25-34', '35-44', '45-54', '55+'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    // Validate audience_gender percentages
    const totalPercentage = genders.reduce(
      (sum, { percentage }) => sum + parseFloat(percentage || 0),
      0
    );
    if (totalPercentage > 100) {
      setMsg('Audience gender percentages cannot exceed 100%.');
      setLoading(false);
      return;
    }

    // Convert audience_gender to object format
    const genderObj = { male: 0, female: 0, other: 0 };
    genders.forEach(({ gender, percentage }) => {
      if (gender in genderObj) {
        genderObj[gender] = parseFloat(percentage) || 0;
      }
    });

    try {
      const res = await api.post('/influencer/register', {
        full_name: form.full_name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        skype: form.skype,
        niche: form.niche,
        followers_count: parseInt(form.followers_count) || 0,
        engagement_rate: parseFloat(form.engagement_rate) || 0,
        social_platforms: JSON.stringify(platforms),
        followers_by_country: JSON.stringify(countries),
        audience_age_group: form.audience_age_group,
        audience_gender: JSON.stringify(genderObj),
        total_reach: parseInt(form.total_reach) || 0,
        portfolio: form.portfolio,
        portfolio_link: form.portfolio_link,
      });
      localStorage.setItem('token', res.data.influencer.token); // Adjust based on response
      setMsg('Account created successfully!');
      router.push('/dashboard/influencer/settings');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 text-center">
            Influencer Signup
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp / LinkedIn / Telegram
                </label>
                <input
                  type="text"
                  name="skype"
                  value={form.skype}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="WhatsApp / LinkedIn / Telegram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="niche"
                  value={form.niche}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Category (e.g., Fitness)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Followers Count</label>
                <input
                  type="number"
                  name="followers_count"
                  value={form.followers_count}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Followers Count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Engagement Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  name="engagement_rate"
                  value={form.engagement_rate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Engagement Rate (e.g., 3.5)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience Age Group</label>
                <select
                  name="audience_age_group"
                  value={form.audience_age_group}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <option value="">Select Age Group</option>
                  {ageGroupOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Reach</label>
                <input
                  type="number"
                  name="total_reach"
                  value={form.total_reach}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Total Reach"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio Link</label>
                <input
                  type="url"
                  name="portfolio_link"
                  value={form.portfolio_link}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Portfolio Link (e.g., https://example.com)"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
              <textarea
                name="portfolio"
                value={form.portfolio}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Describe your portfolio, past collaborations, etc."
              />
            </div>
            <div className="space-y-6">
              <DynamicListInput
                label="Social Platforms"
                items={platforms}
                setItems={setPlatforms}
                keys={['platform', 'followers']}
                placeholderMap={{ platform: 'Platform (e.g., Instagram)', followers: 'Followers' }}
              />
              <DynamicListInput
                label="Followers by Country"
                items={countries}
                setItems={setCountries}
                keys={['country', 'percentage']}
                placeholderMap={{ country: 'Country', percentage: 'Percentage' }}
              />
              <DynamicListInput
                label="Audience Gender %"
                items={genders}
                setItems={setGenders}
                keys={['gender', 'percentage']}
                placeholderMap={{ gender: 'Gender (e.g., Male)', percentage: 'Percentage' }}
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
            {msg && (
              <p
                className={`text-sm text-center ${
                  msg.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {msg}
              </p>
            )}
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}