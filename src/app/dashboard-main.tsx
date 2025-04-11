'use client';

import React from 'react';
import AssetRegistry from './asset-registry';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const DashboardMain = () => {
  return (
    <main className="flex-1 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Asset Registry</CardTitle>
            <CardDescription>A list of all assets in the network</CardDescription>
          </CardHeader>
          <CardContent>
            <AssetRegistry />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardMain;
