'use client';
import { useEffect, useState } from 'react';
import BrandLayout from '@/components/BrandLayout';
import api from '@/utils/api';

export default function BrandProfilePage() {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/brand/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error('Failed to fetch brand profile', err);
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

    try {
      // 1️⃣ Update profile fields
      await api.put('/brand/update', {
        phone: profile.phone,
        skype: profile.skype,
        industry: profile.industry,
        website: profile.website
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2️⃣ Upload profile image
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);

        await api.patch('/brand/upload-profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      setMsg('Profile updated successfully!');
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMsg('Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!profile) return <BrandLayout><p>Loading...</p></BrandLayout>;

  return (
    <BrandLayout>
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      <form onSubmit={handleUpdate} className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex flex-col items-center gap-2">
          <img
            src={profile.profile_image ? `https://api.fluencerz.com${profile.profile_image}` : '/public/avatar.png'}
            alt="Brand Avatar"
            className="w-28 h-28 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-xs"
          />
        </div>

        <div className="space-y-4 w-full max-w-md text-sm">
          <div>
            <label className="block text-gray-500">Company Name</label>
            <input
              value={profile.company_name}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500">Contact Person</label>
            <input
              value={profile.contact_person}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500">Email</label>
            <input
              value={profile.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-500">Phone</label>
            <input
              name="phone"
              value={profile.phone || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-500">Skype</label>
            <input
              name="skype"
              value={profile.skype || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-500">Industry</label>
            <input
              name="industry"
              value={profile.industry || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-500">Website</label>
            <input
              name="website"
              value={profile.website || ''}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          {msg && <p className="text-green-600 text-sm">{msg}</p>}
        </div>
      </form>
    </BrandLayout>
  );
}
