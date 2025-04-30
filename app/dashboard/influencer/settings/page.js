'use client';
import { useEffect, useState } from 'react';
import InfluencerLayout from '@/components/InfluencerLayout';
import api from '@/utils/api';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function DynamicListInput({ label, items, keys, readOnly = false }) {
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

  return (
    <div className="bg-white p-4 sm:p-6 border border-gray-200 rounded-xl shadow-sm space-y-3">
      <label className="block text-sm sm:text-base font-medium text-gray-700">{label}</label>
      {items.length > 0 ? (
        <ul className="space-y-2" aria-readonly={readOnly}>
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-lg"
            >
              <span className="text-gray-800">
                {keys.map((k, i) => (
                  <span key={i}>
                    <strong>{item[k]}</strong>
                    {i < keys.length - 1 ? ': ' : ''}
                  </span>
                ))}
              </span>
              {!readOnly && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  aria-label={`Remove ${label} item ${idx + 1}`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No {label.toLowerCase()} added.</p>
      )}
      {!readOnly && (
        <div className="flex gap-3 flex-wrap">
          {keys.map((key, i) => (
            <input
              key={i}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="flex-1 min-w-[140px] p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              value={newItem[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              aria-label={`${key} for ${label}`}
            />
          ))}
          <button
            type="button"
            onClick={addItem}
            className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            aria-label={`Add ${label}`}
          >
            + Add
          </button>
        </div>
      )}
    </div>
  );
}

export default function InfluencerSettingsPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('');
  const [error, setError] = useState(null);
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
      console.error('Failed to fetch influencer profile:', err);
      setError('Failed to load profile. Please try again.');
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
    setMsgType('');
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
        },
        {
          headers: {
            Authorization: `Bearer ${token}` },
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
      setMsgType('success');
      setImageFile(null);
      fetchProfile();
    } catch (err) {
      console.error('Update failed:', err);
      setMsg('Update failed. Please try again.');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <InfluencerLayout>
        <div className="flex flex-col items-center justify-center h-full w-full gap-4">
          <p className="text-red-600 text-base sm:text-lg">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchProfile();
            }}
            className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </InfluencerLayout>
    );
  }

  if (!profile) {
    return (
      <InfluencerLayout>
        <div className="flex items-center justify-center h-full w-full">
          <svg
            className="animate-spin h-8 w-8 text-blue-600 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-gray-500 text-base sm:text-lg">Loading...</p>
        </div>
      </InfluencerLayout>
    );
  }

  return (
    <InfluencerLayout>
      <div className="space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Profile Settings
            </h2>
            <Link
              href="/"
              className="text-sm sm:text-base font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200"
              aria-label="Visit FluencerZ main site"
            >
              Visit FluencerZ
            </Link>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userType');
              window.location.href = '/';
            }}
            className="text-base font-medium text-red-600 hover:text-red-800 hover:underline transition-colors duration-200 px-4 py-2 rounded-md hover:bg-red-50 w-fit"
            aria-label="Log out"
          >
            Logout
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="space-y-8 bg-white p-4 sm:p-8 rounded-2xl shadow-lg"
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
                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover mx-auto mb-4 border-4 border-gray-100 shadow-md"
              />
              <label
                htmlFor="profile-image"
                className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 cursor-pointer hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
                aria-label="Upload profile image"
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
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-2">
              {profile.full_name}
            </h3>
            <p className="text-sm text-gray-500">{profile.niche || 'Add your niche'}</p>
          </div>

          {/* Form Fields - Dual Column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                disabled
                value={profile.email || ''}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Phone"
                aria-label="Phone number"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Skype
              </label>
              <input
                name="skype"
                value={profile.skype || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Skype"
                aria-label="Skype ID"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Niche
              </label>
              <input
                name="niche"
                value={profile.niche || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Niche"
                aria-label="Niche"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Followers Count
              </label>
              <input
                type="number"
                name="followers_count"
                value={profile.followers_count || 0}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Followers Count"
                aria-label="Followers count"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Audience Age Group
              </label>
              <input
                name="audience_age_group"
                value={profile.audience_age_group || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Audience Age Group (e.g., 18-24)"
                aria-label="Audience age group"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">
                Total Reach
              </label>
              <input
                type="number"
                name="total_reach"
                value={profile.total_reach || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder="Total Reach"
                aria-label="Total reach"
              />
            </div>
          </div>

          {/* Read-Only Dynamic Lists */}
          <div className="space-y-6">
            <DynamicListInput
              label="Social Platforms"
              items={platforms}
              keys={['platform', 'followers']}
              readOnly={true}
            />
            <DynamicListInput
              label="Followers by Country"
              items={countries}
              keys={['country', 'percent']}
              readOnly={true}
            />
            <DynamicListInput
              label="Audience Gender %"
              items={genders}
              keys={['gender', 'percent']}
              readOnly={true}
            />
          </div>

          {/* Submit Button and Message */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label={loading ? 'Updating profile' : 'Update profile'}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
            {msg && (
              <p
                className={`text-sm sm:text-base p-3 rounded-md ${
                  msgType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
                role="alert"
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