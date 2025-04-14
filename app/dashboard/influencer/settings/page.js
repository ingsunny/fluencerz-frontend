'use client';

import { useEffect, useState } from 'react';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';
import { XMarkIcon } from '@heroicons/react/24/outline';

function DynamicListInput({ label, items, setItems, keys }) {
  const [newItem, setNewItem] = useState({});

  const handleChange = (key, value) => {
    setNewItem((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    if (keys.every((k) => newItem[k])) {
      setItems([...items, newItem]);
      setNewItem({});
    }
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-sm space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg"
            >
              <span className="text-gray-800">
                {keys.map((k, i) => (
                  <span key={i}>
                    <strong>{item[k]}</strong>
                    {i < keys.length - 1 ? ': ' : ''}
                  </span>
                ))}
              </span>
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-3 flex-wrap">
        {keys.map((key, i) => (
          <input
            key={i}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="flex-1 min-w-[120px] p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            value={newItem[key] || ''}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          + Add
        </button>
      </div>
    </div>
  );
}

export default function InfluencerSettingsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [countries, setCountries] = useState([]);
  const [genders, setGenders] = useState([]);

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await api.get('/influencer/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(res.data);
    } catch (err) {
      console.error('Failed to fetch influencer profile');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setPlatforms(profile.social_platforms ? JSON.parse(profile.social_platforms) : []);
      setCountries(profile.followers_by_country ? JSON.parse(profile.followers_by_country) : []);
      setGenders(profile.audience_gender ? JSON.parse(profile.audience_gender) : []);
    }
  }, [profile]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    const token = localStorage.getItem('token');

    try {
      await api.put(
        '/influencer/update',
        {
          phone: profile.phone,
          skype: profile.skype,
          niche: profile.niche,
          followers_count: profile.followers_count,
          total_reach: profile.total_reach,
          audience_age_group: profile.audience_age_group,
          social_platforms: JSON.stringify(platforms),
          followers_by_country: JSON.stringify(countries),
          audience_gender: JSON.stringify(genders),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        await api.patch('/influencer/upload-profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setMsg('Profile updated successfully!');
      fetchProfile();
    } catch (err) {
      console.error(err);
      setMsg('Update failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile)
    return (
      <InfluencerLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </InfluencerLayout>
    );

  return (
    <InfluencerLayout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          Profile Settings
        </h2>
        <form
          onSubmit={handleUpdate}
          className="space-y-8 bg-white p-8 rounded-2xl shadow-lg"
        >
          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : profile.profile_image
                    ? `https://api.fluencerz.com${profile.profile_image}`
                    : '/default-avatar.png'
                }
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 shadow-md"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">{profile.full_name}</h3>
            <p className="text-sm text-gray-500">{profile.niche || 'Add your niche'}</p>
          </div>

          {/* Form Fields - Dual Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                disabled
                value={profile.email}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skype</label>
              <input
                name="skype"
                value={profile.skype || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Skype"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Followers Count</label>
              <input
                type="number"
                name="followers_count"
                value={profile.followers_count || 0}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Followers Count"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Audience Age Group</label>
              <input
                name="audience_age_group"
                value={profile.audience_age_group || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Audience Age Group (e.g., 18-24)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Reach</label>
              <input
                name="total_reach"
                type="number"
                value={profile.total_reach || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Total Reach"
              />
            </div>
          </div>

          {/* Dynamic Inputs - Full Width */}
          <div className="space-y-6">
            <DynamicListInput
              label="Social Platforms"
              items={platforms}
              setItems={setPlatforms}
              keys={['platform', 'followers']}
            />
            <DynamicListInput
              label="Followers by Country"
              items={countries}
              setItems={setCountries}
              keys={['country', 'percent']}
            />
            <DynamicListInput
              label="Audience Gender %"
              items={genders}
              setItems={setGenders}
              keys={['gender', 'percent']}
            />
          </div>

          {/* Submit Button and Message */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            {msg && (
              <p
                className={`text-sm ${
                  msg.includes('successfully') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {msg}
              </p>
            )}
          </div>
        </form>
      </div>
    </InfluencerLayout>
  );
}