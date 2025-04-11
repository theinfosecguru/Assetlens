
import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import AssetRegistry from './asset-registry';

const DashboardMain = async () => {
  return (
    <main className="flex-1 p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Asset Registry</CardTitle>
            <CardDescription>A list of all assets in the network</CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
        <AssetRegistry />
      </div>
    </main>
  );
};

export default DashboardMain;

