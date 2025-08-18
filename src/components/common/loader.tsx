'use client';
import React from 'react';

export function Loader({ alignment }: { alignment?: 'left' | 'center' | 'right' }) {
  return (
    <div className={`flex items-center justify-${alignment || 'center'} py-4`}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-blue-600 font-semibold">Loading...</span>
    </div>
  );
}