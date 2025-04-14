'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user'); // updated to 'user'

    if (!token || !user) {
      router.push('/');
    } else {
      setIsAllowed(true);
    }
  }, [router]);

  if (!isAllowed) {
    return null;
  }

  return children;
}
