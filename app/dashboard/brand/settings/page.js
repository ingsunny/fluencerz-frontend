'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandProfilePage() {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/brand/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error('Failed to fetch brand profile:', err);
        setError('Failed to load profile. Please try again.');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setMsgType('');

    try {
      // Update profile fields
      await api.put(
        '/brand/update',
        {
          phone: profile.phone,
          skype: profile.skype,
          industry: profile.industry,
          website: profile.website,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Upload profile image
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await api.patch('/brand/upload-profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setMsg('Profile updated successfully!');
      setMsgType('success');
      setImageFile(null);
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
      <BrandLayout>
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
      </BrandLayout>
    );
  }

  if (!profile) {
    return (
      <BrandLayout>
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
      </BrandLayout>
    );
  }

  return (
    <BrandLayout>
      <div className="space-y-6 sm:space-y-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Your Profile
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

        {/* Form */}
        <form
          onSubmit={handleUpdate}
          className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 bg-white rounded-xl shadow-lg p-4 sm:p-6"
        >
          {/* Profile Image */}
          <div className="flex flex-col items-center gap-4">
            <img
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : profile.profile_image
                  ? `https://api.fluencerz.com${profile.profile_image}`
                  : '/avatar.png'
              }
              alt="Brand Avatar"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <label className="relative flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
                aria-label="Upload profile image"
              />
            </label>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 w-full max-w-xl text-sm sm:text-base">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Company Name</label>
              <input
                value={profile.company_name || ''}
                disabled
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Contact Person</label>
              <input
                value={profile.contact_person || ''}
                disabled
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                value={profile.email || ''}
                disabled
                className="w-full p-3 border border-gray-200 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                aria-disabled="true"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Phone</label>
              <input
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Phone number"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Skype</label>
              <input
                name="skype"
                value={profile.skype || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Skype ID"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Industry</label>
              <input
                name="industry"
                value={profile.industry || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Industry"
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Website</label>
              <input
                name="website"
                value={profile.website || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                aria-label="Website URL"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-md hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label={loading ? 'Updating profile' : 'Update profile'}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>

            {msg && (
              <p
                className={`text-sm sm:text-base p-3 rounded-md ${
                  msgType === 'success'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
                role="alert"
              >
                {msg}
              </p>
            )}
          </div>
        </form>
      </div>
    </BrandLayout>
  );
}