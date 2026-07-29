'use client';

import { Suspense } from 'react';
import { SplitAuthLayout } from '@/components/SplitAuthLayout';

export default function RootPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090d16] flex items-center justify-center text-xs text-gray-400">Loading PrescribePro...</div>}>
      <SplitAuthLayout />
    </Suspense>
  );
}
