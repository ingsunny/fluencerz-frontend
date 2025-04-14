'use client';
import { useEffect, useState } from 'react';
import BrandDashboard from '@/app/dashboard/brand/page';
import InfluencerDashboard from '@/app/dashboard/influencer/page';

export default function DashboardPage() {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserType(user?.userType || '');
  }, []);

  if (!userType) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div>
      {userType === 'brand' && <BrandDashboard />}
      {userType === 'influencer' && <InfluencerDashboard />}
    </div>
  );
}
