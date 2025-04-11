'use client';

import React from 'react';
import AssetRegistry from './asset-registry';

const DashboardMain = () => {
  return (
    <main className="flex-1 p-4">
      <h1 className="text-2xl font-semibold mb-4">Asset Registry</h1>
      <AssetRegistry />
    </main>
  );
};

export default DashboardMain;
