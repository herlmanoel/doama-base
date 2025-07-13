'use client';

import { useSession } from 'next-auth/react';

export default function ProfileViewPage() {
  const { data: session } = useSession();

  return (
    <div className='flex w-full flex-col p-4'>
      <h1 className='text-2xl font-bold'>Profile</h1>
      {session?.user ? (
        <div className='mt-4'>
          <p>
            <strong>Name:</strong> {session.user.fullName}
          </p>
          <p>
            <strong>Email:</strong> {session.user.email}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
