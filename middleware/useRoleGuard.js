'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRoleGuard(expectedRole) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');

    if (!token) {
      router.push('/');
    } else if (userType !== expectedRole) {
      router.push(`/dashboard/${userType}`);
    }
  }, []);
}
