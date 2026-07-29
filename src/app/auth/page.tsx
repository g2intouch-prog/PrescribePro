'use client';

import { Suspense } from 'react';
import { SplitAuthLayout } from '@/app/page';

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090d16] flex items-center justify-center text-xs text-gray-400">Loading PrescribePro...</div>}>
      <SplitAuthLayout />
    </Suspense>
  );
}
